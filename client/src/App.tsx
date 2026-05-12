import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { FundUniversePage } from '@/pages/FundUniverse'
import { ClientsPage } from '@/pages/Clients'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/funds" replace />} />
        <Route path="/funds" element={<FundUniversePage />} />
        <Route path="/clients" element={<ClientsPage />} />
        <Route path="*" element={<Navigate to="/funds" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
