import React, { useState } from 'react';
import { Form, Input, Button, Card, message } from 'antd';

const API_URL = 'https://inventory-service-nilo.onrender.com';

const Register: React.FC = () => {
  const [loading, setLoading] = useState(false);

  const onFinish = async (values: any) => {
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });
      if (response.ok) {
        message.success('Inscription réussie !');
        window.location.href = '/login';
      } else {
        const data = await response.json();
        message.error(data.message || 'Erreur lors de l\'inscription');
      }
    } catch (error) {
      message.error('Erreur réseau');
    }
    setLoading(false);
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f8fafc' }}>
      <Card title="Inscription" style={{ width: 400, borderRadius: 16 }}>
        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item label="Nom d'utilisateur" name="username" rules={[{ required: true, message: 'Entrez votre nom d\'utilisateur' }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Email" name="email" rules={[{ required: true, type: 'email', message: 'Entrez votre email' }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Mot de passe" name="password" rules={[{ required: true, message: 'Entrez votre mot de passe' }]}>
            <Input.Password />
          </Form.Item>
          <Form.Item label="Téléphone" name="phone">
            <Input />
          </Form.Item>
          <Form.Item label="Nom" name="nom">
            <Input />
          </Form.Item>
          <Form.Item label="Rôle" name="role">
            <Input />
          </Form.Item>
          <Form.Item label="Entreprise ID" name="entrepriseId" rules={[{ required: true, message: 'Entrez l\'ID de l\'entreprise' }]}>
            <Input />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" block loading={loading}>
              S'inscrire
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default Register;