import React, { useState } from "react";
import { Form, Button, TimePicker, message } from "antd";
import dayjs from "dayjs";
import { addTimeSlot } from "../../services/authService";

const AddTimeSlot = ({ onSubmit, onCancel }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const handleFinish = async (values) => {
    const today = dayjs().format("YYYY-MM-DD");

    const payload = {
      timeSlotFrom: values.timeSlotFrom ? dayjs(`${today} ${values.timeSlotFrom.format("HH:mm")}`).toISOString() : null,
      timeSlotTo: values.timeSlotTo ? dayjs(`${today} ${values.timeSlotTo.format("HH:mm")}`).toISOString() : null,
    };

    if (!payload.timeSlotFrom || !payload.timeSlotTo) {
      message.error("Please select both start and end time");
      return;
    }

    try {
      setLoading(true);
      const res = await addTimeSlot(payload);
      message.success("Time slot added successfully!");
      onSubmit?.(res?.data || payload);
      form.resetFields();
    } catch (err) {
      message.error(err?.response?.data?.message || "Failed to add time slot. Try again!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form form={form} layout="vertical" onFinish={handleFinish}>
      <Form.Item
        label="Start Time"
        name="timeSlotFrom"
        rules={[{ required: true, message: "Please select start time" }]}
      >
        <TimePicker use12Hours format="hh:mm A" style={{ width: "100%" }} />
      </Form.Item>

      <Form.Item
        label="End Time"
        name="timeSlotTo"
        rules={[{ required: true, message: "Please select end time" }]}
      >
        <TimePicker use12Hours format="hh:mm A" style={{ width: "100%" }} />
      </Form.Item>

      <Form.Item style={{ textAlign: "right" }}>
        <Button onClick={onCancel} style={{ marginRight: 8 }}>
          Cancel
        </Button>
        <Button type="primary" htmlType="submit" loading={loading}>
          Save
        </Button>
      </Form.Item>
    </Form>
  );
};

export default AddTimeSlot;
