import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import EventDetails from './pages/EventDetails';
import MyTickets from './pages/MyTickets';
import Dashboard from './pages/Dashboard';
import CreateEvent from './pages/CreateEvent';
import EditEvent from './pages/EditEvent';
import ManageEvents from './pages/ManageEvents';
import './App.css';

const ProtectedRoute = ({ children }) => {
  const { currentUser } = useAuth();
  return currentUser ? children : <Navigate to="/login" />;
};

const OrganizerRoute = ({ children }) => {
  const { currentUser, userRole } = useAuth();
  
  if (!currentUser) {
    return <Navigate to="/login" />;
  }
  
  if (userRole !== 'organizer') {
    return <Navigate to="/" />;
  }
  
  return children;
};

function AppContent() {
  return (
    <Router>
      <div className="app">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/event/:id" element={<EventDetails />} />
          <Route 
            path="/my-tickets" 
            element={
              <ProtectedRoute>
                <MyTickets />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/dashboard" 
            element={
              <OrganizerRoute>
                <Dashboard />
              </OrganizerRoute>
            } 
          />
          <Route 
            path="/create-event" 
            element={
              <OrganizerRoute>
                <CreateEvent />
              </OrganizerRoute>
            } 
          />
          <Route 
            path="/edit-event/:id" 
            element={
              <OrganizerRoute>
                <EditEvent />
              </OrganizerRoute>
            } 
          />
          <Route 
            path="/manage-events" 
            element={
              <OrganizerRoute>
                <ManageEvents />
              </OrganizerRoute>
            } 
          />
        </Routes>
      </div>
    </Router>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
