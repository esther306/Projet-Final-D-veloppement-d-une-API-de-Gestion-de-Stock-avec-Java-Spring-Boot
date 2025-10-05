import type React from 'react';
import { useEffect } from 'react';
import { Modal, Form, Input, Select, message } from 'antd';

const { Option } = Select;

interface SupplierData {
  key?: string;
  name: string;
  email: string;
  contact: string;
  phone: string;
  city: string;
  status: string;
  address?: string;
  postalCode?: string;
  siret?: string;
  paymentTerms?: string;
}

interface SupplierModalProps {
  open: boolean;
  onCancel: () => void;
  onSubmit: (values: SupplierData) => void;
  editingSupplier?: SupplierData | null;
  mode: 'create' | 'edit';
}

const SupplierModal: React.FC<SupplierModalProps> = ({
  open,
  onCancel,
  onSubmit,
  editingSupplier,
  mode
}) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (open) {
      if (mode === 'edit' && editingSupplier) {
        form.setFieldsValue(editingSupplier);
      } else {
        form.resetFields();
        // Valeurs par défaut pour un nouveau fournisseur
        form.setFieldsValue({
          status: 'Actif',
          paymentTerms: '30'
        });
      }
    }
  }, [open, mode, editingSupplier, form]);

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      onSubmit(values);
      message.success(mode === 'create' ? 'Fournisseur créé avec succès' : 'Fournisseur modifié avec succès');
      form.resetFields();
      onCancel();
    } catch (error) {
      console.error('Erreur de validation:', error);
    }
  };

  return (
    <Modal
      title={mode === 'create' ? 'Créer un nouveau fournisseur' : 'Modifier le fournisseur'}
      open={open}
      onOk={handleSubmit}
      onCancel={onCancel}
      okText={mode === 'create' ? 'Créer' : 'Modifier'}
      cancelText="Annuler"
      destroyOnClose
      width={600}
    >
      <Form
        form={form}
        layout="vertical"
        requiredMark={false}
      >
        <Form.Item
          label="Nom de l'entreprise"
          name="name"
          rules={[
            { required: true, message: 'Veuillez saisir le nom de l\'entreprise' },
            { min: 2, message: 'Le nom doit contenir au moins 2 caractères' }
          ]}
        >
          <Input placeholder="Entreprise" />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          rules={[
            { required: true, message: 'Veuillez saisir l\'email' },
            { type: 'email', message: 'Veuillez saisir un email valide' }
          ]}
        >
          <Input placeholder="Email" />
        </Form.Item>

        <div style={{ display: 'flex', gap: '16px' }}>
          <Form.Item
            label="Personne de contact"
            name="contact"
            style={{ flex: 1 }}
            rules={[
              { required: true, message: 'Veuillez saisir la personne de contact' },
              { min: 2, message: 'Le nom doit contenir au moins 2 caractères' }
            ]}
          >
            <Input placeholder="Ex: Michel Leroy" />
          </Form.Item>

          <Form.Item
            label="Statut"
            name="status"
            style={{ flex: 1 }}
            rules={[{ required: true, message: 'Veuillez sélectionner un statut' }]}
          >
            <Select>
              <Option value="Actif">Actif</Option>
              <Option value="Inactif">Inactif</Option>
            </Select>
          </Form.Item>
        </div>

        <Form.Item
          label="Téléphone"
          name="phone"
          rules={[
            { required: true, message: 'Veuillez saisir le téléphone' },
            { pattern: /^[\d\s\-\+\.]+$/, message: 'Format de téléphone invalide' }
          ]}
        >
          <Input placeholder="Telephone" />
        </Form.Item>

        <Form.Item
          label="Adresse"
          name="address"
          rules={[{ required: true, message: 'Veuillez saisir l\'adresse' }]}
        >
          <Input placeholder="Adresse" />
        </Form.Item>

        <div style={{ display: 'flex', gap: '16px' }}>

          <Form.Item
            label="Ville"
            name="city"
            style={{ flex: 2 }}
            rules={[
              { required: true, message: 'Veuillez saisir la ville' },
              { min: 2, message: 'La ville doit contenir au moins 2 caractères' }
            ]}
          >
            <Input placeholder="Ville" />
          </Form.Item>
        </div>

      </Form>
    </Modal>
  );
};

export default SupplierModal;
