import React from 'react';
import { Card, Switch, Button, Form, Input, Select, Row, Col } from 'antd';
import {
  SettingOutlined,
  NotificationOutlined,
  SyncOutlined,
  CloudDownloadOutlined,
  CloudUploadOutlined,
  RedoOutlined,
  AppstoreOutlined,
} from '@ant-design/icons';

const { Option } = Select;

const Settings: React.FC = () => (
  <div style={{ padding: 32, background: '#f8fafc', minHeight: '100vh' }}>
    <h1 style={{ fontWeight: 700, fontSize: 32 }}>Paramètres</h1>
    <div style={{ color: '#888', marginBottom: 24 }}>
      Configurez votre système de gestion des stocks
    </div>

    {/* Paramètres Généraux */}
    <Card
      style={{ marginBottom: 24, borderRadius: 16 }}
      title={
        <span>
          <SettingOutlined style={{ color: '#4096ff', marginRight: 8 }} />
          Paramètres Généraux
        </span>
      }
    >
      <Form layout="vertical">
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item label="Nom de l'entreprise">
              <Input defaultValue="Ma Société SARL" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Devise par défaut">
              <Select defaultValue="euro">
                <Option value="euro">€ Euro</Option>
                <Option value="usd">$ Dollar</Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item label="Langue de l'interface">
              <Select defaultValue="fr">
                <Option value="fr">Français</Option>
                <Option value="en">English</Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Card>

    {/* Configuration du Stock */}
    <Card
      style={{ marginBottom: 24, borderRadius: 16 }}
      title={
        <span>
          <AppstoreOutlined style={{ color: '#52c41a', marginRight: 8 }} />
          Configuration du Stock
        </span>
      }
    >
      <Form layout="vertical">
        <Row gutter={16}>
          <Col span={8}>
            <Form.Item label="Seuil de stock faible">
              <Input defaultValue="10" />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label="Délai de commande (jours)">
              <Input defaultValue="7" />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label="Taux de TVA (%)">
              <Input defaultValue="20" />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Card>

    {/* Notifications */}
    <Card
      style={{ marginBottom: 24, borderRadius: 16 }}
      title={
        <span>
          <NotificationOutlined style={{ color: '#b37feb', marginRight: 8 }} />
          Notifications
        </span>
      }
    >
      <Row align="middle" style={{ marginBottom: 16 }}>
        <Col flex="auto">
          <div style={{ fontWeight: 600 }}>Notifications par email</div>
          <div style={{ color: '#888' }}>Recevoir les alertes par email</div>
        </Col>
        <Col>
          <Switch defaultChecked />
        </Col>
      </Row>
      <Row align="middle" style={{ marginBottom: 16 }}>
        <Col flex="auto">
          <div style={{ fontWeight: 600 }}>Notifications SMS</div>
          <div style={{ color: '#888' }}>Recevoir les alertes urgentes par SMS</div>
        </Col>
        <Col>
          <Switch />
        </Col>
      </Row>
      <Row align="middle" style={{ marginBottom: 16 }}>
        <Col flex="auto">
          <div style={{ fontWeight: 600 }}>Alertes stock faible</div>
          <div style={{ color: '#888' }}>Notifications automatiques de stock faible</div>
        </Col>
        <Col>
          <Switch defaultChecked />
        </Col>
      </Row>
      <Row align="middle">
        <Col flex="auto">
          <div style={{ fontWeight: 600 }}>Alertes de commandes</div>
          <div style={{ color: '#888' }}>Notifications pour les nouvelles commandes</div>
        </Col>
        <Col>
          <Switch defaultChecked />
        </Col>
      </Row>
    </Card>

    {/* Automatisation */}
    <Card
      style={{ marginBottom: 24, borderRadius: 16 }}
      title={
        <span>
          <SyncOutlined style={{ color: '#faad14', marginRight: 8 }} />
          Automatisation
        </span>
      }
    >
      <Row align="middle" style={{ marginBottom: 16 }}>
        <Col flex="auto">
          <div style={{ fontWeight: 600 }}>Réapprovisionnement automatique</div>
          <div style={{ color: '#888' }}>
            Commandes automatiques basées sur les seuils
          </div>
        </Col>
        <Col>
          <Switch />
        </Col>
      </Row>
      <Row align="middle" style={{ marginBottom: 16 }}>
        <Col flex="auto">
          <div style={{ fontWeight: 600 }}>Sauvegarde automatique</div>
          <div style={{ color: '#888' }}>
            Sauvegardes quotidiennes des données
          </div>
        </Col>
        <Col>
          <Switch defaultChecked />
        </Col>
      </Row>
      <Row align="middle">
        <Col flex="auto">
          <div style={{ fontWeight: 600 }}>Rapports automatiques</div>
          <div style={{ color: '#888' }}>
            Génération automatique des rapports mensuels
          </div>
        </Col>
        <Col>
          <Switch defaultChecked />
        </Col>
      </Row>
    </Card>

    {/* Actions Rapides */}
    <Card
      style={{ borderRadius: 16 }}
      title={
        <span>
          <RedoOutlined style={{ color: '#ff7875', marginRight: 8 }} />
          Actions Rapides
        </span>
      }
    >
      <Row gutter={16}>
        <Col>
          <Button icon={<CloudDownloadOutlined />} type="default">
            Sauvegarder
          </Button>
        </Col>
        <Col>
          <Button
            icon={<CloudDownloadOutlined />}
            type="primary"
            style={{ background: '#52c41a', borderColor: '#52c41a' }}
          >
            Exporter les données
          </Button>
        </Col>
        <Col>
          <Button
            icon={<CloudUploadOutlined />}
            type="default"
            style={{ color: '#722ed1', borderColor: '#722ed1' }}
          >
            Importer les données
          </Button>
        </Col>
        <Col>
          <Button icon={<RedoOutlined />} danger>
            Réinitialiser les paramètres
          </Button>
        </Col>
      </Row>
    </Card>
  </div>
);

export default Settings;