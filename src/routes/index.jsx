import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import Layout from '../layouts/Layout';
import DashboardHome from '../pages/DashboardHome/DashboardHome';
import UserList from '../pages/User/UserList';
import LoginModal from '../pages/LoginModal/LoginModal';
import UserBooking from '../pages/User/UserBooking';
import VendorList from '../pages/vendor/VendorList';
import VendorDetails from '../pages/vendor/VendorDetails';
import ServiceList from '../pages/Services/ServiceList';
import SubServiceList from '../pages/SubServices/SubServiceList';
import TimeSlotList from '../pages/TimeSlots/TimeSlotList';
import CouponList from '../pages/Coupon/CouponList';
const AppRoutes = () => {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/") {
      localStorage.removeItem('token');
      setIsLoginOpen(true);
    } else {
      const token = localStorage.getItem('token');
      if (!token) {
        setIsLoginOpen(true);
      } else {
        setIsLoginOpen(false);
      }
    }
  }, [location.pathname]);

  return (
    <>
      <Routes>
        <Route path="/" element={<div />} />
        <Route path="dashboard" element={<Layout />}>
          <Route index element={<DashboardHome />} />
          <Route path="user" element={<UserList />} />
          <Route path="user/:id" element={<UserBooking />} />
          <Route path="vendor" element={<VendorList />} />
          <Route path="vendor/:id" element={<VendorDetails />} />
          <Route path="services" element={<ServiceList />} />
          <Route path="sub-services" element={<SubServiceList />} />
          <Route path="time-slot" element={<TimeSlotList />} />
          <Route path="coupon" element={<CouponList />} />
        </Route>
      </Routes>

      <LoginModal
        isOpen={isLoginOpen}
        onClose={() => {
          setIsLoginOpen(false);
          navigate('/dashboard');
        }}
      />
    </>
  );
};

export default AppRoutes;
