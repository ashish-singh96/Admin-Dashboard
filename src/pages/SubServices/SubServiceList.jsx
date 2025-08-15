import { useState, useEffect } from "react";
import { Table, Image, Input, Button } from "antd";
import { getSubServicesByServiceId } from "../../services/authService";
import AddSubServices from "../SubServices/AddSubServices";

const SubServiceList = ({ serviceId }) => {
  const [data, setData] = useState([]);
  const [pagination, setPagination] = useState({ current: 1, pageSize: 10, total: 0 });
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [addDrawerVisible, setAddDrawerVisible] = useState(false);

  const fetchSubServices = async (params = {}) => {
    if (!serviceId) return;
    setLoading(true);
    try {
      const res = await getSubServicesByServiceId({
        serviceId,
        currentPage: params.pagination?.current || 1,
        itemsPerPage: params.pagination?.pageSize || 5,
        searchData: params.search || "",
      });

      const subServices = res.data?.data?.data || [];
      const totalCount = res.data?.data?.totalPage || 1;

      setData(subServices);
      setPagination({
        current: params.pagination?.current || 1,
        pageSize: params.pagination?.pageSize || 5,
        total: totalCount * (params.pagination?.pageSize || 5),
      });
    } catch (err) {
      console.error("Error loading sub-services", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubServices({ pagination, search });
  }, [serviceId]);

  const handleTableChange = (newPagination) => {
    fetchSubServices({ pagination: newPagination, search });
  };

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearch(value);
    fetchSubServices({ pagination: { ...pagination, current: 1 }, search: value });
  };

  const columns = [
    {
      title: "Image",
      dataIndex: "serviceImage",
      key: "serviceImage",
      render: (img) =>
        img ? <Image width={50} src={img} alt="sub service" /> : "NA",
    },
    { title: "Name", dataIndex: "subServiceName", key: "subServiceName" },
    { title: "Description", dataIndex: "description", key: "description" },
    {
      title: "Duration",
      dataIndex: "duration",
      key: "duration",
      render: (duration) => (duration ? `${duration} min` : "NA"),
    },
    { title: "Price", dataIndex: "price", key: "price" },
    { title: "Offer", dataIndex: "offerPrice", key: "offerPrice" },
    { title: "Rating", dataIndex: "averageRating", key: "averageRating" },
    { title: "Reviews", dataIndex: "totalReviews", key: "totalReviews" },
  ];

  return (
    <div style={{ padding: "20px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
        <Input
          placeholder="Search sub-services"
          value={search}
          onChange={handleSearch}
          style={{ width: "300px" }}
        />
        <Button type="primary" onClick={() => setAddDrawerVisible(true)}>
          Add Sub-Service
        </Button>
      </div>

     
      <Table
        columns={columns}
        dataSource={data}
        loading={loading}
        rowKey={(record) => record._id}
        pagination={pagination}
        onChange={handleTableChange}
        bordered
      />

    
      <AddSubServices
        visible={addDrawerVisible}
        onClose={() => setAddDrawerVisible(false)}
        serviceId={serviceId} 
        onSuccess={() => fetchSubServices({ pagination, search })}
      />
    </div>
  );
};

export default SubServiceList;
