import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import Profile from './pages/Profile';
import Messages from './pages/Messages';
import Settings from './pages/Settings';
import Account from './pages/Account';
import Security from './pages/Security';
import Password from './pages/Password';
import Help from './pages/Help';
import Notification from './pages/Notification';
import FAQs from './pages/FAQs';
import SubmitTicket from './pages/SubmitTicket';
import NetworkStatus from './pages/NetworkStatus';

function App() {
  return (
    <Router>
      <div style={{ display: 'flex', background: '#141820', minHeight: '100vh', width: '100vw', overflow: 'hidden' }}>
        <Sidebar />
        <main style={{ flex: 1, padding: '32px', color: '#fff', overflow: 'auto' }}>
          <Routes>
            <Route path="/" element={<Navigate to="/profile" replace />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/messages" element={<Messages />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/settings/account" element={<Account />} />
            <Route path="/settings/account/security" element={<Security />} />
            <Route path="/settings/password" element={<Password />} />
            <Route path="/settings/notification" element={<Notification />} />
            <Route path="/help" element={<Help />} />
            <Route path="/help/faqs" element={<FAQs />} />
            <Route path="/help/ticket" element={<SubmitTicket />} />
            <Route path="/help/network" element={<NetworkStatus />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App
