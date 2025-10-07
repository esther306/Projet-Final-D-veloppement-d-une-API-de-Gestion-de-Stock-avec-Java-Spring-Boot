import type React from 'react';
import { useEffect } from 'react';
import { Modal, Form, Input, Select, message } from 'antd';

const { Option } = Select;

interface ClientData {
  key?: string;
  name: string;
  email: string;
  phone: string;
  city: string;
  status: string;
  address?: string;
  postalCode?: string;
  company?: string;
}

interface ClientModalProps {
  open: boolean;
  onCancel: () => void;
  onSubmit: (values: ClientData) => void;
  editingClient?: ClientData | null;
  mode: 'create' | 'edit';
}

const ClientModal: React.FC<ClientModalProps> = ({
  open,
  onCancel,
  onSubmit,
  editingClient,
  mode
}) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (open) {
      if (mode === 'edit' && editingClient) {
        form.setFieldsValue(editingClient);
      } else {
        form.resetFields();
        // Valeur par défaut pour un nouveau client
        form.setFieldsValue({ status: 'Actif' });
      }
    }
  }, [open, mode, editingClient, form]);

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      onSubmit(values);
      message.success(mode === 'create' ? 'Client créé avec succès' : 'Client modifié avec succès');
      form.resetFields();
      onCancel();
    } catch (error) {
      console.error('Erreur de validation:', error);
    }
  };

  return (
    <Modal
      title={mode === 'create' ? 'Créer un nouveau client' : 'Modifier le client'}
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
          label="Nom complet"
          name="name"
          rules={[
            { required: true, message: 'Veuillez saisir le nom du client' },
            { min: 2, message: 'Le nom doit contenir au moins 2 caractères' }
          ]}
        >
          <Input placeholder="nom" />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          rules={[
            { required: true, message: 'Veuillez saisir l\'email' },
            { type: 'email', message: 'Veuillez saisir un email valide' }
          ]}
        >
          <Input placeholder="email" />
        </Form.Item>

        <div style={{ display: 'flex', gap: '16px' }}>
          <Form.Item
            label="Téléphone"
            name="phone"
            style={{ flex: 1 }}
            rules={[
              { required: true, message: 'Veuillez saisir le téléphone' },
              { pattern: /^[\d\s\-\+\.]+$/, message: 'Format de téléphone invalide' }
            ]}
          >
            <Input placeholder="Numero de telephone" />
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
          label="Entreprise (optionnel)"
          name="company"
        >
          <Input placeholder="Ex: ABC Société" />
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
            <Input placeholder="Entrez votre ville" />
          </Form.Item>
        </div>
      </Form>
    </Modal>
  );
};

export default ClientModal;
