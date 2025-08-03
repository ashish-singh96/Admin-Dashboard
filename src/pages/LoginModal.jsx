import React, { useState } from 'react'
import { Modal, Form, Input, message , Button} from 'antd'
import { loginUser } from '../services/authService' // ✅ Import your API
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '../store/useAuthStore';
const LoginModal = ({ isOpen, onClose }) => {
  const [form] = Form.useForm()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)

  const handleOk = async () => {
    try {
      const values = await form.validateFields()
      setLoading(true)
      const { data } = await loginUser(values)  // ✅ API call
      localStorage.setItem('token', data.token) // ✅ Store token
      message.success('Login successful')
      form.resetFields()
      onClose()
      navigate('/') // ✅ Redirect after login
    } catch (err) {
      if (err.response?.data?.message) {
        message.error(err.response.data.message)
      } else {
        console.error(err)
        message.error('Login failed')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <Modal
      title="Login"
      open={isOpen}
      closable={false}    // Close icon bhi hata dega
      footer={[
        <Button
          key="submit"
          type="primary"
          loading={loading}
          onClick={handleOk}
        >
          Login
        </Button>
      ]}
    >

      <Form form={form} layout="vertical">
        <Form.Item
          name="email"
          label="Email"
          rules={[
            { required: true, message: 'Please enter your email' },
            { type: 'email', message: 'Invalid email format' }
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="password"
          label="Password"
          rules={[{ required: true, message: 'Please enter your password' }]}
        >
          <Input.Password />
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default LoginModal
