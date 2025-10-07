import type React from 'react';
import { Card, Row, Col, Statistic } from 'antd';
import {
  ShoppingOutlined,
  TruckOutlined,
  MoneyCollectFilled,
} from '@ant-design/icons';


const Dashboard: React.FC = () => {
  return (
    <div style={{ background: 'linear-gradient(135deg, #f8fafc 0%, #e6f0ff 100%)', minHeight: '100vh', padding: 0 }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '32px 0' }}>
        {/* Stat Cards */}
        <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
          <Col xs={24} sm={12} lg={6}>
            <Card style={{ background: '#fff', borderRadius: 12, boxShadow: '0 2px 8px #e6e6e6', border: 'none', display: 'flex', alignItems: 'center' }}>
              <Statistic
                title={<span style={{ color: '#23272f', fontWeight: 700 }}>Total Articles</span>}
                value={2457}
                valueStyle={{ color: '#23272f', fontWeight: 700, fontSize: 28 }}
                prefix={<span style={{ background: '#1677ff', color: '#fff', borderRadius: 8, padding: '6px', marginRight: 8 }}><ShoppingOutlined /></span>}
                suffix={<span style={{ color: '#52c41a', fontWeight: 600, fontSize: 18, minWidth: 70, display: 'inline-block', textAlign: 'right' }}>+12%</span>}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <Card style={{ background: '#fff', borderRadius: 12, boxShadow: '0 2px 8px #e6e6e6', border: 'none', display: 'flex', alignItems: 'center' }}>
              <Statistic
                title={<span style={{ color: '#23272f', fontWeight: 700 }}>Stock Total</span>}
                value={156234}
                valueStyle={{ color: '#23272f', fontWeight: 700, fontSize: 28 }}
                prefix={<span style={{ background: '#52c41a', color: '#fff', borderRadius: 8, padding: '6px', marginRight: 8 }}><MoneyCollectFilled /></span>}
                suffix={<span style={{ color: '#52c41a', fontWeight: 600, fontSize: 18, minWidth: 70, display: 'inline-block', textAlign: 'right' }}>+8%</span>}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <Card style={{ background: '#fff', borderRadius: 12, boxShadow: '0 2px 8px #e6e6e6', border: 'none', display: 'flex', alignItems: 'center' }}>
              <Statistic
                title={<span style={{ color: '#23272f', fontWeight: 700 }}>Commandes Aujourd'hui</span>}
                value={89}
                valueStyle={{ color: '#23272f', fontWeight: 700, fontSize: 28 }}
                prefix={<span style={{ background: '#722ed1', color: '#fff', borderRadius: 8, padding: '6px', marginRight: 8 }}><TruckOutlined /></span>}
                suffix={<span style={{ color: '#52c41a', fontWeight: 600, fontSize: 18, minWidth: 70, display: 'inline-block', textAlign: 'right' }}>+23%</span>}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <Card style={{ background: '#fff', borderRadius: 12, boxShadow: '0 2px 8px #e6e6e6', border: 'none', display: 'flex', alignItems: 'center' }}>
              <Statistic
                title={<span style={{ color: '#23272f', fontWeight: 700 }}>Valeur Stock</span>}
                value={847290}
                precision={2}
                valueStyle={{ color: '#23272f', fontWeight: 700, fontSize: 28 }}
                prefix={<span style={{ background: '#fa8c16', color: '#fff', borderRadius: 8, padding: '6px', marginRight: 8 }}><MoneyCollectFilled /></span>}
                suffix={<span style={{ color: '#fa8c16', fontWeight: 600, fontSize: 18, minWidth: 70, display: 'inline-block', textAlign: 'right' }}>+15%</span>}
              />
            </Card>
          </Col>
        </Row>

        <Row gutter={[16, 16]}>
          <Col xs={24} lg={16}>
            <Card style={{ background: 'linear-gradient(135deg, #e6f0ff 0%, #f8fafc 100%)', borderRadius: 16, boxShadow: '0 2px 12px #e6e6e6', border: 'none', marginBottom: 24, padding: 0 }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '24px 32px 0 32px' }}>
                <span style={{ fontWeight: 700, fontSize: 22, color: '#1677ff', letterSpacing: 1 }}>
                  <span style={{ marginRight: 10, verticalAlign: 'middle' }}>📈</span> Tendance des stocks
                </span>
                <div>
                  <button style={{ background: '#1677ff', color: '#fff', border: 'none', borderRadius: 8, padding: '4px 16px', fontWeight: 600, marginRight: 8, cursor: 'pointer', fontSize: 15 }}>7 jours</button>
                  <button style={{ background: '#f0f0f0', color: '#23272f', border: 'none', borderRadius: 8, padding: '4px 16px', fontWeight: 600, marginRight: 8, cursor: 'pointer', fontSize: 15 }}>30 jours</button>
                  <button style={{ background: '#f0f0f0', color: '#23272f', border: 'none', borderRadius: 8, padding: '4px 16px', fontWeight: 600, cursor: 'pointer', fontSize: 15 }}>90 jours</button>
                </div>
              </div>
              <div style={{ background: 'linear-gradient(135deg, #1677ff 0%, #52c41a 100%)', borderRadius: 12, height: 220, margin: '24px 32px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: '#fff', boxShadow: '0 4px 24px #e6e6e6' }}>
                <div style={{ fontSize: 48, marginBottom: 12 }}>
                  <span role="img" aria-label="chart">📊</span>
                </div>
                <div style={{ fontSize: 22, fontWeight: 700, marginBottom: 8 }}>Visualisez vos mouvements de stock</div>
                <div style={{ fontSize: 16, color: '#fff', opacity: 0.85, marginBottom: 16 }}>Ajoutez un graphique interactif pour suivre les tendances et optimiser votre gestion.</div>
                <button style={{ background: '#fff', color: '#1677ff', border: 'none', borderRadius: 8, padding: '8px 24px', fontWeight: 700, fontSize: 16, cursor: 'pointer', boxShadow: '0 2px 8px #e6e6e6' }}>Ajouter un graphique</button>
              </div>
            </Card>
          </Col>
          <Col xs={24} lg={8}>
            <Card style={{ background: '#fff', borderRadius: 12, boxShadow: '0 2px 8px #e6e6e6', border: 'none', marginBottom: 24 }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
                <span style={{ fontWeight: 700, fontSize: 18, color: '#23272f' }}>Alertes Stock</span>
                <span style={{ color: '#ff4d4f', fontSize: 22 }}>⚠️</span>
              </div>
              <div>
                <div style={{ background: '#fff1f0', borderRadius: 8, padding: '12px 16px', marginBottom: 12, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div>
                    <span style={{ color: '#ff4d4f', fontWeight: 700 }}>iPhone 15 Pro Max</span>
                    <div style={{ color: '#888', fontSize: 13 }}>Quantité restante: 2</div>
                  </div>
                  <a href="#" style={{ color: '#1677ff', fontWeight: 600 }}>Réapprovisionner</a>
                </div>
                <div style={{ background: '#fffbe6', borderRadius: 8, padding: '12px 16px', marginBottom: 12, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div>
                    <span style={{ color: '#faad14', fontWeight: 700 }}>Samsung Galaxy S24</span>
                    <div style={{ color: '#888', fontSize: 13 }}>Quantité restante: 8</div>
                  </div>
                  <a href="#" style={{ color: '#1677ff', fontWeight: 600 }}>Réapprovisionner</a>
                </div>
                <div style={{ background: '#fffbe6', borderRadius: 8, padding: '12px 16px', marginBottom: 12, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div>
                    <span style={{ color: '#faad14', fontWeight: 700 }}>MacBook Air M3</span>
                    <div style={{ color: '#888', fontSize: 13 }}>Quantité restante: 15</div>
                  </div>
                  <a href="#" style={{ color: '#1677ff', fontWeight: 600 }}>Réapprovisionner</a>
                </div>
                <div style={{ background: '#fff1f0', borderRadius: 8, padding: '12px 16px', marginBottom: 12, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div>
                    <span style={{ color: '#ff4d4f', fontWeight: 700 }}>AirPods Pro 2</span>
                    <div style={{ color: '#888', fontSize: 13 }}>Quantité restante: 5</div>
                  </div>
                  <a href="#" style={{ color: '#1677ff', fontWeight: 600 }}>Réapprovisionner</a>
                </div>
              </div>
              <div style={{ textAlign: 'right', marginTop: 8 }}>
                <a href="#" style={{ color: '#1677ff', fontWeight: 600 }}>Voir tous les articles</a>
              </div>
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Dashboard;
