import React, { useEffect, useState } from 'react';
import { Modal, Form, Select, DatePicker, Table, Button, InputNumber, message, Input } from 'antd';
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';

const { Option } = Select;
const { TextArea } = Input;

interface OrderItem {
  key: string;
  articleId: string;
  articleName: string;
  price: number;
  quantity: number;
  total: number;
}

interface SupplierOrderData {
  key?: string;
  orderNumber: string;
  supplierName: string;
  supplierId: string;
  orderDate: string;
  deliveryDate: string;
  amount: number;
  status: string;
  notes?: string;
  items: OrderItem[];
}

interface SupplierOrderModalProps {
  open: boolean;
  onCancel: () => void;
  onSubmit: (values: SupplierOrderData) => void;
  editingOrder?: SupplierOrderData | null;
  mode: 'create' | 'edit';
}

const SupplierOrderModal: React.FC<SupplierOrderModalProps> = ({
  open,
  onCancel,
  onSubmit,
  editingOrder,
  mode
}) => {
  const [form] = Form.useForm();
  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);
  const [totalAmount, setTotalAmount] = useState(0);

  // Données de test pour les fournisseurs et articles
  const suppliers = [
    { id: '1', name: 'TechWorld SARL', contact: 'Michel Leroy' },
    { id: '2', name: 'ElectroPlus', contact: 'Sarah Chen' },
    { id: '3', name: 'Accessoires Pro', contact: 'David Martin' },
    { id: '4', name: 'Digital Supply', contact: 'Emma Dubois' },
  ];

  const articles = [
    { id: '1', name: 'Ordinateur Portable', price: 650.00 }, // Prix d'achat
    { id: '2', name: 'Souris sans fil', price: 18.50 },
    { id: '3', name: 'Clavier mécanique', price: 65.00 },
    { id: '4', name: 'Moniteur 24"', price: 140.00 },
  ];

  useEffect(() => {
    if (open) {
      if (mode === 'edit' && editingOrder) {
        form.setFieldsValue({
          ...editingOrder,
          orderDate: dayjs(editingOrder.orderDate),
          deliveryDate: dayjs(editingOrder.deliveryDate),
        });
        setOrderItems(editingOrder.items || []);
      } else {
        form.resetFields();
        const today = dayjs();
        form.setFieldsValue({
          orderNumber: `ACH${Date.now().toString().slice(-6)}`,
          orderDate: today,
          deliveryDate: today.add(7, 'day'), // Livraison dans 7 jours par défaut
          status: 'En attente'
        });
        setOrderItems([]);
      }
    }
  }, [open, mode, editingOrder, form]);

  useEffect(() => {
    const total = orderItems.reduce((sum, item) => sum + item.total, 0);
    setTotalAmount(total);
  }, [orderItems]);

  const addOrderItem = () => {
    const newItem: OrderItem = {
      key: Date.now().toString(),
      articleId: '',
      articleName: '',
      price: 0,
      quantity: 1,
      total: 0,
    };
    setOrderItems([...orderItems, newItem]);
  };

  const updateOrderItem = (key: string, field: string, value: string | number) => {
    const newItems = orderItems.map(item => {
      if (item.key === key) {
        const updatedItem = { ...item, [field]: value };

        if (field === 'articleId') {
          const article = articles.find(a => a.id === value);
          if (article) {
            updatedItem.articleName = article.name;
            updatedItem.price = article.price;
            updatedItem.total = updatedItem.quantity * article.price;
          }
        } else if (field === 'quantity') {
          updatedItem.total = Number(value) * updatedItem.price;
        } else if (field === 'price') {
          updatedItem.total = updatedItem.quantity * Number(value);
        }

        return updatedItem;
      }
      return item;
    });
    setOrderItems(newItems);
  };

  const removeOrderItem = (key: string) => {
    setOrderItems(orderItems.filter(item => item.key !== key));
  };

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();

      if (orderItems.length === 0) {
        message.error('Veuillez ajouter au moins un article à la commande');
        return;
      }

      const hasInvalidItems = orderItems.some(item => !item.articleId || item.quantity <= 0);
      if (hasInvalidItems) {
        message.error('Veuillez compléter tous les articles de la commande');
        return;
      }

      const supplierName = suppliers.find(s => s.id === values.supplierId)?.name || '';

      const orderData: SupplierOrderData = {
        ...values,
        supplierName,
        orderDate: values.orderDate.format('YYYY-MM-DD'),
        deliveryDate: values.deliveryDate.format('YYYY-MM-DD'),
        amount: totalAmount,
        items: orderItems,
      };

      onSubmit(orderData);
      message.success(mode === 'create' ? 'Commande créée avec succès' : 'Commande modifiée avec succès');
      form.resetFields();
      setOrderItems([]);
      onCancel();
    } catch (error) {
      console.error('Erreur de validation:', error);
    }
  };

  const itemsColumns = [
    {
      title: 'Article',
      dataIndex: 'articleId',
      key: 'articleId',
      render: (value: string, record: OrderItem) => (
        <Select
          value={value}
          onChange={(val) => updateOrderItem(record.key, 'articleId', val)}
          style={{ width: '100%' }}
          placeholder="Sélectionner un article"
        >
          {articles.map(article => (
            <Option key={article.id} value={article.id}>
              {article.name}
            </Option>
          ))}
        </Select>
      ),
    },
    {
      title: 'Prix unitaire',
      dataIndex: 'price',
      key: 'price',
      render: (value: number, record: OrderItem) => (
        <InputNumber
          value={value}
          onChange={(val) => updateOrderItem(record.key, 'price', val || 0)}
          min={0}
          precision={2}
          style={{ width: '100%' }}
          formatter={value => `${value}FCFA`}
          parser={value => value!.replace('FCFA', '')}
        />
      ),
    },
    {
      title: 'Quantité',
      dataIndex: 'quantity',
      key: 'quantity',
      render: (value: number, record: OrderItem) => (
        <InputNumber
          value={value}
          onChange={(val) => updateOrderItem(record.key, 'quantity', val || 1)}
          min={1}
          style={{ width: '100%' }}
        />
      ),
    },
    {
      title: 'Total',
      dataIndex: 'total',
      key: 'total',
      render: (total: number) => `${total.toFixed(2)}FCFA`,
    },
    {
      title: 'Action',
      key: 'action',
      render: (_: unknown, record: OrderItem) => (
        <Button
          type="link"
          danger
          icon={<DeleteOutlined />}
          onClick={() => removeOrderItem(record.key)}
        />
      ),
    },
  ];

  return (
    <Modal
      title={mode === 'create' ? 'Créer une nouvelle commande fournisseur' : 'Modifier la commande'}
      open={open}
      onOk={handleSubmit}
      onCancel={onCancel}
      okText={mode === 'create' ? 'Créer' : 'Modifier'}
      cancelText="Annuler"
      destroyOnClose
      width={800}
    >
      <Form
        form={form}
        layout="vertical"
        requiredMark={false}
      >
        <div style={{ display: 'flex', gap: '16px' }}>
          <Form.Item
            label="N° Commande"
            name="orderNumber"
            style={{ flex: 1 }}
            rules={[{ required: true, message: 'Numéro de commande requis' }]}
          >
            <Input disabled />
          </Form.Item>

          <Form.Item
            label="Statut"
            name="status"
            style={{ flex: 1 }}
            rules={[{ required: true, message: 'Statut requis' }]}
          >
            <Select>
              <Option value="En attente">En attente</Option>
              <Option value="Confirmée">Confirmée</Option>
              <Option value="En transit">En transit</Option>
              <Option value="Reçue">Reçue</Option>
              <Option value="Annulée">Annulée</Option>
            </Select>
          </Form.Item>
        </div>

        <Form.Item
          label="Fournisseur"
          name="supplierId"
          rules={[{ required: true, message: 'Veuillez sélectionner un fournisseur' }]}
        >
          <Select placeholder="Sélectionner un fournisseur">
            {suppliers.map(supplier => (
              <Option key={supplier.id} value={supplier.id}>
                {supplier.name} - Contact: {supplier.contact}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <div style={{ display: 'flex', gap: '16px' }}>
          <Form.Item
            label="Date de commande"
            name="orderDate"
            style={{ flex: 1 }}
            rules={[{ required: true, message: 'Date de commande requise' }]}
          >
            <DatePicker style={{ width: '100%' }} />
          </Form.Item>

          <Form.Item
            label="Date de livraison prévue"
            name="deliveryDate"
            style={{ flex: 1 }}
            rules={[{ required: true, message: 'Date de livraison requise' }]}
          >
            <DatePicker style={{ width: '100%' }} />
          </Form.Item>
        </div>

        <Form.Item label="Articles commandés">
          <div style={{ marginBottom: 16 }}>
            <Button type="dashed" icon={<PlusOutlined />} onClick={addOrderItem}>
              Ajouter un article
            </Button>
          </div>
          <Table
            columns={itemsColumns}
            dataSource={orderItems}
            pagination={false}
            size="small"
            bordered
          />
          <div style={{ marginTop: 16, textAlign: 'right', fontSize: '16px', fontWeight: 'bold' }}>
            Total de la commande : {totalAmount.toFixed(2)}FCFA
          </div>
        </Form.Item>

        <Form.Item
          label="Notes"
          name="notes"
        >
          <TextArea rows={2} placeholder="Conditions spéciales, notes..." />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default SupplierOrderModal;
