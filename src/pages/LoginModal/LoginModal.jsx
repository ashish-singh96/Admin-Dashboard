import React, { useState } from 'react';
import { Modal, Form, Input, message, Button, Typography } from 'antd';
import { loginUser } from '../../services/authService';
import { useNavigate } from 'react-router-dom';
import './LoginModal.css'; // 👈 Custom CSS file for animations

const { Title, Text } = Typography;

const LoginModal = ({ isOpen, onClose }) => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      setLoading(true);

      const response = await loginUser(values);
      const token = response.data.data.token;

      if (!token) {
        message.error('Token not found in API response');
        return;
      }

      localStorage.setItem('token', token);
      message.success('Login successful');
      form.resetFields();

      navigate('/dashboard');
      onClose();
    } catch (err) {
      if (err.response?.data?.message) {
        message.error(err.response.data.message);
      } else {
        console.error(err);
        message.error('Login failed');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      open={isOpen}
      closable={false}
      footer={null}
      centered
      className="animated-modal"
      bodyStyle={{
        padding: '24px',
        borderRadius: '14px',
        background: 'linear-gradient(135deg, #ffffff, #f0f5ff)',
        boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
      }}
    >
      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        <Title level={3} style={{ marginBottom: '8px', color: '#1890ff' }}>
          Welcome Back 👋
        </Title>
        <Text type="secondary">Login to your dashboard</Text>
      </div>

      <Form
        form={form}
        layout="vertical"
        size="large"
        className="login-form"
      >
        <Form.Item
          name="email"
          label={<span style={{ fontWeight: 500 }}>Email</span>}
          rules={[
            { required: true, message: 'Please enter your email' },
            { type: 'email', message: 'Invalid email format' },
          ]}
        >
          <Input placeholder="Enter your email" className="input-animate" />
        </Form.Item>

        <Form.Item
          name="password"
          label={<span style={{ fontWeight: 500 }}>Password</span>}
          rules={[{ required: true, message: 'Please enter your password' }]}
        >
          <Input.Password placeholder="Enter your password" className="input-animate" />
        </Form.Item>

        <Button
          type="primary"
          block
          loading={loading}
          onClick={handleOk}
          className="btn-animate"
        >
          Login
        </Button>
      </Form>
    </Modal>
  );
};

export default LoginModal;
