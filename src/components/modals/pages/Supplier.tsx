import type React from 'react';
import { useState } from 'react';
import { Table, Button, Space, Tag, Card, Avatar, message, Popconfirm } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, ShopOutlined } from '@ant-design/icons';
import SupplierModal from '../SupplierModal';

interface SupplierData {
  key: string;
  name: string;
  email: string;
  contact: string;
  phone: string;
  city: string;
  status: string;
  totalPurchases: number;
}

const Suppliers: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'create' | 'edit'>('create');
  const [editingSupplier, setEditingSupplier] = useState<SupplierData | null>(null);
  const [dataSource, setDataSource] = useState<SupplierData[]>([
    {
      key: '1',
      name: 'TechWorld SARL',
      email: 'contact@techworld.fr',
      contact: 'Michel Leroy',
      phone: '01 23 45 67 89',
      city: 'Paris',
      status: 'Actif',
      totalPurchases: 15750.00,
    },
    {
      key: '2',
      name: 'ElectroPlus',
      email: 'info@electroplus.fr',
      contact: 'Sarah Chen',
      phone: '04 56 78 90 12',
      city: 'Lyon',
      status: 'Actif',
      totalPurchases: 9800.50,
    },
    {
      key: '3',
      name: 'Accessoires Pro',
      email: 'commandes@accessoirespro.fr',
      contact: 'David Martin',
      phone: '02 34 56 78 90',
      city: 'Nantes',
      status: 'Inactif',
      totalPurchases: 0.00,
    },
    {
      key: '4',
      name: 'Digital Supply',
      email: 'ventes@digitalsupply.fr',
      contact: 'Emma Dubois',
      phone: '05 67 89 01 23',
      city: 'Bordeaux',
      status: 'Actif',
      totalPurchases: 22100.75,
    },
  ]);

  const handleCreate = () => {
    setModalMode('create');
    setEditingSupplier(null);
    setIsModalOpen(true);
  };

  const handleEdit = (record: SupplierData) => {
    setModalMode('edit');
    setEditingSupplier(record);
    setIsModalOpen(true);
  };

  const handleDelete = (key: string) => {
    const newData = dataSource.filter(item => item.key !== key);
    setDataSource(newData);
    message.success('Fournisseur supprimé avec succès');
  };

  const handleModalSubmit = (values: Omit<SupplierData, 'key' | 'totalPurchases'>) => {
    if (modalMode === 'create') {
      const newSupplier: SupplierData = {
        ...values,
        key: Date.now().toString(),
        totalPurchases: 0,
      };
      setDataSource([...dataSource, newSupplier]);
    } else if (modalMode === 'edit' && editingSupplier) {
      const newData = dataSource.map(item =>
        item.key === editingSupplier.key ? { ...item, ...values } : item
      );
      setDataSource(newData);
    }
  };

  const columns = [
    {
      title: 'Fournisseur',
      dataIndex: 'name',
      key: 'name',
      render: (name: string, record: { email: string }) => (
        <Space>
          <Avatar icon={<ShopOutlined />} />
          <div>
            <div>{name}</div>
            <div style={{ fontSize: '12px', color: '#666' }}>{record.email}</div>
          </div>
        </Space>
      ),
    },
    {
      title: 'Contact',
      dataIndex: 'contact',
      key: 'contact',
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
      title: 'Total Achats',
      dataIndex: 'totalPurchases',
      key: 'totalPurchases',
      render: (total: number) => `${total}FCFA`,
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_: unknown, record: SupplierData) => (
        <Space size="middle">
          <Button
            type="link"
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
          >
            Modifier
          </Button>
          <Popconfirm
            title="Supprimer le fournisseur"
            description="Êtes-vous sûr de vouloir supprimer ce fournisseur ?"
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
        title="Gestion des Fournisseurs"
        extra={
          <Button type="primary" icon={<PlusOutlined />} onClick={handleCreate}>
            Ajouter un Fournisseur
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

      <SupplierModal
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        onSubmit={handleModalSubmit}
        editingSupplier={editingSupplier}
        mode={modalMode}
      />
    </>
  );
};

export default Suppliers;
