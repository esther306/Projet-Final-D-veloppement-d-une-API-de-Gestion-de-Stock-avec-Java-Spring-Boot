import React, { useState } from 'react';
import { Form, Input, Button, Card, message } from 'antd';

const API_URL = 'https://inventory-service-nilo.onrender.com';

const Login: React.FC = () => {
  const [loading, setLoading] = useState(false);

  const onFinish = async (values: { email: string; password: string }) => {
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });
      const data = await response.json();
      if (response.ok && data.token) {
        localStorage.setItem('token', data.token);
        message.success('Connexion réussie !');
        window.location.href = '/';
      } else {
        message.error(data.message || 'Erreur de connexion');
      }
    } catch (error) {
      message.error('Erreur réseau');
    }
    setLoading(false);
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f8fafc' }}>
      <Card title="Connexion" style={{ width: 350, borderRadius: 16 }}>
        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item label="Email" name="email" rules={[{ required: true, type: 'email', message: 'Entrez votre email' }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Mot de passe" name="password" rules={[{ required: true, message: 'Entrez votre mot de passe' }]}>
            <Input.Password />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" block loading={loading}>
              Se connecter
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default Login;