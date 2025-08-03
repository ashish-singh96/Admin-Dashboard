import { Routes, Route } from 'react-router-dom';
import Layout from '../layouts/Layout';
import UserList from '../pages/UserList';

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Layout />}>
      <Route path="user" element={<UserList />} />
    </Route>
  </Routes>
);

export default AppRoutes;
