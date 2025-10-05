import type React from 'react';
import { Table, Button, Space, Tag, Card } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';

const Categories: React.FC = () => {
  const columns = [
    {
      title: 'Nom',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Nombre d\'Articles',
      dataIndex: 'articleCount',
      key: 'articleCount',
      render: (count: number) => (
        <Tag color="blue">{count} articles</Tag>
      ),
    },
    {
      title: 'Statut',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        <Tag color={status === 'Active' ? 'green' : 'red'}>
          {status}
        </Tag>
      ),
    },
    {
      title: 'Date Création',
      dataIndex: 'createdDate',
      key: 'createdDate',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: () => (
        <Space size="middle">
          <Button type="link" icon={<EditOutlined />} />
          <Button type="link" danger icon={<DeleteOutlined />} />
        </Space>
      ),
    },
  ];

  const data = [
    {
      key: '1',
      name: 'Électronique',
      description: 'Appareils électroniques et informatiques',
      articleCount: 45,
      status: 'Active',
      createdDate: '2023-12-01',
    },
    {
      key: '2',
      name: 'Accessoires',
      description: 'Accessoires informatiques et périphériques',
      articleCount: 28,
      status: 'Active',
      createdDate: '2023-12-01',
    },
    {
      key: '3',
      name: 'Mobilier',
      description: 'Mobilier de bureau et ergonomie',
      articleCount: 12,
      status: 'Active',
      createdDate: '2023-12-05',
    },
    {
      key: '4',
      name: 'Consommables',
      description: 'Fournitures et consommables de bureau',
      articleCount: 67,
      status: 'Active',
      createdDate: '2023-12-10',
    },
    {
      key: '5',
      name: 'Obsolète',
      description: 'Produits en fin de vie',
      articleCount: 3,
      status: 'Inactive',
      createdDate: '2023-11-15',
    },
  ];

  return (
    <Card
      title="Gestion des Catégories"
      extra={
        <Button type="primary" icon={<PlusOutlined />}>
          Ajouter une Catégorie
        </Button>
      }
    >
      <Table
        columns={columns}
        dataSource={data}
        pagination={{ pageSize: 10 }}
        scroll={{ x: 800 }}
      />
    </Card>
  );
};

export default Categories;
