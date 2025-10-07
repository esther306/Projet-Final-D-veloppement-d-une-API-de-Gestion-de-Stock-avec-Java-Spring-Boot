import type React from 'react';
import { Table, Button, Space, Tag, Card } from 'antd';
import { PlusOutlined, EyeOutlined, EditOutlined } from '@ant-design/icons';

const SupplierOrders: React.FC = () => {
  const columns = [
    {
      title: 'N° Commande',
      dataIndex: 'orderNumber',
      key: 'orderNumber',
      render: (orderNumber: string) => (
        <Button type="link">{orderNumber}</Button>
      ),
    },
    {
      title: 'Fournisseur',
      dataIndex: 'supplierName',
      key: 'supplierName',
    },
    {
      title: 'Date Commande',
      dataIndex: 'orderDate',
      key: 'orderDate',
    },
    {
      title: 'Date Livraison',
      dataIndex: 'deliveryDate',
      key: 'deliveryDate',
    },
    {
      title: 'Montant',
      dataIndex: 'amount',
      key: 'amount',
      render: (amount: number) => `${amount}FCFA`,
    },
    {
      title: 'Statut',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => {
        let color = 'default';
        switch (status) {
          case 'En attente':
            color = 'orange';
            break;
          case 'Confirmée':
            color = 'blue';
            break;
          case 'En transit':
            color = 'purple';
            break;
          case 'Reçue':
            color = 'green';
            break;
          case 'Annulée':
            color = 'red';
            break;
        }
        return <Tag color={color}>{status}</Tag>;
      },
    },
    {
      title: 'Actions',
      key: 'actions',
      render: () => (
        <Space size="middle">
          <Button type="link" icon={<EyeOutlined />} />
          <Button type="link" icon={<EditOutlined />} />
        </Space>
      ),
    },
  ];

  const data = [
    {
      key: '1',
      orderNumber: 'ACH001',
      supplierName: 'TechWorld SARL',
      orderDate: '2024-01-10',
      deliveryDate: '2024-01-20',
      amount: 2500.00,
      status: 'Reçue',
    },
    {
      key: '2',
      orderNumber: 'ACH002',
      supplierName: 'ElectroPlus',
      orderDate: '2024-01-12',
      deliveryDate: '2024-01-22',
      amount: 1800.50,
      status: 'En transit',
    },
    {
      key: '3',
      orderNumber: 'ACH003',
      supplierName: 'Digital Supply',
      orderDate: '2024-01-15',
      deliveryDate: '2024-01-25',
      amount: 3200.75,
      status: 'Confirmée',
    },
    {
      key: '4',
      orderNumber: 'ACH004',
      supplierName: 'TechWorld SARL',
      orderDate: '2024-01-18',
      deliveryDate: '2024-01-28',
      amount: 950.00,
      status: 'En attente',
    },
    {
      key: '5',
      orderNumber: 'ACH005',
      supplierName: 'Accessoires Pro',
      orderDate: '2024-01-16',
      deliveryDate: '-',
      amount: 450.00,
      status: 'Annulée',
    },
  ];

  return (
    <Card
      title="Commandes Fournisseurs"
      extra={
        <Button type="primary" icon={<PlusOutlined />}>
          Nouvelle Commande
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

export default SupplierOrders;
