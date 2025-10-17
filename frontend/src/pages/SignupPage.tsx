import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { authService } from '../services/authService';
import { useToast } from '../hooks/useToast';

export const SignupPage = () => {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { showSuccess, showError } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      showError('As senhas não coincidem');
      return;
    }

    if (password.length < 6) {
      showError('A senha deve ter no mínimo 6 caracteres');
      return;
    }

    setLoading(true);

    try {
      await authService.signup({ nome, email, password });
      showSuccess('Cadastro realizado com sucesso! Faça login para continuar.');
      navigate('/login');
    } catch (err: any) {
      showError(err.response?.data?.error || 'Erro ao fazer cadastro');
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
            <div className="w-20 h-20 mx-auto mb-6 bg-gold flex items-center justify-center">
              <svg className="w-12 h-12 text-black" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zm0 4a1 1 0 011-1h12a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1V8zm2 2a1 1 0 000 2h2a1 1 0 000-2H5zm4 0a1 1 0 000 2h2a1 1 0 000-2H9zm4 0a1 1 0 000 2h2a1 1 0 000-2h-2z" clipRule="evenodd" />
              </svg>
            </div>
            <h1 className="text-4xl font-bold text-white mb-4">EXECUTIVA SERVICE</h1>
            <div className="w-24 h-1 bg-gold mx-auto mb-6"></div>
            <p className="text-gray-300 text-lg leading-relaxed max-w-md">
              Junte-se a nós e transforme a gestão do seu escritório jurídico com nossos serviços especializados.
            </p>
          </div>
        </div>
      </div>

      {/* Right Panel - Signup Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <div className="lg:hidden text-center mb-8">
            <div className="w-16 h-16 mx-auto mb-4 bg-black flex items-center justify-center">
              <svg className="w-10 h-10 text-gold" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zm0 4a1 1 0 011-1h12a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1V8zm2 2a1 1 0 000 2h2a1 1 0 000-2H5zm4 0a1 1 0 000 2h2a1 1 0 000-2H9zm4 0a1 1 0 000 2h2a1 1 0 000-2h-2z" clipRule="evenodd" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-black">EXECUTIVA SERVICE</h2>
          </div>

          <div className="mb-8">
            <h2 className="text-3xl font-bold text-black mb-2">Criar sua conta</h2>
            <p className="text-gray-600">Preencha os dados abaixo para começar</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="nome" className="block text-sm font-semibold text-black mb-2 uppercase tracking-wide">
                Nome Completo
              </label>
              <input
                type="text"
                id="nome"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                className="input-field"
                placeholder="Seu nome completo"
                required
              />
            </div>

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

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-semibold text-black mb-2 uppercase tracking-wide">
                Confirmar Senha
              </label>
              <input
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
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
              {loading ? 'CADASTRANDO...' : 'CADASTRAR'}
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-gray-600">
              Já possui uma conta?{' '}
              <Link to="/login" className="text-black hover:text-gold font-semibold transition-colors duration-300">
                Fazer login
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

