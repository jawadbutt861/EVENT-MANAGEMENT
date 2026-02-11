import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { AuthProvider } from './context/AuthContext';
import { useAuth } from './hooks/useAuth';
import ErrorBoundary from './components/ErrorBoundary';
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
import { USER_ROLES } from './constants';
import './App.css';

const ProtectedRoute = ({ children }) => {
  const { currentUser } = useAuth();
  return currentUser ? children : <Navigate to="/login" />;
};

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired
};

const OrganizerRoute = ({ children }) => {
  const { currentUser, userRole } = useAuth();
  
  if (!currentUser) {
    return <Navigate to="/login" />;
  }
  
  if (userRole !== USER_ROLES.ORGANIZER) {
    return <Navigate to="/" />;
  }
  
  return children;
};

OrganizerRoute.propTypes = {
  children: PropTypes.node.isRequired
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
    <ErrorBoundary>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </ErrorBoundary>
  );
}

export default App;
