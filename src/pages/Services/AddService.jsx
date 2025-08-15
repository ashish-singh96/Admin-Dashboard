import React, { useState } from "react";
import { Drawer, Form, Input, Upload, Button, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { addService } from "../../services/authService"; // your API

const AddService = ({ visible, onClose, onSuccess }) => {
  const [form] = Form.useForm();
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleAddService = async () => {
    try {
      const values = await form.validateFields();
      const formData = new FormData();
      formData.append("serviceName", values.serviceName);
      if (file) formData.append("serviceIcon", file);

      setLoading(true);
      await addService(formData);
      message.success("Service added successfully!");
      form.resetFields();
      setFile(null);
      onClose();
      onSuccess(); // refresh list
    } catch (err) {
      console.error(err);
      message.error("Failed to add service.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Drawer
      title="Add Service"
      width={400}
      onClose={onClose}
      visible={visible}
      destroyOnClose
      bodyStyle={{ paddingBottom: 80 }}
      footer={
        <div style={{ textAlign: "right" }}>
          <Button onClick={onClose} style={{ marginRight: 8 }}>
            Cancel
          </Button>
          <Button onClick={handleAddService} type="primary" loading={loading}>
            Add
          </Button>
        </div>
      }
    >
      <Form form={form} layout="vertical">
        <Form.Item
          name="serviceName"
          label="Service Name"
          rules={[{ required: true, message: "Please enter service name" }]}
        >
          <Input placeholder="Enter service name" />
        </Form.Item>

        <Form.Item label="Service Icon">
          <Upload
            beforeUpload={(file) => {
              setFile(file);
              return false; // prevent auto upload
            }}
            accept="image/*"
            maxCount={1}
          >
            <Button icon={<UploadOutlined />}>Upload Icon</Button>
          </Upload>
        </Form.Item>
      </Form>
    </Drawer>
  );
};

export default AddService;
