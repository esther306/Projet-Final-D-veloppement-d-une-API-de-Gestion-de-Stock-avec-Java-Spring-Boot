import type React from 'react';
import { useEffect, useState } from 'react';
import { Table, Button, Space, Tag, Card, message, Popconfirm } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import ArticleModal from '../ArticlesModal';
import { useApi } from '../../../hooks/useApi';
import { articleService } from '../../../services';
import axios from 'axios';

interface ArticleData {
  key: string;
  reference: string;
  name: string;
  category: string;
  price: number;
  stock: number;
}

export const Articles: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'create' | 'edit'>('create');
  const [editingArticle, setEditingArticle] = useState(null);
  const { loading, error, execute } = useApi();

  
 
  const [dataSource, setDataSource] = useState([]);

   const loadArticles = async () => {
    try {
      const response = await axios.get('https://inventory-service-nilo.onrender.com/gestiondestock/api/v1/api/articles/showAll');
      setDataSource(response.data);
    } catch (err) {
      console.error('Error loading articles:', err);
    }
  };

  const handleCreate = () => {
    setModalMode('create');
    setEditingArticle(null);
    setIsModalOpen(true);
  };

  const handleEdit = (record: ArticleData) => {
    setModalMode('edit');
    setEditingArticle(record);
    setIsModalOpen(true);
  };

  const handleDelete = (key: string) => {
    const newData = dataSource.filter(item => item.key !== key);
    setDataSource(newData);
    message.success('Article supprimé avec succès');
  };

  const handleModalSubmit = (values: Omit<ArticleData, 'key'>) => {
    if (modalMode === 'create') {
      const newArticle = {
        ...values,
        key: Date.now().toString(),
      };
      setDataSource([...dataSource, newArticle]);
    } else if (modalMode === 'edit' && editingArticle) {
      const newData = dataSource.map(item =>
        item.key === editingArticle.key ? { ...item, ...values } : item
      );
      setDataSource(newData);
    }
  };

  const columns = [
    {
      title: 'Référence',
      dataIndex: 'reference',
      key: 'reference',
    },
    {
      title: 'Nom',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Catégorie',
      dataIndex: 'category',
      key: 'category',
      render: (category: string) => (
        <Tag color="blue">{category}</Tag>
      ),
    },
    {
      title: 'Prix',
      dataIndex: 'price',
      key: 'price',
      render: (price: number) => `${price}FCFA`,
    },
    {
      title: 'Stock',
      dataIndex: 'stock',
      key: 'stock',
      render: (stock: number) => (
        <Tag color={stock > 10 ? 'green' : stock > 0 ? 'orange' : 'red'}>
          {stock}
        </Tag>
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_: unknown, record: ArticleData) => (
        <Space size="middle">
          <Button
            type="link"
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
          >
            Modifier
          </Button>
          <Popconfirm
            title="Supprimer l'article"
            description="Êtes-vous sûr de vouloir supprimer cet article ?"
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

  useEffect(() => {
    loadArticles();
  }, []);


  return (
    <>
      <Card
        title="Gestion des Articles"
        extra={
          <Button type="primary" icon={<PlusOutlined />} onClick={handleCreate}>
            Ajouter un Article
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

      <ArticleModal
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        onSubmit={handleModalSubmit}
        editingArticle={editingArticle}
        mode={modalMode}
      />
    </>
  );
};

export default Articles;
