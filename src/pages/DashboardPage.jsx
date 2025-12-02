import React, { useState, useEffect, useMemo, useContext } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import CollectionCard from '../components/CollectionCard';
import api from '../services/api';
import AuthContext from '../context/AuthContext';

const DashboardPage = () => {
  const { user } = useContext(AuthContext);
  const [allCollections, setAllCollections] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (user) {
      setIsLoading(true);
      api.get('/collections/')
        .then(response => {
          setAllCollections(response.data.results || response.data || []);
        })
        .catch(error => { console.error('Falha ao buscar as coleções do usuário', error); })
        .finally(() => { setIsLoading(false); });
    } else {
      setIsLoading(false);
    }
  }, [user]);

  const { myCollections, favoriteCollections } = useMemo(() => {
    const my = allCollections.filter(c => c.is_owner);
    const favs = allCollections.filter(c => !c.is_owner);
    return { myCollections: my, favoriteCollections: favs };
  }, [allCollections]);

  const handleDelete = async (collectionId) => {
    if (window.confirm('Tem certeza que deseja DELETAR esta coleção? Esta ação é permanente.')) {
      try {
        await api.delete(`/collections/${collectionId}/`);
        setAllCollections(prev => prev.filter(c => c.id !== collectionId));
      } catch (error) { alert('Não foi possível deletar a coleção.'); }
    }
  };

  const handleUnfavorite = async (collectionId) => {
    if (window.confirm('Remover esta coleção dos seus favoritos?')) {
      try {
        await api.post(`/collections/${collectionId}/favorite/`);
        setAllCollections(prev => prev.filter(c => c.id !== collectionId));
      } catch (error) { alert('Não foi possível remover dos favoritos.'); }
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900"><Navbar /><p className="text-center mt-10">Carregando...</p></div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-white">
      <Navbar />
      <main className="container mx-auto p-6">
        <section className="mb-16">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold">Minhas Coleções</h1>
            <Link to="/collections/new" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg">
              + Criar Nova Coleção
            </Link>
          </div>
          {myCollections.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {myCollections.map(collection => (
                <CollectionCard key={collection.id} collection={collection} isOwnerView={true} onDelete={handleDelete} />
              ))}
            </div>
          ) : ( <p className="text-gray-500 dark:text-gray-400">Você ainda não criou nenhuma coleção.</p> )}
        </section>

        <section>
          <h2 className="text-3xl font-bold mb-6 border-t border-gray-200 dark:border-gray-700 pt-8">Coleções Salvas</h2>
          {favoriteCollections.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {favoriteCollections.map(collection => (
                <CollectionCard key={collection.id} collection={collection} isFavoriteView={true} onFavoriteToggle={handleUnfavorite} />
              ))}
            </div>
          ) : ( <p className="text-gray-500 dark:text-gray-400">Você ainda não salvou nenhuma coleção da página "Descobrir".</p> )}
        </section>
      </main>
    </div>
  );
};

export default DashboardPage;