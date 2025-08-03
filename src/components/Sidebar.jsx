import React, { useState } from 'react';
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    PieChartOutlined,
    UserOutlined,
    AppstoreOutlined,
    ContainerOutlined,
    ShoppingCartOutlined,
    LogoutOutlined,
} from '@ant-design/icons';
import { Layout, Menu, Button, Avatar, Space, Dropdown } from 'antd';
import logo from '../assets/logo.png';
import LoginModal from '../pages/LoginModal';
import { useAuthStore } from '../store/useAuthStore';

const { Header, Sider, Content } = Layout;

function getItem(label, key, icon, children) {
    return { key, icon, children, label };
}

const items = [
    getItem('Dashboard', '1', <PieChartOutlined />),
    getItem('User', '2', <UserOutlined />),
    getItem('Vendor', '3', <UserOutlined />),
    getItem('Master', 'sub1', <AppstoreOutlined />, [
        getItem('Tom', '4'),
        getItem('Bill', '5'),
        getItem('Alex', '6'),
    ]),
    getItem('Inventory', 'sub2', <ContainerOutlined />, [
        getItem('Product List', '7'),
        getItem('Warehouse Inventory', '8'),
    ]),
    getItem('Orders', 'sub3', <ShoppingCartOutlined />, [
        getItem('Order List', '9'),
        getItem('Quotation List', '10'),
        getItem('Invoice List', '11'),
    ]),
];

const Sidebar = () => {
    const [collapsed, setCollapsed] = useState(false);
    const { isAuthenticated, logout } = useAuthStore();
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(!isAuthenticated);

    const token = localStorage.getItem('token');

   
    if (!token) {
        return (
            <Layout style={{ minHeight: '100vh' }}>
                <Content style={{ margin: '16px', padding: 24, background: '#fff' }}>
                    <LoginModal isOpen={isLoginModalOpen} onClose={() => setIsLoginModalOpen(false)} />
                </Content>
            </Layout>
        );
    }
    const dropdowns = [
        {
            key: 'profile',
            label: 'Profile',
            icon: <UserOutlined/>,
        },
        {
            key: 'logout',
            icon: <LogoutOutlined />,
            label: (
                <span style={{ fontWeight: 500, color: 'red' }}>Logout</span>
            ),
            onClick: () => {
                logout();           // Token remove & isAuthenticated false
                setIsLoginModalOpen(true); // Modal open
            },
        },
    ];



    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sider
                collapsed={collapsed}
                onCollapse={setCollapsed}
                width={240}
                style={{
                    background: '#001529ff',
                    position: 'fixed',
                    height: '100vh',
                    left: 0,
                    top: 0,
                    bottom: 0,
                }}
            >
                <div style={{
                    height: 64,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: collapsed ? 'center' : 'start',
                    padding: '0 16px',
                    borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                }}>
                    <img
                        src={logo}
                        alt="Logo"
                        style={{
                            height: 40,
                            transition: 'all 0.3s',
                            maxWidth: collapsed ? 40 : 120,
                            objectFit: 'contain',
                        }}
                    />
                </div>

                <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']} items={items} />
            </Sider>

            <Layout style={{ marginLeft: collapsed ? 80 : 240, transition: 'all 0.2s' }}>
                <Header style={{
                    background: '#fff',
                    padding: '0 16px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    boxShadow: '0 1px 4px rgba(0,21,41,.08)',
                }}>
                    <Button
                        type="text"
                        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                        onClick={() => setCollapsed(!collapsed)}
                        style={{ fontSize: '18px' }}
                    />

                    <Dropdown menu={{ items: dropdowns }} trigger={['click']}>
                        <a onClick={(e) => e.preventDefault()}>
                            <Space>
                                <Avatar style={{ backgroundColor: '#001529' }} size="large" icon={<UserOutlined />} />
                            </Space>
                        </a>
                    </Dropdown>

                    <LoginModal isOpen={isLoginModalOpen} onClose={() => setIsLoginModalOpen(false)} />
                </Header>

                <Content style={{ margin: '16px', padding: 24, background: '#fff' }}>
                    <h2>Welcome to ServiceApp Admin Panel</h2>
                    <p>Your content goes here...</p>
                </Content>
            </Layout>
        </Layout>
    );
};

export default Sidebar;
