import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import './Navbar.css';

const Navbar = ({ onAdd }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <span className="navbar-brand">Ghosted</span>
      <div className="navbar-actions">
        <span>{user?.name}</span>
        <button className="btn-primary" onClick={onAdd}>+ Add Application</button>
        <button className="btn-ghost" onClick={handleLogout}>Logout</button>
      </div>
    </nav>
  );
};

export default Navbar;