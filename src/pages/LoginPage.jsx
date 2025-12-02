import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import Navbar from '../components/Navbar';

const LoginPage = () => {
  const { loginUser } = useContext(AuthContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    loginUser(email, password);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 dark:bg-gray-900">
      <Navbar /> 
      <main className="flex-grow flex items-center justify-center p-4">
        <div className="p-8 bg-white dark:bg-gray-800 rounded-lg shadow-md w-full max-w-md text-gray-800 dark:text-gray-200">
          <h2 className="text-3xl font-bold mb-6 text-center">Login</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block mb-1 font-semibold">Email</label>
              <input 
                type="email" 
                name="email" 
                className="w-full px-3 py-2 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" 
                required 
              />
            </div>
            <div>
              <label className="block mb-1 font-semibold">Senha</label>
              <input 
                type="password" 
                name="password" 
                className="w-full px-3 py-2 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" 
                required 
              />
            </div>
            <button 
              type="submit" 
              className="w-full py-2 mt-4 text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors"
            >
              Entrar
            </button>
          </form>
          <p className="text-center mt-6 text-sm text-gray-600 dark:text-gray-400">
            Não tem uma conta?{' '}
            <Link to="/register" className="text-blue-500 hover:underline">
              Registre-se
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
};

export default LoginPage;