import React from 'react';
import Navbar from '../components/Navbar';
import CollectionGrid from '../components/CollectionGrid';

const DiscoverPage = () => {
  const EmptyDiscover = (
    <div className="text-center py-16 px-6 bg-gray-50 dark:bg-gray-800 rounded-lg">
      <h2 className="text-2xl font-semibold mb-2 text-gray-800 dark:text-white">Nenhuma Coleção Pública</h2>
      <p className="text-gray-500 dark:text-gray-400">Não há coleções públicas de outros usuários no momento.</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-white">
      <Navbar />
      <main className="container mx-auto p-6">
        <header className="mb-8">
          <h1 className="text-4xl font-bold">Descobrir</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">Explore coleções de flashcards criadas pela comunidade.</p>
        </header>
        
        <CollectionGrid 
          endpointUrl="/public-collections/"
          showActions={false}
          emptyState={EmptyDiscover}
        />
      </main>
    </div>
  );
};

export default DiscoverPage;