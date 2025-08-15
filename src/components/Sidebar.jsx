import React, { useState } from 'react';
import { Outlet, useLocation, Link } from 'react-router-dom';
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
import { useAuthStore } from '../store/useAuthStore';
import LoginModal from '../pages/LoginModal/LoginModal'; // Ensure this is correctly imported

const { Header, Sider, Content } = Layout;

function getItem(label, key, icon, children) {
    return { key, icon, children, label };
}

const items = [
    getItem(<Link to="/dashboard">Dashboard</Link>, '1', <PieChartOutlined />),
    getItem(<Link to="/dashboard/user">User</Link>, '2', <UserOutlined />),
    getItem(<Link to="/dashboard/vendor">Vendor</Link>, '3', <UserOutlined />),
    getItem('Master', 'sub1', <AppstoreOutlined />, [
        getItem(<Link to="/dashboard/services">Services</Link>, '4'),
        getItem(<Link to="/dashboard/time-slot">Time-Slot</Link>, '5'),
    ]),
];

const pathKeyMap = {
    '/dashboard': '1',
    '/dashboard/user': '2',
    '/dashboard/vendor': '3',
    '/dashboard/services': '4',
    '/dashboard/time-slot': '5',
    // Add more mappings as needed
};

const Sidebar = () => {
    const location = useLocation();
    const [collapsed, setCollapsed] = useState(false);
    const { isAuthenticated, logout } = useAuthStore();
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(!isAuthenticated);

    const token = localStorage.getItem('token');

    // Determine selected key from the current path
    const selectedKey = pathKeyMap[location.pathname] || '1';

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
            icon: <UserOutlined />,
        },
        {
            key: 'logout',
            icon: <LogoutOutlined />,
            label: (
                <span style={{ fontWeight: 500, color: 'red' }}>Logout</span>
            ),
            onClick: () => {
                logout();
                setIsLoginModalOpen(true);
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
                <div
                    style={{
                        height: 64,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: collapsed ? 'center' : 'start',
                        padding: '0 16px',
                        borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                    }}
                >
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

                <Menu
                    theme="dark"
                    mode="inline"
                    selectedKeys={[selectedKey]}
                    items={items}
                />
            </Sider>

            <Layout style={{ marginLeft: collapsed ? 80 : 240, transition: 'all 0.2s' }}>
                <Header
                    style={{
                        background: '#fff',
                        padding: '0 16px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        boxShadow: '0 1px 4px rgba(0,21,41,.08)',
                    }}
                >
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
                </Header>

                <Outlet />
            </Layout>
        </Layout>
    );
};

export default Sidebar;
