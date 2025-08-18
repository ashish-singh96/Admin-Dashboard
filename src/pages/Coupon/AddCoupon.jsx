import React, { useState } from "react";
import {
  Form,
  Input,
  InputNumber,
  DatePicker,
  Button,
  Select,
  Card,
  message,
} from "antd";
import { addCoupon } from "../../services/authService.js";

const { RangePicker } = DatePicker;
const { Option } = Select;

const AddCoupon = ({ onClose, onSuccess }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  // Submit handler
  const handleAddCoupon = async () => {
    try {
      const values = await form.validateFields();

      // convert validity range to validFrom / validTo
      if (values.validity) {
        values.validFrom = values.validity[0].toISOString();
        values.validTo = values.validity[1].toISOString();
        delete values.validity;
      }

      setLoading(true);
      await addCoupon(values);
      message.success("Coupon added successfully!");
      form.resetFields();
      onClose();
      onSuccess?.();
    } catch (err) {
      console.error(err);
      message.error("Failed to add coupon.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <Form form={form} layout="vertical">
        {/* Coupon Code */}
        <Form.Item
          label="Coupon Code"
          name="couponCode"
          rules={[{ required: true, message: "Please enter coupon code!" }]}
        >
          <Input placeholder="Enter coupon code (e.g. HOLI25)" />
        </Form.Item>

        {/* Title */}
        <Form.Item
          label="Title"
          name="title"
          rules={[{ required: true, message: "Please enter title!" }]}
        >
          <Input placeholder="Enter coupon title" />
        </Form.Item>

        {/* Description */}
        <Form.Item label="Description" name="description">
          <Input.TextArea rows={3} placeholder="Enter description (optional)" />
        </Form.Item>

        {/* Discount Type */}
        <Form.Item
          label="Discount Type"
          name="discountType"
          rules={[{ required: true, message: "Select discount type!" }]}
        >
          <Select placeholder="Select type">
            <Option value="percentage">Percentage</Option>
            <Option value="flat">Flat</Option>
          </Select>
        </Form.Item>

        {/* Discount Value */}
        <Form.Item
          label="Discount Value"
          name="discountValue"
          rules={[{ required: true, message: "Please enter discount value!" }]}
        >
          <InputNumber min={1} style={{ width: "100%" }} />
        </Form.Item>

        {/* Min Order Amount */}
        <Form.Item label="Min Order Amount" name="minOrderAmount">
          <InputNumber min={0} style={{ width: "100%" }} placeholder="Optional" />
        </Form.Item>

        {/* Max Discount Amount */}
        <Form.Item label="Max Discount Amount" name="maxDiscountAmount">
          <InputNumber min={0} style={{ width: "100%" }} placeholder="Optional" />
        </Form.Item>

        {/* Validity */}
        <Form.Item
          label="Validity Period"
          name="validity"
          rules={[{ required: true, message: "Please select validity range!" }]}
        >
          <RangePicker style={{ width: "100%" }} showTime />
        </Form.Item>

        {/* Usage Limit */}
        <Form.Item label="Usage Limit" name="usageLimit">
          <InputNumber min={1} style={{ width: "100%" }} placeholder="Optional" />
        </Form.Item>

        {/* Submit */}
        <Form.Item>
          <Button onClick={onClose} style={{ marginRight: 8 }}>
            Cancel
          </Button>
          <Button
            type="primary"
            loading={loading}
            onClick={handleAddCoupon}
          >
            Add
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default AddCoupon;
