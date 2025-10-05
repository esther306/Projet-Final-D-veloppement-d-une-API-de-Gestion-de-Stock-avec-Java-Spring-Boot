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

interface ClientOrderData {
  key?: string;
  orderNumber: string;
  clientName: string;
  clientId: string;
  date: string;
  amount: number;
  status: string;
  deliveryAddress?: string;
  notes?: string;
  items: OrderItem[];
}

interface ClientOrderModalProps {
  open: boolean;
  onCancel: () => void;
  onSubmit: (values: ClientOrderData) => void;
  editingOrder?: ClientOrderData | null;
  mode: 'create' | 'edit';
}

const ClientOrderModal: React.FC<ClientOrderModalProps> = ({
  open,
  onCancel,
  onSubmit,
  editingOrder,
  mode
}) => {
  const [form] = Form.useForm();
  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);
  const [totalAmount, setTotalAmount] = useState(0);

  // Données de test pour les clients et articles
  const clients = [
    { id: '1', name: 'Jean Dupont', email: 'jean.dupont@email.com' },
    { id: '2', name: 'Marie Martin', email: 'marie.martin@email.com' },
    { id: '3', name: 'Pierre Bernard', email: 'pierre.bernard@email.com' },
    { id: '4', name: 'Sophie Dubois', email: 'sophie.dubois@email.com' },
  ];

  const articles = [
    { id: '1', name: 'Ordinateur Portable', price: 799.99 },
    { id: '2', name: 'Souris sans fil', price: 29.99 },
    { id: '3', name: 'Clavier mécanique', price: 89.99 },
    { id: '4', name: 'Moniteur 24"', price: 199.99 },
  ];

  useEffect(() => {
    if (open) {
      if (mode === 'edit' && editingOrder) {
        form.setFieldsValue({
          ...editingOrder,
          date: dayjs(editingOrder.date),
        });
        setOrderItems(editingOrder.items || []);
      } else {
        form.resetFields();
        form.setFieldsValue({
          orderNumber: `CMD${Date.now().toString().slice(-6)}`,
          date: dayjs(),
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

      const clientName = clients.find(c => c.id === values.clientId)?.name || '';

      const orderData: ClientOrderData = {
        ...values,
        clientName,
        date: values.date.format('YYYY-MM-DD'),
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
      render: (price: number) => `${price.toFixed(2)}FCFA`,
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
      title={mode === 'create' ? 'Créer une nouvelle commande client' : 'Modifier la commande'}
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
            label="Date"
            name="date"
            style={{ flex: 1 }}
            rules={[{ required: true, message: 'Date requise' }]}
          >
            <DatePicker style={{ width: '100%' }} />
          </Form.Item>
        </div>

        <div style={{ display: 'flex', gap: '16px' }}>
          <Form.Item
            label="Client"
            name="clientId"
            style={{ flex: 2 }}
            rules={[{ required: true, message: 'Veuillez sélectionner un client' }]}
          >
            <Select placeholder="Sélectionner un client">
              {clients.map(client => (
                <Option key={client.id} value={client.id}>
                  {client.name} - {client.email}
                </Option>
              ))}
            </Select>
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
              <Option value="Expédiée">Expédiée</Option>
              <Option value="Livrée">Livrée</Option>
              <Option value="Annulée">Annulée</Option>
            </Select>
          </Form.Item>
        </div>

        <Form.Item
          label="Adresse de livraison"
          name="deliveryAddress"
        >
          <TextArea rows={2} placeholder="Adresse de livraison..." />
        </Form.Item>

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
          <TextArea rows={2} placeholder="Notes additionnelles..." />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ClientOrderModal;
