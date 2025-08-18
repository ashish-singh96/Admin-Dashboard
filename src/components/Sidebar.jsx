import React, { useState, useEffect } from 'react';
import { Outlet, useLocation, Link, useNavigate } from 'react-router-dom';
import { MenuFoldOutlined,  MenuUnfoldOutlined, PieChartOutlined, UserOutlined, AppstoreOutlined, LogoutOutlined,} from '@ant-design/icons';
import { Layout, Menu, Button, Avatar, Space, Dropdown } from 'antd';
import logo from '../assets/logo.png';
import { useAuthStore } from '../store/useAuthStore';
import LoginModal from '../pages/LoginModal/LoginModal';

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
        getItem(<Link to="/dashboard/coupon">Coupon</Link>, '6'),
    ]),
];

const Sidebar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [collapsed, setCollapsed] = useState(false);
    const { isAuthenticated, logout } = useAuthStore();
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(!isAuthenticated);

    const token = localStorage.getItem('token');

    // Load last selected key from localStorage, fallback = "1"
    const [selectedKey, setSelectedKey] = useState(
        localStorage.getItem('selectedKey') || '1'
    );

    // Update selectedKey when route changes, only if path matches
    useEffect(() => {
        if (location.pathname.startsWith('/dashboard/user')) {
            setSelectedKey('2');
            localStorage.setItem('selectedKey', '2');
        } else if (location.pathname.startsWith('/dashboard/vendor')) {
            setSelectedKey('3');
            localStorage.setItem('selectedKey', '3');
        } else if (location.pathname.startsWith('/dashboard/services')) {
            setSelectedKey('4');
            localStorage.setItem('selectedKey', '4');
        } else if (location.pathname.startsWith('/dashboard/time-slot')) {
            setSelectedKey('5');
            localStorage.setItem('selectedKey', '5');
        } else if (location.pathname === '/dashboard') {
            setSelectedKey('1');
            localStorage.setItem('selectedKey', '1');
        }
        // If route doesn’t match, do nothing → keeps last selected key
    }, [location.pathname]);

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
            label: <span style={{ fontWeight: 500, color: 'red' }}>Logout</span>,
            onClick: () => {
                logout();
                navigate('/');
                setIsLoginModalOpen(true);
                localStorage.removeItem('selectedKey'); // clear on logout
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
                    onClick={({ key }) => {
                        setSelectedKey(key);
                        localStorage.setItem('selectedKey', key); // persist selected key
                    }}
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
