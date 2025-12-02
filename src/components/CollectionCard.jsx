import React from 'react';
import { Link } from 'react-router-dom';
import { FiEdit2, FiTrash2, FiUser, FiHeart, FiGlobe, FiBookmark, FiLock, FiX } from 'react-icons/fi';

const CollectionCard = ({ collection, isOwnerView = false, isFavoriteView = false, onDelete, onFavoriteToggle }) => {

  const handleDeleteClick = (e) => {
    e.stopPropagation();
    e.preventDefault();
    onDelete?.(collection.id);
  };

  const handleFavoriteToggleClick = (e) => {
    e.stopPropagation();
    e.preventDefault();
    onFavoriteToggle?.(collection.id);
  };

  return (
    <Link to={`/collections/${collection.id}/study`} className="block group h-full">
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-5 flex flex-col h-full shadow-md transition-all duration-300 hover:border-blue-500 hover:shadow-xl dark:hover:shadow-blue-500/10">
        
        <div className="flex-grow">
          <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2 transition-colors group-hover:text-blue-500 dark:group-hover:text-blue-400">{collection.title}</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-3">
            {collection.description || 'Esta coleção não possui uma descrição.'}
          </p>
        </div>
        
        <div className="mt-auto pt-4 border-t border-gray-200 dark:border-gray-700/50">
          {isOwnerView ? (
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-3">
                {/* --- INDICADOR VISUAL ESTÁTICO --- */}
                <span 
                  className={`flex items-center space-x-1.5 px-2 py-1 text-xs font-semibold rounded-full ${
                    collection.is_public 
                      ? 'bg-blue-100 dark:bg-blue-800 text-blue-800 dark:text-blue-300' 
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300'
                  }`}
                  title={collection.is_public ? "Esta coleção é pública" : "Esta coleção é privada"}
                >
                  {collection.is_public ? <FiGlobe size={14} /> : <FiLock size={14} />}
                  <span>{collection.is_public ? "Público" : "Privado"}</span>
                </span>
                <div className="flex items-center space-x-1 text-sm font-semibold text-gray-700 dark:text-gray-300" title={`${collection.favorites_count} favoritos`}>
                  <FiHeart className="text-pink-500" />
                  <span>{collection.favorites_count}</span>
                </div>
              </div>
              <div className="flex space-x-2">
                <Link to={`/collections/${collection.id}/edit`} onClick={(e) => e.stopPropagation()} className="text-gray-500 ..."><FiEdit2 /></Link>
                <button onClick={handleDeleteClick} className="text-gray-500 ..."><FiTrash2 /></button>
              </div>
            </div>
          ) : isFavoriteView ? (
            // MODO 2: Para "Coleções Salvas" (Favorito de outros)
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-2 text-xs text-gray-500"><FiUser/><span className="font-semibold text-gray-600 dark:text-gray-400">{collection.owner}</span></div>
              <button onClick={handleFavoriteToggleClick} className="flex items-center space-x-2 bg-gray-100 dark:bg-gray-700 hover:bg-red-100 dark:hover:bg-red-900/50 text-red-600 dark:text-red-400 font-semibold py-2 px-3 rounded-lg text-sm transition-colors" aria-label="Remover dos favoritos"><FiX /><span>Remover</span></button>
            </div>
          ) : (
            // MODO 3: Para "Descobrir" (Padrão)
            <div className="flex justify-between items-center">
               <div className="flex items-center space-x-2 text-xs text-gray-500"><FiUser/><span className="font-semibold text-gray-600 dark:text-gray-400">{collection.owner}</span></div>
              <button onClick={handleFavoriteToggleClick} aria-label="Favoritar coleção" className={`p-2 rounded-full transition-colors ${ collection.is_favorited ? 'bg-blue-100 text-blue-600 dark:bg-blue-800 dark:text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'}`}>
                <FiBookmark className={collection.is_favorited ? 'fill-current' : ''} />
              </button>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
};

export default CollectionCard;