import React, { useState, useEffect } from "react";
import { Table, Space, Image, Input, Drawer, Button } from "antd";
import { EditOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { serviceList } from "../../services/authService";
import SubServiceList from "../../pages/SubServices/SubServiceList";
import AddService from "./AddService";

const ServiceList = () => {
  const [addModalVisible, setAddModalVisible] = useState(false);
  const [data, setData] = useState([]);
  const [pagination, setPagination] = useState({ current: 1, pageSize: 10,  total: 0});
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");

  const [selectedServiceId, setSelectedServiceId] = useState(null);
  const [drawerVisible, setDrawerVisible] = useState(false);

  const fetchData = async (params = {}) => {
    setLoading(true);
    try {
      const res = await serviceList({
        currentPage: params.pagination?.current || 1,
        itemsPerPage: params.pagination?.pageSize || 10,
        searchData: params.search || "",
      });

      const fetchedData = res.data?.data?.data || [];
      const totalPages = res.data?.data?.count || 0;

      setData(fetchedData);

      setPagination({
        current: params.pagination?.current || 1,
        pageSize: params.pagination?.pageSize || 10,
        total: totalPages,
      });
    } catch (err) {
      console.error("Error fetching service list", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData({ pagination, search });
  }, []);

  const handleTableChange = (newPagination) => {
    fetchData({ pagination: newPagination, search });
  };

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearch(value);
    fetchData({ pagination: { ...pagination, current: 1 }, search: value });
  };

  const columns = [
    {
      title: "Icon",
      dataIndex: "serviceIcon",
      key: "serviceIcon",
      render: (icon) =>
        icon ? <Image width={50} src={icon} alt="icon" /> : "NA",
    },
    {
      title: "Service Name",
      dataIndex: "serviceName",
      key: "serviceName",
    },
    {
      title: "Added Date",
      dataIndex: "addedDate",
      key: "addedDate",
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space>
          <Button type="primary" icon={<EditOutlined />}>
            Edit
          </Button>
          <Button danger icon={<DeleteOutlined />}>
            Remove
          </Button>
          <Button
            onClick={() => {
              setSelectedServiceId(record._id);
              setDrawerVisible(true);
            }}
          >
            View Sub-Services
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div style={{ padding: "20px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Input
          placeholder="Search services"
          value={search}
          onChange={handleSearch}
          style={{ marginBottom: "20px", width: "300px" }}
        />

        <Button type="primary" icon={<PlusOutlined />} onClick={() => setAddModalVisible(true)}>
          Add Service
        </Button>
      </div>

      <AddService
        visible={addModalVisible}
        onClose={() => setAddModalVisible(false)}
        onSuccess={() => fetchData({ pagination, search })}
      />

      <Table
        columns={columns}
        dataSource={data}
        rowKey={(record) => record._id}
        bordered
        pagination={pagination}
        loading={loading}
        onChange={handleTableChange}
      />

      <Drawer
        title="Sub Services"
        width={800}
        onClose={() => setDrawerVisible(false)}
        visible={drawerVisible}
        destroyOnClose
      >
        <SubServiceList serviceId={selectedServiceId} />
      </Drawer>
    </div>
  );
};

export default ServiceList;
