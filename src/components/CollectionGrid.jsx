import React, { useState, useEffect, useMemo } from 'react';
import api from '../services/api';
import CollectionCard from './CollectionCard';
import Pagination from './Pagination';

const ITEMS_PER_PAGE = 9;

const CollectionGrid = ({ endpointUrl, isOwnerView, isFavoriteView, onDelete, onFavoriteToggle, emptyState }) => {
  const [allCollections, setAllCollections] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  
  useEffect(() => {
    const fetchAllCollections = async () => {
      setIsLoading(true);
      try {
        const response = await api.get(endpointUrl);
        const data = response.data.results || response.data || [];
        setAllCollections(data);
      } catch (error) {
        console.error(`Falha ao buscar coleções de ${endpointUrl}:`, error);
        setAllCollections([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAllCollections();
  }, [endpointUrl]);

  const handleFavoriteToggleInGrid = async (collectionId) => {
    try {
      await api.post(`/collections/${collectionId}/favorite/`);
      
      if (typeof onFavoriteToggle === 'function') {
        onFavoriteToggle(collectionId);
      } else {
        setAllCollections(prev =>
          prev.map(c => 
            c.id === collectionId ? { ...c, is_favorited: !c.is_favorited } : c
          )
        );
      }
    } catch (error) {
      console.error('Falha ao favoritar:', error);
      alert('Ocorreu um erro ao favoritar a coleção.');
    }
  };
  
  const filteredAndPaginatedCollections = useMemo(() => {
    const filtered = allCollections.filter(c =>
      c.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filtered.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [allCollections, searchTerm, currentPage]);

  const totalFilteredItems = useMemo(() => {
    return allCollections.filter(c => c.title.toLowerCase().includes(searchTerm.toLowerCase())).length;
  }, [allCollections, searchTerm]);

  useEffect(() => { setCurrentPage(1); }, [searchTerm]);

  return (
    <div>
      <div className="mb-8">
        <input
          type="text"
          placeholder="Pesquisar por título..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full bg-white dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-700 rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      
      {isLoading ? (
        <p className="text-center text-gray-500 dark:text-gray-400">Carregando...</p>
      ) : (
        <>
          {filteredAndPaginatedCollections.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredAndPaginatedCollections.map(collection => (
                <CollectionCard
                  key={collection.id}
                  collection={collection}
                  isOwnerView={isOwnerView}
                  isFavoriteView={isFavoriteView}
                  onDelete={onDelete}
                  onFavoriteToggle={handleFavoriteToggleInGrid}
                />
              ))}
            </div>
          ) : (
            emptyState
          )}
          
          <Pagination 
            currentPage={currentPage}
            totalItems={totalFilteredItems}
            itemsPerPage={ITEMS_PER_PAGE}
            onPageChange={setCurrentPage}
          />
        </>
      )}
    </div>
  );
};

export default CollectionGrid;