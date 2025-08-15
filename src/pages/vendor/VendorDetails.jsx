import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  Card,
  Descriptions,
  Image,
  Typography,
  Row,
  Col,
  Divider,
  Tag,
  Spin,
} from 'antd';
import { vendorDetails } from '../../services/authService.js';

const { Title } = Typography;

const VendorDetails = () => {
  const { id } = useParams();
  const [vendorData, setVendorData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchVendorDetails = async () => {
      try {
        setLoading(true);
        const res = await vendorDetails(id);
        setVendorData(res.data.data);
      } catch (error) {
        console.error('Error fetching vendor details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchVendorDetails();
  }, [id]);

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
        <Spin size="large" />
      </div>
    );
  }

  if (!vendorData) return null;

  const {
    fullName,
    email,
    mobileNo,
    dob,
    bloodGroup,
    profileImage,
    address,
    documents,
    bankDetails,
    documentActionInfo,
  } = vendorData;

  return (
    <div style={{ padding: 24, backgroundColor: '#f5f7fa', minHeight: '100vh' }}>
      <Card bordered={false} style={{ borderRadius: 10, boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
        <Row gutter={[24, 24]}>
          {/* Profile Section */}
          <Col xs={24} md={6} style={{ textAlign: 'center' }}>
            <Image
              src={profileImage}
              alt="Profile"
              width={150}
              height={150}
              style={{ borderRadius: '50%', objectFit: 'cover', border: '4px solid #1890ff' }}
              preview
            />
            <Title level={4} style={{ marginTop: 16 }}>{fullName}</Title>
            <Tag color="blue">{bloodGroup}</Tag>
          </Col>

          {/* Basic Info */}
          <Col xs={24} md={18}>
            <Card title="Basic Information" bordered>
              <Descriptions column={1} labelStyle={{ fontWeight: 'bold' }}>
                <Descriptions.Item label="Email">{email}</Descriptions.Item>
                <Descriptions.Item label="Mobile No">{mobileNo}</Descriptions.Item>
                <Descriptions.Item label="Date of Birth">{dob}</Descriptions.Item>
              </Descriptions>
            </Card>
          </Col>

          {/* Address */}
          <Col xs={24} md={12}>
            <Card title="Address" bordered>
              <Descriptions column={1} labelStyle={{ fontWeight: 'bold' }}>
                <Descriptions.Item label="Full Address">{address.fullAddress}</Descriptions.Item>
                <Descriptions.Item label="Address Line 2">{address.addressLine2}</Descriptions.Item>
                <Descriptions.Item label="Locality">{address.locality}</Descriptions.Item>
                <Descriptions.Item label="Postal Code">{address.pincode}</Descriptions.Item>
                <Descriptions.Item label="Country">{address.country}</Descriptions.Item>
              </Descriptions>
            </Card>
          </Col>

          {/* Bank Details */}
          <Col xs={24} md={12}>
            <Card title="Bank Details" bordered>
              <Descriptions column={1} labelStyle={{ fontWeight: 'bold' }}>
                <Descriptions.Item label="Bank Name">{bankDetails.bankName}</Descriptions.Item>
                <Descriptions.Item label="IFSC Code">{bankDetails.ifcsCode}</Descriptions.Item>
                <Descriptions.Item label="Account No">{bankDetails.bankAccountNo}</Descriptions.Item>
              </Descriptions>
            </Card>
          </Col>

          {/* Documents */}
          <Col xs={24}>
            <Card title="Documents" bordered>
              <Row gutter={[16, 16]}>
                <Col xs={24} md={8}>
                  <Card
                    size="small"
                    title="Aadhar"
                    extra={<Tag color={documents.isAadharDocVerified ? 'green' : 'red'}>
                      {documents.isAadharDocVerified ? 'Verified' : 'Pending'}
                    </Tag>}
                  >
                    {documents.aadharImage?.map((url, idx) => (
                      <Image key={idx} src={url} width="100%" style={{ marginBottom: 8 }} />
                    ))}
                  </Card>
                </Col>
                <Col xs={24} md={8}>
                  <Card
                    size="small"
                    title="PAN"
                    extra={<Tag color={documents.isPanDocVerified ? 'green' : 'red'}>
                      {documents.isPanDocVerified ? 'Verified' : 'Pending'}
                    </Tag>}
                  >
                    <Image src={documents.panImage} width="100%" />
                  </Card>
                </Col>
                <Col xs={24} md={8}>
                  <Card
                    size="small"
                    title="License"
                    extra={<Tag color={documents.isLicenseVerified ? 'green' : 'red'}>
                      {documents.isLicenseVerified ? 'Verified' : 'Pending'}
                    </Tag>}
                  >
                    <Image src={documents.licenseImage} width="100%" />
                  </Card>
                </Col>
              </Row>
            </Card>
          </Col>

          {/* Document Status */}
          <Col xs={24}>
            <Card title="Document Status" bordered>
              <Descriptions column={1} labelStyle={{ fontWeight: 'bold' }}>
                <Descriptions.Item label="Action">{documentActionInfo.documentAction}</Descriptions.Item>
                <Descriptions.Item label="Date">{documentActionInfo.documentActionDate}</Descriptions.Item>
              </Descriptions>
            </Card>
          </Col>
        </Row>
      </Card>
    </div>
  );
};

export default VendorDetails;
