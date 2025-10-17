import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { authService } from '../services/authService';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../hooks/useToast';

export const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();
  const { showSuccess, showError } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await authService.signin({ email, password });
      login(response.token, response.user);
      showSuccess('Login realizado com sucesso!');
      navigate('/dashboard');
    } catch (err: any) {
      showError(err.response?.data?.error || 'Erro ao fazer login');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex">
      {/* Left Panel - Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-black flex-col justify-center items-center p-12">
        <div className="text-center">
          <div className="mb-8">
            <h1 className="text-5xl font-bold text-white mb-6 tracking-wider">EXECUTIVA SERVICE</h1>
            <div className="w-32 h-1 bg-gold mx-auto mb-6"></div>
            <p className="text-gray-300 text-lg leading-relaxed max-w-md">
              Secretária Jurídica Remota especializada em serviços administrativos e comerciais para escritórios de advocacia.
            </p>
          </div>
        </div>
      </div>

      {/* Right Panel - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <div className="lg:hidden text-center mb-8">
            <h2 className="text-3xl font-bold text-black tracking-wider">EXECUTIVA SERVICE</h2>
          </div>

          <div className="mb-8">
            <h2 className="text-3xl font-bold text-black mb-2">Bem-vindo de volta</h2>
            <p className="text-gray-600">Entre com suas credenciais para acessar sua conta</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-black mb-2 uppercase tracking-wide">
                E-mail
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input-field"
                placeholder="seu@email.com"
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-semibold text-black mb-2 uppercase tracking-wide">
                Senha
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input-field"
                placeholder="••••••••"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full btn-primary disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {loading ? 'ENTRANDO...' : 'ENTRAR'}
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-gray-600">
              Não possui uma conta?{' '}
              <Link to="/signup" className="text-black hover:text-gold font-semibold transition-colors duration-300">
                Cadastre-se aqui
              </Link>
            </p>
          </div>

          <div className="mt-8 pt-6 border-t border-gray-200">
            <p className="text-xs text-gray-500 text-center">
              © 2025 EXECUTIVA SERVICE. Todos os direitos reservados.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

