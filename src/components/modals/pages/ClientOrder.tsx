import React, { useState } from 'react';
import { Table, Button, Space, Tag, Card, message, Popconfirm } from 'antd';
import { PlusOutlined, EyeOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import ClientOrderModal from '../ClientOrderModal';

interface OrderItem {
  key: string;
  articleId: string;
  articleName: string;
  price: number;
  quantity: number;
  total: number;
}

interface ClientOrderData {
  key: string;
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

const ClientOrders: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'create' | 'edit'>('create');
  const [editingOrder, setEditingOrder] = useState<ClientOrderData | null>(null);
  const [dataSource, setDataSource] = useState<ClientOrderData[]>([
    {
      key: '1',
      orderNumber: 'CMD001',
      clientName: 'Esthe Provisaline',
      clientId: '1',
      date: '2024-01-15',
      amount: 299.99,
      status: 'Livrée',
      items: [],
    },
    {
      key: '2',
      orderNumber: 'CMD002',
      clientName: 'Fonte Martin',
      clientId: '2',
      date: '2024-01-16',
      amount: 150.00,
      status: 'Expédiée',
      items: [],
    },
    {
      key: '3',
      orderNumber: 'CMD003',
      clientName: 'Mbassi Nathan',
      clientId: '4',
      date: '2024-01-17',
      amount: 89.99,
      status: 'Confirmée',
      items: [],
    },
    {
      key: '4',
      orderNumber: 'CMD004',
      clientName: 'Kombou Dubois',
      clientId: '3',
      date: '2024-01-18',
      amount: 199.99,
      status: 'En attente',
      items: [],
    },
    {
      key: '5',
      orderNumber: 'CMD005',
      clientName: 'Jean Dupont',
      clientId: '1',
      date: '2024-01-19',
      amount: 75.50,
      status: 'Annulée',
      items: [],
    },
  ]);

  const handleCreate = () => {
    setModalMode('create');
    setEditingOrder(null);
    setIsModalOpen(true);
  };

  const handleEdit = (record: ClientOrderData) => {
    setModalMode('edit');
    setEditingOrder(record);
    setIsModalOpen(true);
  };

  const handleView = (record: ClientOrderData) => {
    message.info(`Affichage des détails de la commande ${record.orderNumber}`);
  };

  const handleDelete = (key: string) => {
    const newData = dataSource.filter(item => item.key !== key);
    setDataSource(newData);
    message.success('Commande supprimée avec succès');
  };

  const handleModalSubmit = (values: Omit<ClientOrderData, 'key'>) => {
    if (modalMode === 'create') {
      const newOrder: ClientOrderData = {
        ...values,
        key: Date.now().toString(),
      };
      setDataSource([...dataSource, newOrder]);
    } else if (modalMode === 'edit' && editingOrder) {
      const newData = dataSource.map(item =>
        item.key === editingOrder.key ? { ...item, ...values } : item
      );
      setDataSource(newData);
    }
  };

  const columns = [
    {
      title: 'N° Commande',
      dataIndex: 'orderNumber',
      key: 'orderNumber',
      render: (orderNumber: string, record: ClientOrderData) => (
        <Button type="link" style={{ color: '#1677ff', fontWeight: 600 }} onClick={() => handleView(record)}>
          {orderNumber}
        </Button>
      ),
    },
    {
      title: 'Client',
      dataIndex: 'clientName',
      key: 'clientName',
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: 'Montant',
      dataIndex: 'amount',
      key: 'amount',
      render: (amount: number) => `${amount.toFixed(2)}FCFA`,
    },
    {
      title: 'Statut',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => {
        let color = 'default';
        switch (status) {
          case 'En attente':
            color = 'orange'; // orange
            break;
          case 'Confirmée':
            color = 'green'; // green
            break;
          case 'Expédiée':
            color = 'geekblue'; // blue
            break;
          case 'Livrée':
            color = 'cyan'; // cyan
            break;
          case 'Annulée':
            color = 'volcano'; // volcano (red/orange)
            break;
        }
        return <Tag color={color} style={{ fontWeight: 600 }}>{status}</Tag>;
      },
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_: unknown, record: ClientOrderData) => (
        <Space size="middle">
          <Button
            type="link"
            icon={<EyeOutlined style={{ color: '#1677ff' }} />}
            style={{ color: '#1677ff', fontWeight: 600 }}
            onClick={() => handleView(record)}
          >
            Voir
          </Button>
          <Button
            type="link"
            icon={<EditOutlined style={{ color: '#1677ff' }} />}
            style={{ color: '#1677ff', fontWeight: 600 }}
            onClick={() => handleEdit(record)}
          >
            Modifier
          </Button>
          <Popconfirm
            title="Supprimer la commande"
            description="Êtes-vous sûr de vouloir supprimer cette commande ?"
            onConfirm={() => handleDelete(record.key)}
            okText="Oui"
            cancelText="Non"
          >
            <Button type="link" danger icon={<DeleteOutlined style={{ color: '#ff4d4f' }} />} style={{ color: '#ff4d4f', fontWeight: 600 }}>
              Supprimer
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <>
      <Card
        title="Commandes Clients"
        extra={
          <Button type="primary" icon={<PlusOutlined />} onClick={handleCreate}>
            Nouvelle Commande
          </Button>
        }
      >
        <Table
          columns={columns}
          dataSource={dataSource}
          pagination={{ pageSize: 10 }}
          scroll={{ x: 800 }}
        />
      </Card>

      <ClientOrderModal
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        onSubmit={handleModalSubmit}
        editingOrder={editingOrder ?? undefined}
        mode={modalMode}
      />
    </>
  );
};

export default ClientOrders;
