import type React from 'react';
import { useState } from 'react';
import { Table, Button, Space, Tag, Card, Avatar, message, Popconfirm } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, UserOutlined } from '@ant-design/icons';
import ClientModal from '../ClientModal';

interface ClientData {
  key: string;
  name: string;
  email: string;
  phone: string;
  city: string;
  status: string;
  totalOrders: number;
}

const Clients: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'create' | 'edit'>('create');
  const [editingClient, setEditingClient] = useState<ClientData | null>(null);
  const [dataSource, setDataSource] = useState<ClientData[]>([
    {
      key: '1',
      name: 'Esthe Provisaline',
      email: 'esther.provisaline@email.com',
      phone: '06 12 34 56 78',
      city: 'Paris',
      status: 'Actif',
      totalOrders: 1250.50,
    },
    {
      key: '2',
      name: 'Fonte Martin',
      email: 'fonte.martin@email.com',
      phone: '06 98 76 54 32',
      city: 'Lyon',
      status: 'Actif',
      totalOrders: 890.00,
    },
    {
      key: '3',
      name: 'Mbassi Nathan',
      email: 'nathan.mbassi@email.com',
      phone: '06 11 22 33 44',
      city: 'Marseille',
      status: 'Inactif',
      totalOrders: 0.00,
    },
    {
      key: '4',
      name: 'Kombou Dubois',
      email: 'kombou.dubois@email.com',
      phone: '06 55 66 77 88',
      city: 'Toulouse',
      status: 'Actif',
      totalOrders: 2100.75,
    },
  ]);

  const handleCreate = () => {
    setModalMode('create');
    setEditingClient(null);
    setIsModalOpen(true);
  };

  const handleEdit = (record: ClientData) => {
    setModalMode('edit');
    setEditingClient(record);
    setIsModalOpen(true);
  };

  const handleDelete = (key: string) => {
    const newData = dataSource.filter(item => item.key !== key);
    setDataSource(newData);
    message.success('Client supprimé avec succès');
  };

  const handleModalSubmit = (values: Omit<ClientData, 'key' | 'totalOrders'>) => {
    if (modalMode === 'create') {
      const newClient: ClientData = {
        ...values,
        key: Date.now().toString(),
        totalOrders: 0,
      };
      setDataSource([...dataSource, newClient]);
    } else if (modalMode === 'edit' && editingClient) {
      const newData = dataSource.map(item =>
        item.key === editingClient.key ? { ...item, ...values } : item
      );
      setDataSource(newData);
    }
  };

  const columns = [
    {
      title: 'Client',
      dataIndex: 'name',
      key: 'name',
      render: (name: string, record: { email: string }) => (
        <Space>
          <Avatar icon={<UserOutlined />} />
          <div>
            <div>{name}</div>
            <div style={{ fontSize: '12px', color: '#666' }}>{record.email}</div>
          </div>
        </Space>
      ),
    },
    {
      title: 'Téléphone',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: 'Ville',
      dataIndex: 'city',
      key: 'city',
    },
    {
      title: 'Statut',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        <Tag color={status === 'Actif' ? 'green' : 'red'}>
          {status}
        </Tag>
      ),
    },
    {
      title: 'Total Commandes',
      dataIndex: 'totalOrders',
      key: 'totalOrders',
      render: (total: number) => `${total}FCFA`,
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_: unknown, record: ClientData) => (
        <Space size="middle">
          <Button
            type="link"
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
          >
            Modifier
          </Button>
          <Popconfirm
            title="Supprimer le client"
            description="Êtes-vous sûr de vouloir supprimer ce client ?"
            onConfirm={() => handleDelete(record.key)}
            okText="Oui"
            cancelText="Non"
          >
            <Button type="link" danger icon={<DeleteOutlined />}>
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
        title="Gestion des Clients"
        extra={
          <Button type="primary" icon={<PlusOutlined />} onClick={handleCreate}>
            Ajouter un Client
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

      <ClientModal
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        onSubmit={handleModalSubmit}
        editingClient={editingClient}
        mode={modalMode}
      />
    </>
  );
};

export default Clients;
