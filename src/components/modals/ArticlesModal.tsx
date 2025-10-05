import type React from 'react';
import { useEffect } from 'react';
import { Modal, Form, Input, Select, InputNumber, message } from 'antd';

const { Option } = Select;

interface ArticleData {
  key?: string;
  reference: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  description?: string;
}

interface ArticleModalProps {
  open: boolean;
  onCancel: () => void;
  onSubmit: (values: ArticleData) => void;
  editingArticle?: ArticleData | null;
  mode: 'create' | 'edit';
}

const ArticleModal: React.FC<ArticleModalProps> = ({
  open,
  onCancel,
  onSubmit,
  editingArticle,
  mode
}) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (open) {
      if (mode === 'edit' && editingArticle) {
        form.setFieldsValue(editingArticle);
      } else {
        form.resetFields();
      }
    }
  }, [open, mode, editingArticle, form]);

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      onSubmit(values);
      message.success(mode === 'create' ? 'Article créé avec succès' : 'Article modifié avec succès');
      form.resetFields();
      onCancel();
    } catch (error) {
      console.error('Erreur de validation:', error);
    }
  };

  return (
    <Modal
      title={mode === 'create' ? 'Créer un nouvel article' : 'Modifier l\'article'}
      open={open}
      onOk={handleSubmit}
      onCancel={onCancel}
      okText={mode === 'create' ? 'Créer' : 'Modifier'}
      cancelText="Annuler"
      destroyOnClose
    >
      <Form
        form={form}
        layout="vertical"
        requiredMark={false}
      >
        <Form.Item
          label="Référence"
          name="reference"
          rules={[
            { required: true, message: 'Veuillez saisir la référence' },
            { min: 3, message: 'La référence doit contenir au moins 3 caractères' }
          ]}
        >
          <Input placeholder="Ex: ART001" />
        </Form.Item>

        <Form.Item
          label="Nom de l'article"
          name="name"
          rules={[
            { required: true, message: 'Veuillez saisir le nom de l\'article' },
            { min: 2, message: 'Le nom doit contenir au moins 2 caractères' }
          ]}
        >
          <Input placeholder="Ex: Ordinateur Portable" />
        </Form.Item>

        <Form.Item
          label="Catégorie"
          name="category"
          rules={[{ required: true, message: 'Veuillez sélectionner une catégorie' }]}
        >
          <Select placeholder="Sélectionner une catégorie">
            <Option value="Électronique">Électronique</Option>
            <Option value="Accessoires">Accessoires</Option>
            <Option value="Mobilier">Mobilier</Option>
            <Option value="Consommables">Consommables</Option>
            <Option value="Vêtements">Vêtements</Option>
            <Option value="Livres">Livres</Option>
          </Select>
        </Form.Item>

        <Form.Item
          label="Prix (FCFA)"
          name="price"
          rules={[
            { required: true, message: 'Veuillez saisir le prix' },
            { type: 'number', min: 0.01, message: 'Le prix doit être supérieur à 0' }
          ]}
        >
          <InputNumber
            style={{ width: '100%' }}
            placeholder="0.00"
            precision={2}
            min={0}
          />
        </Form.Item>

        <Form.Item
          label="Stock initial"
          name="stock"
          rules={[
            { required: true, message: 'Veuillez saisir le stock' },
            { type: 'number', min: 0, message: 'Le stock ne peut pas être négatif' }
          ]}
        >
          <InputNumber
            style={{ width: '100%' }}
            placeholder="0"
            min={0}
          />
        </Form.Item>

        <Form.Item
          label="Description"
          name="description"
        >
          <Input.TextArea
            rows={3}
            placeholder="Description optionnelle de l'article..."
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ArticleModal;
