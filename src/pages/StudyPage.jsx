import React, { useState, useEffect, useCallback } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import api from '../services/api';
import CustomFlashcard from '../components/CustomFlashcard';

const StudyPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [collection, setCollection] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchCollection = async () => {
      setIsLoading(true);
      try {
        const response = await api.get(`/collections/${id}/`);
        setCollection(response.data);
      } catch (error) {
        console.error('Falha ao buscar a coleção', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchCollection();
  }, [id]);

  const goToNextCard = useCallback(() => {
    if (collection && currentIndex < collection.cards.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  }, [currentIndex, collection]);

  const goToPrevCard = useCallback(() => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  }, [currentIndex]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-white">
        <Navbar />
        <p className="text-center mt-10">Carregando coleção...</p>
      </div>
    );
  }

  const hasCards = collection && Array.isArray(collection.cards) && collection.cards.length > 0;
  const currentCard = hasCards ? collection.cards[currentIndex] : null;
  const progress = hasCards ? ((currentIndex + 1) / collection.cards.length) * 100 : 0;

  const isFirstCard = currentIndex === 0;
  const isLastCard = hasCards && currentIndex === collection.cards.length - 1;

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-white flex flex-col">
      <Navbar />
      <main className="container mx-auto p-6 flex-grow flex flex-col items-center">
        {hasCards ? (
          <>
            <div className="w-full max-w-4xl mb-8">
              <h2 className="text-2xl font-bold text-center mb-4">{collection.title}</h2>
              <div className="flex items-center space-x-4">
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                  <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${progress}%` }}></div>
                </div>
                <span className="font-semibold text-gray-600 dark:text-gray-300">{currentIndex + 1}/{collection.cards.length}</span>
              </div>
            </div>

            <div className="flex-grow flex flex-col items-center justify-center w-full">
              <div className="w-full max-w-2xl">
                <CustomFlashcard key={currentCard.id} front={currentCard.front} back={currentCard.back} />
              </div>

              <div className="flex justify-between w-full max-w-2xl mt-8">
                {!isFirstCard ? (
                  <button onClick={goToPrevCard} className="bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 font-bold py-2 px-6 rounded-lg">
                    Anterior
                  </button>
                ) : (
                  <div></div>
                )}

                {!isLastCard ? (
                  <button onClick={goToNextCard} className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg">
                    Próximo
                  </button>
                ) : (
                  <button
                    onClick={() => navigate(-1)}
                    className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-6 rounded-lg"
                  >
                    Concluir Sessão
                  </button>
                )}
              </div>
            </div>
          </>
        ) : (
          <div className="text-center mt-10">
            <p>Esta coleção não foi encontrada ou não possui cards.</p>
            <Link to="/dashboard" className="text-blue-500 hover:underline mt-4 inline-block">
              Voltar para Minhas Coleções
            </Link>
          </div>
        )}
      </main>
    </div>
  );
};

export default StudyPage;