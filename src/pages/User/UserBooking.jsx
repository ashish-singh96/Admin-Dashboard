import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Spin, Card, Tag, Row, Col, Typography, Space } from "antd";
import { userBooking } from "../../services/authService.js";

const { Title, Text } = Typography;

const UserBooking = () => {
  const { id } = useParams();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token || !id) return;

    const fetchBookings = async () => {
      try {
        setLoading(true);
        const res = await userBooking(id);
        setBookings(res.data.data.data || []);
      } catch (error) {
        console.error("Error fetching bookings:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [id]);

  return (
    <div style={{ padding: "20px" }}>
      <Title level={3} style={{ marginBottom: 24 }}>
        User Booking Details
      </Title>

      {loading ? (
        <div style={{ textAlign: "center", padding: "40px 0" }}>
          <Spin size="large" />
        </div>
      ) : bookings.length > 0 ? (
        <Row gutter={[24, 24]}>
          {bookings.map((b, index) => (
            <Col xs={24} sm={12} lg={8} key={index}>
              <Card
                hoverable
                bordered={false}
                style={{
                  borderRadius: "14px",
                  boxShadow: "0px 14px 12px rgba(0,0,0,0.05)",
                  overflow: "hidden",
                  background: "white",
                  transition: "transform 0.3s ease, box-shadow 0.3s ease",
                }}
                bodyStyle={{
                  padding: "12px 16px",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-5px)")}
                onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0)")}
              >
                {/* Custom header inside card body */}
                <div
                  style={{
                    background: "linear-gradient(90deg, #4facfe 0%, #00f2fe 100%)",
                    padding: "6px 10px",
                    borderRadius: "8px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    width: "100%",
                    marginBottom: "12px",
                  }}
                >
                  <Text style={{ color: "#fff", fontWeight: 500, fontSize: 13 }}>
                    {new Date(b.date).toLocaleDateString()}
                  </Text>
                  <Tag
                    color={b.status === "BOOKED" ? "green" : "default"}
                    style={{
                      fontWeight: 500,
                      margin: 0,
                      fontSize: 12,
                      padding: "2px 6px",
                      backgroundColor: "#fff",
                      color: "#00a65a",
                    }}
                  >
                    {b.status}
                  </Tag>
                </div>

                <Title level={5} style={{ margin: "0 0 4px" }}>
                  {b.serviceName}
                </Title>
                <Text type="secondary" style={{ display: "block", marginBottom: 6, fontSize: 12 }}>
                  Order ID: {b.orderId}
                </Text>

                <Space direction="vertical" size={2} style={{ width: "100%", marginBottom: 8 }}>
                  <Text style={{ fontSize: 12 }}>
                    <b>Payment Mode:</b> {b.paymentMode}
                  </Text>
                  <Text
                    strong
                    style={{
                      color: "#27ae60",
                      fontSize: "14px",
                      background: "#eafaf1",
                      padding: "2px 6px",
                      borderRadius: "4px",
                      display: "inline-block",
                      marginTop: "2px",
                    }}
                  >
                    ₹{b.totalAmount}
                  </Text>
                </Space>

                <Title level={5} style={{ margin: "8px 0 6px" }}>
                  Sub Services
                </Title>
                <Space direction="vertical" size={4} style={{ width: "100%" }}>
                  {b.subServices?.map((s, i) => (
                    <Card
                      key={i}
                      size="small"
                      bordered
                      bodyStyle={{
                        padding: "4px 6px",
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                      }}
                      style={{
                        background: "#fafafa",
                        borderRadius: "6px",
                        boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
                      }}
                    >
                      <img
                        src={`https://backend.serviceapp.laxmipool.in/${s.subServiceImage}`}
                        alt={s.subServiceName}
                        style={{
                          width: "36px",
                          height: "36px",
                          objectFit: "cover",
                          borderRadius: "4px",
                        }}
                      />
                      <div style={{ flex: 1 }}>
                        <Text strong style={{ fontSize: 12 }}>
                          {s.subServiceName}
                        </Text>
                        <br />
                        <Text type="secondary" style={{ fontSize: 11 }}>
                          ₹{s.offerPrice} | {s.duration} min
                        </Text>
                      </div>
                    </Card>
                  ))}
                </Space>
              </Card>
            </Col>
          ))}
        </Row>
      ) : (
        <Text type="secondary">No booking found</Text>
      )}
    </div>
  );
};

export default UserBooking;
