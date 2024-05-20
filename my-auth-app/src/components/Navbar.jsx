import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Navbar = () => {
  const { setAuthTokens } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    setAuthTokens(null);
    navigate('/login');
  };

  return (
    <nav className="bg-blue-600 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-white text-xl font-bold">Dashboard</h1>
        <button
          onClick={handleLogout}
          className="text-white bg-red-500 hover:bg-red-700 py-2 px-4 rounded"
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
