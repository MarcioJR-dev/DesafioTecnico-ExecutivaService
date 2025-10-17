import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-black text-white shadow-lg border-b-2 border-gold">
      <div className="container mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold tracking-wider">EXECUTIVA SERVICE</h1>
          </div>
          <div className="flex items-center space-x-6">
            <span className="text-sm font-medium text-gray-300">Bem-vindo, {user?.nome}</span>
            <button
              onClick={handleLogout}
              className="btn-secondary text-white border-white hover:bg-white hover:text-black"
            >
              SAIR
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

