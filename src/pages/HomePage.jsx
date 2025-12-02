import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import AuthContext from '../context/AuthContext';

const HomePage = () => {

  const { user, logoutUser } = useContext(AuthContext);

  return (
    <div className="min-h-screen dark:bg-gray-900 dark:text-white">
      <Navbar />
      <main className="container mx-auto text-center py-20">
        <h1 className="text-5xl font-extrabold mb-4">
          Bem-vindo ao FlashcardApp
        </h1>
        <p className="text-xl mb-8">
          A melhor maneira de criar, compartilhar e estudar com flashcards.
        </p>
        <div>
          {user ? (
            <>
              <Link
                to="/discover"
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-8 rounded-full text-lg"
              >
                Descobrir Coleções
              </Link>
            </>
          ) : (
            <>
              <Link
                to="/register"
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-8 rounded-full text-lg"
              >
                Comece a Aprender Agora
              </Link>
            </>
          )}
        </div>
      </main>
    </div>
  );
};

export default HomePage;