import React, { useState } from "react";
import { Drawer, Form, Input, InputNumber, Upload, Button, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { addSubService } from "../../services/authService"; // your API

const AddSubServices = ({ visible, onClose, serviceId, onSuccess }) => {
  const [form] = Form.useForm();
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleAddSubService = async () => {
    try {
      const values = await form.validateFields();
      const formData = new FormData();
      formData.append("serviceId", serviceId);
      formData.append("subServiceName", values.subServiceName);
      formData.append("description", values.description || "");
      formData.append("duration", values.duration || 0);
      formData.append("price", values.price || 0);
      formData.append("offerPrice", values.offerPrice || 0);
      if (file) formData.append("serviceImage", file);

      setLoading(true);
      await addSubService(formData);
      message.success("Sub-service added successfully!");
      form.resetFields();
      setFile(null);
      onClose();
      onSuccess(); // refresh sub-service list
    } catch (err) {
      console.error(err);
      message.error("Failed to add sub-service.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Drawer
      title="Add Sub-Service"
      width={450}
      onClose={onClose}
      visible={visible}
      destroyOnClose
      bodyStyle={{ paddingBottom: 80 }}
      footer={
        <div style={{ textAlign: "right" }}>
          <Button onClick={onClose} style={{ marginRight: 8 }}>
            Cancel
          </Button>
          <Button onClick={handleAddSubService} type="primary" loading={loading}>
            Add
          </Button>
        </div>
      }
    >
      <Form form={form} layout="vertical">
        <Form.Item
          name="subServiceName"
          label="Sub-Service Name"
          rules={[{ required: true, message: "Please enter sub-service name" }]}
        >
          <Input placeholder="Enter sub-service name" />
        </Form.Item>

        <Form.Item
          name="description"
          label="Description"
        >
          <Input.TextArea placeholder="Enter description" rows={3} />
        </Form.Item>

        <Form.Item
          name="duration"
          label="Duration (minutes)"
          rules={[{ required: true, message: "Please enter duration" }]}
        >
          <InputNumber min={0} style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item
          name="price"
          label="Price"
          rules={[{ required: true, message: "Please enter price" }]}
        >
          <InputNumber min={0} style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item
          name="offerPrice"
          label="Offer Price"
        >
          <InputNumber min={0} style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item label="Service Image">
          <Upload
            beforeUpload={(file) => {
              setFile(file);
              return false; // prevent auto upload
            }}
            accept="image/*"
            maxCount={1}
          >
            <Button icon={<UploadOutlined />}>Upload Image</Button>
          </Upload>
        </Form.Item>
      </Form>
    </Drawer>
  );
};

export default AddSubServices;
