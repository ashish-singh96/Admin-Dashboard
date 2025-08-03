import { Routes, Route } from 'react-router-dom'
import Dashboard from '../pages/Dashboard'
import UserList from '../pages/UserList'

const AppRoutes = () => (
  <Routes>
    <Route path="dashboard" element={<Dashboard />}>
      <Route path="user" element={<UserList />} />
    </Route>
  </Routes>
)

export default AppRoutes
