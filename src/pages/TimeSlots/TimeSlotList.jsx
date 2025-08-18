import { useState, useEffect } from "react";
import { Table, Space, Input, Drawer, Button, Tag, message } from "antd";
import { EditOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { getTimeSlot, addTimeSlot } from "../../services/authService.js";
import AddTimeSlot from "./AddTimeSlot.jsx";

const TimeSlotList = () => {
  const [data, setData] = useState([]);
  const [pagination, setPagination] = useState({ current: 1, pageSize: 10, total: 0, });
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [drawerVisible, setDrawerVisible] = useState(false);

  // Fetch data
  const fetchData = async (params = {}) => {
    setLoading(true);
    try {
      const res = await getTimeSlot({
        currentPage: params.pagination?.current || 1,
        itemsPerPage: params.pagination?.pageSize || 10,
        searchData: params.search || "",
      });

      const fetchedData = res.data?.data || [];
      const totalRecords = res.data?.count || fetchedData.length;

      setData(fetchedData);
      setPagination({
        current: params.pagination?.current || 1,
        pageSize: params.pagination?.pageSize || 10,
        total: totalRecords,
      });
    } catch (err) {
      console.error("Error fetching time slots", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData({ pagination, search });
  }, []);


  // Handle search
  const handleSearch = (e) => {
    const value = e.target.value;
    setSearch(value);
    fetchData({ pagination: { ...pagination, current: 1 }, search: value });
  };


  const columns = [
    {
      title: "Start Time",
      dataIndex: "timeSlotFrom",
      key: "timeSlotFrom",
    },
    {
      title: "End Time",
      dataIndex: "timeSlotTo",
      key: "timeSlotTo",
    },
    {
      title: "Added Date",
      dataIndex: "addedDate",
      key: "addedDate",
      render: (date) => <span>{date || "-"}</span>,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <Tag color={status === "ACTIVE" ? "green" : "red"}>{status}</Tag>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space>
          <Button type="primary" size="small" icon={<EditOutlined />}>
            Edit
          </Button>
          <Button danger size="small" icon={<DeleteOutlined />}>
            Remove
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div style={{ padding: "20px" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px",
        }}
      >
        <Input
          placeholder="Search time slots"
          value={search}
          onChange={handleSearch}
          style={{ width: "300px" }}
        />

        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => setDrawerVisible(true)}
        >
          Add Time Slot
        </Button>
      </div>

      {/* Table */}
      <Table
        columns={columns}
        dataSource={data}
        rowKey={(record) => record._id}
        bordered
        pagination={pagination}
        loading={loading}
        onChange={(newPagination) =>
          fetchData({ pagination: newPagination, search })
        }
      />

      {/* Drawer with AddTimeSlot form */}
      <Drawer
        title="Add Time Slot"
        width={400}
        onClose={() => setDrawerVisible(false)}
        open={drawerVisible}
        destroyOnClose
      >
        <AddTimeSlot
          onSubmit={() => {
            fetchData({ pagination, search });
            setDrawerVisible(false);
          }}
          onCancel={() => setDrawerVisible(false)}
        />
      </Drawer>

    </div>
  );
};

export default TimeSlotList;
