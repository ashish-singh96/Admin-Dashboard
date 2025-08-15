import { useEffect, useState } from 'react';
import { Table, Input, Avatar, Button, Space } from 'antd';
import { EyeOutlined, UserOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { vendorList } from '../../services/authService.js';
import './VendorList.css';

const VendorList = () => {
  const [data, setData] = useState([]);
  const [pagination, setPagination] = useState({ current: 1, pageSize: 10, total: 0 });
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  // Table column configuration
  const columns = [
    {
      title: 'Profile',
      dataIndex: 'profileImage',
      key: 'profileImage',
      render: (img) => (
        <Avatar
          src={img || null}
          icon={!img && <UserOutlined />}
          size={50}
          style={{ backgroundColor: '#f0f0f0' }}
        />
      )
    },
    {
      title: 'Full Name',
      key: 'fullName',
      render: (_, record) => (
        <strong style={{ whiteSpace: 'nowrap' }}>
          {record.firstName} {record.lastName}
        </strong>
      ),
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      render: (text) => <span style={{ whiteSpace: 'nowrap' }}>{text}</span>
    },
    {
      title: 'Mobile No',
      dataIndex: 'mobileNo',
      key: 'mobileNo',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => (
        <span style={{
          color: status === 'active' ? 'green' : 'red',
          fontWeight: 500,
          whiteSpace: 'nowrap'
        }}>
          {status?.toUpperCase()}
        </span>
      )
    },
    {
      title: 'Added Date',
      dataIndex: 'addedDate',
      key: 'addedDate',
    },
    {
      title: 'Total Bookings',
      dataIndex: 'totalBooking',
      key: 'totalBooking',
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space>
          <Button
            type="primary"
            icon={<EyeOutlined />}
            onClick={() => navigate(`/dashboard/vendor/${record._id}`)}
          >
            View
          </Button>
        </Space>
      )
    }
  ];

  // Fetch user data
  const fetchData = async (params = {}) => {
    setLoading(true);
    try {
      const res = await vendorList({
        currentPage: params.pagination?.current || 1,
        itemsPerPage: params.pagination?.pageSize || 10,
        searchData: params.search || ''
      });

      setData(res.data.data.data || []);
      setPagination({
        current: params.pagination?.current || 1,
        pageSize: params.pagination?.pageSize || 10,
        total: res.data.data.totalPage * (params.pagination?.pageSize || 10)
      });
    } catch (err) {
      console.error('Error fetching user list', err);
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

  return (
    <div className="userlist-container">
      {/* Right-aligned search bar */}
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 16, margin: 10 }}>
        <Input.Search
          placeholder="Search user by name"
          allowClear
          enterButton
          onSearch={(value) => handleSearch({ target: { value } })}
          onChange={handleSearch}
          style={{ width: 300 }}
        />
      </div>

      <Table
        columns={columns}
        dataSource={data.map((item) => ({ ...item, key: item._id }))}
        pagination={pagination}
        loading={loading}
        onChange={handleTableChange}
        bordered
        rowClassName="custom-row"
        scroll={{ x: 'max-content' }}
      />
    </div>
  );
};

export default VendorList;
