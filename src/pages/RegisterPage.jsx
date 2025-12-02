import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../services/api';
import Navbar from '../components/Navbar';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = { ...formData, username: formData.email };
      await api.post('/register/', payload);
      alert('Registro bem-sucedido! Por favor, faça o login.');
      navigate('/login');
    } catch (error) {
      console.error('Falha no registro:', error.response?.data);
      const errorMessages = Object.values(error.response?.data || {}).flat().join('\n');
      alert(`Erro no registro:\n${errorMessages || 'Verifique os dados e tente novamente.'}`);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 dark:bg-gray-900">
      <Navbar />
      <main className="flex-grow flex items-center justify-center p-4">
        <div className="p-8 bg-white dark:bg-gray-800 rounded-lg shadow-md w-full max-w-md text-gray-800 dark:text-gray-200">
          <h2 className="text-3xl font-bold mb-6 text-center">Criar Conta</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
              <div className='w-full md:w-1/2'>
                <label className="block mb-1 font-semibold">Nome</label>
                <input type="text" name="first_name" onChange={handleChange} className="w-full px-3 py-2 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" required />
              </div>
              <div className='w-full md:w-1/2'>
                <label className="block mb-1 font-semibold">Sobrenome</label>
                <input type="text" name="last_name" onChange={handleChange} className="w-full px-3 py-2 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" required />
              </div>
            </div>
            <div>
              <label className="block mb-1 font-semibold">Email</label>
              <input type="email" name="email" onChange={handleChange} className="w-full px-3 py-2 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" required />
            </div>
            <div>
              <label className="block mb-1 font-semibold">Senha</label>
              <input type="password" name="password" onChange={handleChange} className="w-full px-3 py-2 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" required />
            </div>
            <button type="submit" className="w-full py-2 mt-4 text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors">
              Registrar
            </button>
          </form>
          <p className="text-center mt-6 text-sm text-gray-600 dark:text-gray-400">
            Já tem uma conta?{' '}
            <Link to="/login" className="text-blue-500 hover:underline">
              Faça login
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
};

export default RegisterPage;