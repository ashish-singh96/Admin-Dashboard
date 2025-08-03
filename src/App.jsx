import { BrowserRouter } from 'react-router-dom'
import AppRoutes from './routes'
import Sidebar from './components/Sidebar'
function App() {
  return (
    <BrowserRouter>
      <Sidebar />
      <AppRoutes />
    </BrowserRouter>
  )
}

export default App
