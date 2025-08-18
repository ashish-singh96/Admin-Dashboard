import React, { useState } from "react";
import {
    Card,
    Descriptions,
    Tag,
    Progress,
    Row,
    Col,
    Button,
    Input,
    Space,
    message,
    Drawer
} from "antd";
import { EditOutlined, DeleteOutlined, PlusOutlined, PoweroffOutlined, SearchOutlined, } from "@ant-design/icons";
import AddCoupon from "./AddCoupon";

const CouponList = () => {
    // Mock response array
    const initialCoupons = [
        {
            couponCode: "HOLI25",
            title: "Special 25% Off",
            description: "Special promo only today!",
            discountType: "percentage",
            discountValue: 25,
            minOrderAmount: 100,
            maxDiscountAmount: 200,
            validFrom: "2025-08-05T00:00:00Z",
            validTo: "2025-08-06T00:00:00Z",
            usageLimit: 500,
            usedCount: 100,
            active: true,
        },
        {
            couponCode: "NEW100",
            title: "Flat ₹100 Off",
            description: "Valid on first order",
            discountType: "flat",
            discountValue: 100,
            minOrderAmount: 500,
            validFrom: "2025-08-01T00:00:00Z",
            validTo: "2025-08-15T00:00:00Z",
            usageLimit: 1000,
            usedCount: 250,
            active: false,
        },
        {
            couponCode: "FEST50",
            title: "Festive 50% Off",
            description: "Celebrate with half price!",
            discountType: "percentage",
            discountValue: 50,
            minOrderAmount: 200,
            maxDiscountAmount: 300,
            validFrom: "2025-08-10T00:00:00Z",
            validTo: "2025-08-20T00:00:00Z",
            usageLimit: 300,
            usedCount: 120,
            active: true,
        },
    ];

    const [coupons, setCoupons] = useState(initialCoupons);
    const [search, setSearch] = useState("");
    const [drawerVisible, setDrawerVisible] = useState(false);

    // Toggle active/inactive
    const toggleStatus = (index) => {
        const updated = [...coupons];
        updated[index].active = !updated[index].active;
        setCoupons(updated);
        message.success(
            `Coupon ${updated[index].active ? "Activated" : "Deactivated"}`
        );
    };

    // Remove coupon
    const removeCoupon = (index) => {
        const updated = coupons.filter((_, i) => i !== index);
        setCoupons(updated);
        message.success("Coupon Removed");
    };

    // Filtered coupons based on search
    const filteredCoupons = coupons.filter(
        (c) =>
            c.title.toLowerCase().includes(search.toLowerCase()) ||
            c.couponCode.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div style={{ padding: "20px" }}>
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: "20px",
                }}
            >
                <Input
                    placeholder="Search by title or code"
                    prefix={<SearchOutlined />}
                    style={{ width: 300 }}
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <Button
                    type="primary"
                    icon={<PlusOutlined />}
                    onClick={() => setDrawerVisible(true)}
                >
                    Add New Coupon
                </Button>


            </div>

            {/* Coupon Cards */}
            <Row gutter={[16, 16]}>
                {filteredCoupons.map((coupon, index) => {
                    const usagePercent =
                        coupon.usageLimit && coupon.usedCount
                            ? (coupon.usedCount / coupon.usageLimit) * 100
                            : 0;

                    return (
                        <Col key={index} xs={24} sm={12} md={8}>
                            <Card
                                title={
                                    <span>
                                        🎟️ {coupon.title}{" "}
                                        <Tag
                                            color={coupon.active ? "green" : "red"}
                                            style={{ marginLeft: 10 }}
                                        >
                                            {coupon.couponCode}
                                        </Tag>
                                    </span>
                                }
                                bordered
                                actions={[
                                    <Button
                                        type={coupon.active ? "primary" : "default"}
                                        icon={<PoweroffOutlined />}
                                        onClick={() => toggleStatus(index)}
                                    >
                                        {coupon.active ? "Active" : "Inactive"}
                                    </Button>,
                                    <Button
                                        type="dashed"
                                        icon={<EditOutlined />}
                                        onClick={() => message.info("Edit functionality pending")}
                                    >
                                        Edit
                                    </Button>,
                                    <Button
                                        danger
                                        icon={<DeleteOutlined />}
                                        onClick={() => removeCoupon(index)}
                                    >
                                        Remove
                                    </Button>,
                                ]}
                            >
                                <Descriptions column={1} bordered size="small">
                                    {coupon.description && (
                                        <Descriptions.Item label="Description">
                                            {coupon.description}
                                        </Descriptions.Item>
                                    )}
                                    <Descriptions.Item label="Discount">
                                        {coupon.discountType === "percentage"
                                            ? `${coupon.discountValue}% Off`
                                            : `₹${coupon.discountValue} Off`}
                                    </Descriptions.Item>
                                    {coupon.minOrderAmount && (
                                        <Descriptions.Item label="Min Order Amount">
                                            ₹{coupon.minOrderAmount}
                                        </Descriptions.Item>
                                    )}
                                    {coupon.maxDiscountAmount && (
                                        <Descriptions.Item label="Max Discount Amount">
                                            ₹{coupon.maxDiscountAmount}
                                        </Descriptions.Item>
                                    )}
                                    <Descriptions.Item label="Valid From">
                                        {new Date(coupon.validFrom).toLocaleDateString()}
                                    </Descriptions.Item>
                                    <Descriptions.Item label="Valid To">
                                        {new Date(coupon.validTo).toLocaleDateString()}
                                    </Descriptions.Item>
                                    {coupon.usageLimit && (
                                        <Descriptions.Item label="Usage">
                                            <Progress
                                                percent={usagePercent}
                                                size="small"
                                                status="active"
                                                format={() =>
                                                    `${coupon.usedCount}/${coupon.usageLimit} used`
                                                }
                                            />
                                        </Descriptions.Item>
                                    )}
                                </Descriptions>
                            </Card>
                        </Col>
                    );
                })}
            </Row>

            <Drawer
                title="Add Coupon"
                width={400}
                onClose={() => setDrawerVisible(false)}
                open={drawerVisible}
                destroyOnClose
            >
                <AddCoupon
                    onClose={() => setDrawerVisible(false)}
                    onSuccess={() => {
                        // refresh coupon list if needed
                        setDrawerVisible(false);
                    }}
                />
            </Drawer>

        </div>
    );
};

export default CouponList;
