import AdminLayout from '../layouts/AdminLayout'
import { Outlet } from "react-router-dom";

const Dashboard = () => {
  return (
    <div>
      <Outlet />
       <AdminLayout></AdminLayout>
    </div>

   
  )
}

export default Dashboard
