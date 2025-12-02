import React, { useContext } from 'react';
import Navbar from '../components/Navbar';
import AuthContext from '../context/AuthContext';
import { FiUser, FiMail } from 'react-icons/fi';

const SettingsPage = () => {
    const { user } = useContext(AuthContext);

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-white">
            <Navbar />
            <main className="container mx-auto p-6">
                <header className="mb-8">
                    <h1 className="text-4xl font-bold">Configurações</h1>
                    <p className="text-gray-500 dark:text-gray-400 mt-1">Gerencie as informações da sua conta.</p>
                </header>

                <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg max-w-2xl mx-auto">
                    <h2 className="text-2xl font-bold mb-6">Meu Perfil</h2>
                    {user ? (
                        <div className="space-y-4">
                            <div className="flex items-center space-x-4">
                                <FiUser className="text-blue-500 text-2xl" />
                                <div>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">Nome Completo</p>
                                    <p className="text-lg font-semibold">{user.first_name} {user.last_name}</p>
                                </div>
                            </div>
                            <div className="flex items-center space-x-4">
                                <FiMail className="text-blue-500 text-2xl" />
                                <div>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">Email</p>
                                    <p className="text-lg font-semibold">{user.email}</p>
                                </div>
                            </div>
                            <div className="pt-6">
                                <button className="bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 font-bold py-2 px-4 rounded-lg">
                                    Editar Perfil (Em breve)
                                </button>
                            </div>
                        </div>
                    ) : (
                        <p>Carregando informações do usuário...</p>
                    )}
                </div>
            </main>
        </div>
    );
};

export default SettingsPage;