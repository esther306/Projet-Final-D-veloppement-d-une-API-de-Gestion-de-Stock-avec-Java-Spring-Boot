import type React from 'react';
import { useState } from 'react';
import {
  DashboardOutlined,
  ShoppingOutlined,
  UserOutlined,
  TeamOutlined,
  AppstoreOutlined,
  SettingOutlined,
  ShoppingCartOutlined,
  TruckOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from '@ant-design/icons';
import { Layout, Menu, Button, theme } from 'antd';
import type { MenuProps } from 'antd';
import Dashboard from '../components/modals/pages/Dashboard';
import Articles from '../components/modals/pages/Articles';
import Clients from '../components/modals/pages/Clients';
import ClientOrders from '../components/modals/pages/ClientOrder';
import Suppliers from '../components/modals/pages/Supplier';
import SupplierOrders from '../components/modals/pages/SupplierOrder';
import Categories from '../components/modals/pages/Categories';
import Settings from '../components/modals/pages/Settings';

// Import des composants de pages

const { Header, Sider, Content } = Layout;

type MenuItem = Required<MenuProps>['items'][number];

const items: MenuItem[] = [
  {
    key: 'dashboard',
    icon: <DashboardOutlined />,
    label: 'Tableau de bord',
  },
  {
    key: 'articles',
    icon: <ShoppingOutlined />,
    label: 'Articles',
  },
  {
    key: 'clients',
    icon: <UserOutlined />,
    label: 'Client',
    children: [
      {
        key: 'clients-list',
        icon: <TeamOutlined />,
        label: 'Clients',
      },
      {
        key: 'client-orders',
        icon: <ShoppingCartOutlined />,
        label: 'Commandes clients',
      },
    ],
  },
  {
    key: 'suppliers',
    icon: <TruckOutlined />,
    label: 'Fournisseurs',
    children: [
      {
        key: 'suppliers-list',
        icon: <TruckOutlined />,
        label: 'Fournisseurs',
      },
      {
        key: 'supplier-orders',
        icon: <ShoppingCartOutlined />,
        label: 'Commandes fournisseurs',
      },
    ],
  },
  {
    key: 'categories',
    icon: <AppstoreOutlined />,
    label: 'Catégories',
  },
  {
    key: 'settings',
    icon: <SettingOutlined />,
    label: 'Paramètres',
  },
];

export const DashboardLayout: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [selectedKey, setSelectedKey] = useState('dashboard');
  const {
    token: { borderRadiusLG },
  } = theme.useToken();

  const handleMenuClick: MenuProps['onClick'] = (e) => {
    setSelectedKey(e.key);
  };

  const getPageTitle = () => {
    const menuItem = items.find(item => {
      if (item?.key === selectedKey) return true;
      if (item && 'children' in item && item.children) {
        return item.children.some(child => child?.key === selectedKey);
      }
      return false;
    });

    if (menuItem && 'children' in menuItem && menuItem.children) {
      const subItem = menuItem.children.find(child => child?.key === selectedKey);
      if (subItem && 'label' in subItem && typeof subItem.label === 'string') {
        return subItem.label;
      }
    }

    if (menuItem && 'label' in menuItem && typeof menuItem.label === 'string') {
      return menuItem.label;
    }

    return 'Tableau de bord';
  };

  const renderPageContent = () => {
    switch (selectedKey) {
      case 'dashboard':
        return <Dashboard />;
      case 'articles':
        return <Articles />;
      case 'clients-list':
        return <Clients />;
      case 'client-orders':
        return <ClientOrders />;
      case 'suppliers-list':
        return <Suppliers />;
      case 'supplier-orders':
        return <SupplierOrders />;
      case 'categories':
        return <Categories />;
      case 'settings':
        return <Settings />;
      default:
        return <Dashboard />;
    }
  };

  const [profileMenuVisible, setProfileMenuVisible] = useState(false);
  const [editProfileVisible, setEditProfileVisible] = useState(false);

  const handleProfileMenuClick = (key: string) => {
    setProfileMenuVisible(false);
    if (key === 'profile') setEditProfileVisible(true);
    if (key === 'settings') setSelectedKey('settings');
    if (key === 'logout') {
      // Ajoute ici la logique de déconnexion
      // Exemple simple : redirection vers la page de connexion
      window.location.href = '/login';
      // Ou, si tu utilises un système d'authentification, tu peux aussi vider le token, etc.
    }
  };

  return (
    <Layout style={{ minHeight: '100vh', position: 'relative', overflow: 'hidden', background: 'linear-gradient(135deg, #f8fafc 0%, #e6f0ff 100%)' }}>
      <Sider trigger={null} collapsible collapsed={collapsed} style={{ background: '#fff', borderRight: '1px solid #f0f0f0' }}>
        <div style={{
          height: 64,
          margin: 16,
          background: '#1677ff',
          borderRadius: 6,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontWeight: 'bold',
          fontSize: collapsed ? 14 : 18,
          letterSpacing: 1,
          boxShadow: '0 2px 8px rgba(22,119,255,0.08)'
        }}>
          {collapsed ? 'GS' : 'Gestion Stock'}
        </div>
        <Menu
          theme="light"
          mode="inline"
          selectedKeys={[selectedKey]}
          items={items}
          onClick={handleMenuClick}
          style={{ fontWeight: 600, fontSize: 16, border: 'none' }}
        />
      </Sider>
      <Layout style={{ position: 'relative' }}>
        <Header style={{
          padding: 0,
          background: '#fff',
          display: 'flex',
          alignItems: 'center',
          boxShadow: '0 1px 4px rgba(0,21,41,.08)',
          borderBottom: '1px solid #f0f0f0',
          minHeight: 64,
          justifyContent: 'space-between'
        }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              style={{
                fontSize: '20px',
                width: 64,
                height: 64,
                color: '#1677ff'
              }}
            />
            <h1 style={{
              margin: 0,
              fontSize: '22px',
              fontWeight: '700',
              color: '#1677ff',
              letterSpacing: 1
            }}>
              {getPageTitle()}
            </h1>
          </div>
          {/* Profil Admin User */}
          <div style={{ position: 'relative', marginRight: 32 }}>
            <div
              style={{ display: 'flex', alignItems: 'center', cursor: 'pointer', gap: 12 }}
              onClick={() => setProfileMenuVisible(v => !v)}
            >
              <span style={{ width: 40, height: 40, borderRadius: '50%', background: 'linear-gradient(135deg, #1677ff 0%, #722ed1 100%)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 18 }}>AD</span>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>                 
                <span style={{ fontWeight: 600, color: '#23272f', fontSize: 16, lineHeight: 1.2 }}>Admin User</span>                 
                <span style={{ color: '#888', fontSize: 13, lineHeight: 1.2 }}>Gestionnaire</span>               
              </div>
            </div>
            {/* Menu déroulant */}
            {profileMenuVisible && (
              <div style={{ position: 'absolute', top: 48, right: 0, background: '#fff', boxShadow: '0 2px 8px #e6e6e6', borderRadius: 8, minWidth: 180, zIndex: 1000 }}>
                <div style={{ padding: '12px 0' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '1px 20px', cursor: 'pointer', fontSize: 15, color: '#23272f', transition: 'background 0.2s' }}
                    onClick={() => handleProfileMenuClick('profile')}
                    onMouseOver={e => e.currentTarget.style.background='#f0f6ff'}
                    onMouseOut={e => e.currentTarget.style.background='transparent'}
                  >
                    <span style={{ fontSize: 18 }}>👤</span> Mon Profil
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '1px 20px', cursor: 'pointer', fontSize: 15, color: '#23272f', transition: 'background 0.2s' }}
                    onClick={() => handleProfileMenuClick('settings')}
                    onMouseOver={e => e.currentTarget.style.background='#f0f6ff'}
                    onMouseOut={e => e.currentTarget.style.background='transparent'}
                  >
                    <span style={{ fontSize: 18 }}>🛠️</span> Paramètres
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '1px 20px', cursor: 'pointer', fontSize: 15, color: '#ff4d4f', transition: 'background 0.2s' }}
                    onClick={() => handleProfileMenuClick('logout')}
                    onMouseOver={e => e.currentTarget.style.background='#f0f6ff'}
                    onMouseOut={e => e.currentTarget.style.background='transparent'}
                  >
                    <span style={{ fontSize: 18 }}>🚪</span> Déconnexion
                  </div>
                </div>
              </div>
            )}
            {/* Modal modification profil */}
            {editProfileVisible && (
              <div style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100vw',
                height: '100vh',
                background: 'rgba(22,119,255,0.10)',
                zIndex: 2000,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <div style={{
                  background: 'linear-gradient(135deg, #fff 80%, #e6f0ff 100%)',
                  borderRadius: 24,
                  boxShadow: '0 8px 32px #1677ff33',
                  padding: 40,
                  minWidth: 420,
                  maxWidth: 520,
                  position: 'relative',
                  overflow: 'hidden'
                }}>
                  {/* Bandeau coloré */}
                  <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: 14,
                    background: 'linear-gradient(90deg, #1677ff 0%, #722ed1 100%)',
                    borderTopLeftRadius: 24,
                    borderTopRightRadius: 24
                  }} />
                  {/* Avatar stylisé */}
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 20,
                    marginBottom: 28,
                    marginTop: 10
                  }}>
                    <span style={{
                      width: 70,
                      height: 70,
                      borderRadius: '50%',
                      background: 'linear-gradient(135deg, #1677ff 0%, #722ed1 100%)',
                      color: '#fff',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 700,
                      fontSize: 30,
                      boxShadow: '0 2px 8px #1677ff22',
                      border: '4px solid #fff'
                    }}>AU</span>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: 22, color: '#1677ff', marginBottom: 2 }}>Admin User</div>
                      <div style={{ color: '#888', fontSize: 15, marginTop: 0 }}>Gestionnaire Principal</div>
                    </div>
                  </div>
                  <form>
                    <div style={{ display: 'flex', gap: 16, marginBottom: 18 }}>
                      <input type="text" defaultValue="Admin" placeholder="Prénom" style={{
                        flex: 1,
                        padding: '10px 14px',
                        borderRadius: 10,
                        border: '1.5px solid #e6e6e6',
                        fontSize: 16,
                        background: '#f8fafc'
                      }} />
                      <input type="text" defaultValue="User" placeholder="Nom" style={{
                        flex: 1,
                        padding: '10px 14px',
                        borderRadius: 10,
                        border: '1.5px solid #e6e6e6',
                        fontSize: 16,
                        background: '#f8fafc'
                      }} />
                    </div>
                    <div style={{ display: 'flex', gap: 16, marginBottom: 18 }}>
                      <input type="email" defaultValue="admin@gestionstock.com" placeholder="Email" style={{
                        flex: 1,
                        padding: '10px 14px',
                        borderRadius: 10,
                        border: '1.5px solid #e6e6e6',
                        fontSize: 16,
                        background: '#f8fafc'
                      }} />
                      <input type="text" defaultValue="+33 1 23 45 67 89" placeholder="Téléphone" style={{
                        flex: 1,
                        padding: '10px 14px',
                        borderRadius: 10,
                        border: '1.5px solid #e6e6e6',
                        fontSize: 16,
                        background: '#f8fafc'
                      }} />
                    </div>
                    <div style={{ display: 'flex', gap: 16, marginBottom: 18 }}>
                      <input type="text" defaultValue="Gestionnaire Principal" placeholder="Rôle" style={{
                        flex: 1,
                        padding: '10px 14px',
                        borderRadius: 10,
                        border: '1.5px solid #e6e6e6',
                        fontSize: 16,
                        background: '#f8fafc'
                      }} />
                      <input type="text" defaultValue="Administration" placeholder="Département" style={{
                        flex: 1,
                        padding: '10px 14px',
                        borderRadius: 10,
                        border: '1.5px solid #e6e6e6',
                        fontSize: 16,
                        background: '#f8fafc'
                      }} />
                    </div>
                    <div style={{ marginBottom: 18 }}>
                      <textarea defaultValue="123 Rue de la Gestion, 75001 Paris" placeholder="Adresse" style={{
                        width: '100%',
                        padding: '10px 14px',
                        borderRadius: 10,
                        border: '1.5px solid #e6e6e6',
                        fontSize: 16,
                        minHeight: 54,
                        background: '#f8fafc'
                      }} />
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 14 }}>
                      <button type="button" onClick={() => setEditProfileVisible(false)} style={{
                        background: '#e6f0ff',
                        color: '#1677ff',
                        border: 'none',
                        borderRadius: 10,
                        padding: '10px 28px',
                        fontWeight: 600,
                        fontSize: 16,
                        cursor: 'pointer',
                        boxShadow: '0 2px 8px #1677ff11'
                      }}>Annuler</button>
                      <button type="submit" style={{
                        background: 'linear-gradient(90deg, #1677ff 0%, #722ed1 100%)',
                        color: '#fff',
                        border: 'none',
                        borderRadius: 10,
                        padding: '10px 28px',
                        fontWeight: 700,
                        fontSize: 16,
                        cursor: 'pointer',
                        boxShadow: '0 2px 8px #1677ff22'
                      }}>Enregistrer</button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        </Header>
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            background: '#f8fafc',
            borderRadius: borderRadiusLG,
            minHeight: 'calc(100vh - 64px - 56px)',
            overflow: 'auto'
          }}
        >
          {renderPageContent()}
        </Content>
        <footer style={{ background: '#fff', borderTop: '1px solid #e6e6e6', padding: '32px 0 0 0', width: '100%', marginTop: 32 }}>
          <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'flex-start', columnGap: 64, rowGap: 0 }}>
            {/* Brand */}
            <div style={{ flex: 1.2, minWidth: 260 }}>
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: 8 }}>
                <span style={{ background: '#1677ff', color: '#fff', borderRadius: 8, padding: 8, fontSize: 28, marginRight: 12, display: 'inline-flex', alignItems: 'center' }}>
                  <svg width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="24" height="24" rx="6" fill="#1677ff"/><text x="12" y="17" textAnchor="middle" fontSize="16" fill="#fff" fontFamily="Arial" fontWeight="bold">GS</text></svg>
                </span>
                <span style={{ fontWeight: 700, fontSize: 22, color: '#23272f', fontFamily: 'cursive', letterSpacing: 1 }}>Gestion Des Stocks</span>
              </div>
              <div style={{ color: '#23272f', fontSize: 15, marginBottom: 12 }}>
                Solution complète pour la gestion intelligente de vos inventaires et l'optimisation de vos stocks en temps réel.
              </div>
            </div>
            {/* Navigation */}
            <div style={{ flex: 1, minWidth: 180 }}>
              <div style={{ fontWeight: 700, marginBottom: 10, color: '#23272f' }}>Navigation</div>
              <div style={{ color: '#23272f', fontSize: 15, marginBottom: 8, cursor: 'pointer', borderRadius: 6, transition: 'background 0.2s' }}
                onClick={() => setSelectedKey('dashboard')}
                onMouseOver={e => e.currentTarget.style.background='#e6f0ff'}
                onMouseOut={e => e.currentTarget.style.background='transparent'}
              >Tableau de Bord</div>
              <div style={{ color: '#23272f', fontSize: 15, marginBottom: 8, cursor: 'pointer', borderRadius: 6, transition: 'background 0.2s' }}
                onClick={() => setSelectedKey('articles')}
                onMouseOver={e => e.currentTarget.style.background='#e6f0ff'}
                onMouseOut={e => e.currentTarget.style.background='transparent'}
              >Articles</div>
              <div style={{ color: '#23272f', fontSize: 15, marginBottom: 8, cursor: 'pointer', borderRadius: 6, transition: 'background 0.2s' }}
                onClick={() => setSelectedKey('clients-list')}
                onMouseOver={e => e.currentTarget.style.background='#e6f0ff'}
                onMouseOut={e => e.currentTarget.style.background='transparent'}
              >Clients</div>
              <div style={{ color: '#23272f', fontSize: 15, marginBottom: 8, cursor: 'pointer', borderRadius: 6, transition: 'background 0.2s' }}
                onClick={() => setSelectedKey('suppliers-list')}
                onMouseOver={e => e.currentTarget.style.background='#e6f0ff'}
                onMouseOut={e => e.currentTarget.style.background='transparent'}
              >Fournisseurs</div>
            </div>
            {/* Fonctionnalités */}
            <div style={{ flex: 1, minWidth: 180 }}>
              <div style={{ fontWeight: 700, marginBottom: 10, color: '#23272f' }}>Fonctionnalités</div>
              <div style={{ color: '#23272f', fontSize: 15, marginBottom: 8 }}>Suivi en temps réel</div>
              <div style={{ color: '#23272f', fontSize: 15, marginBottom: 8 }}>Alertes automatiques</div>
              <div style={{ color: '#23272f', fontSize: 15, marginBottom: 8 }}>Rapports détaillés</div>
              <div style={{ color: '#23272f', fontSize: 15, marginBottom: 8 }}>Gestion multi-sites</div>
            </div>
            {/* Support */}
            <div style={{ flex: 1, minWidth: 180 }}>
              <div style={{ fontWeight: 700, marginBottom: 10, color: '#23272f' }}>Support</div>
              <div style={{ color: '#23272f', fontSize: 15, marginBottom: 8, display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ color: '#1677ff', fontSize: 16 }}>✉️</span> support@gestionstock.com
              </div>
              <div style={{ color: '#23272f', fontSize: 15, marginBottom: 8, display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ color: '#1677ff', fontSize: 16 }}>📞</span> +237 658 458 373
              </div>
              <div style={{ color: '#23272f', fontSize: 15, marginBottom: 8, display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ color: '#1677ff', fontSize: 16 }}>⏰</span> Lun-Ven 9h-18h
              </div>
            </div>
          </div>
          <div style={{ borderTop: '1px solid #e6e6e6', marginTop: 32, padding: '16px 0 0 0', display: 'flex', flexDirection: 'column', alignItems: 'center', color: '#888', fontSize: 14 }}>
            <span style={{ marginBottom: 8 }}>© 2025 Gestion Des Stocks. Tous droits réservés.</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <a href="#" style={{ color: '#888', textDecoration: 'none', marginRight: 8 }}>Conditions d'utilisation</a>
              <a href="#" style={{ color: '#888', textDecoration: 'none', marginRight: 8 }}>Politique de confidentialité</a>
              <a href="#" style={{ color: '#888', textDecoration: 'none', marginRight: 4 }} title="LinkedIn">🔗</a>
              <a href="#" style={{ color: '#888', textDecoration: 'none', marginRight: 4 }} title="Twitter">🐦</a>
              <a href="#" style={{ color: '#888', textDecoration: 'none' }} title="Facebook">🌐</a>
            </div>
          </div>
        </footer>
      </Layout>
    </Layout>
  );
};

