import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import api from '../services/api';

const CollectionFormPage = () => {
  const { id } = useParams();
  const isEditMode = Boolean(id);
  const navigate = useNavigate();

  const [collectionData, setCollectionData] = useState({ title: '', description: '', is_public: false });
  const [cards, setCards] = useState([{ id: null, front: '', back: '' }]);
  const [isLoading, setIsLoading] = useState(isEditMode);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (isEditMode) {
      const fetchCollection = async () => {
        setIsLoading(true);
        try {
          const response = await api.get(`/collections/${id}/`);
          const { title, description, is_public, cards: fetchedCards } = response.data;
          setCollectionData({ title, description, is_public });
          const formattedCards = fetchedCards.map(c => ({ id: c.id, front: c.front, back: c.back }));
          setCards(formattedCards.length > 0 ? formattedCards : [{ id: null, front: '', back: '' }]);
        } catch (error) {
          console.error("Falha ao buscar dados para edição:", error);
          alert("Não foi possível carregar a coleção para edição.");
          navigate('/dashboard');
        } finally {
          setIsLoading(false);
        }
      };
      fetchCollection();
    }
  }, [id, isEditMode, navigate]);

  const handleCollectionChange = (e) => {
    const { name, value, type, checked } = e.target;
    setCollectionData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleCardChange = (index, e) => {
    const newCards = [...cards];
    newCards[index][e.target.name] = e.target.value;
    setCards(newCards);
  };

  const addCard = () => {
    setCards([...cards, { id: null, front: '', back: '' }]);
  };

  const removeCard = (index) => {
    if (cards.length <= 1) return;
    setCards(cards.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;

    if (!collectionData.title.trim()) {
      alert('Por favor, dê um título para a sua coleção.');
      return;
    }
    if (cards.some(card => !card.front.trim() || !card.back.trim())) {
      alert('Todos os campos de frente e verso dos cards devem ser preenchidos.');
      return;
    }

    setIsSubmitting(true);
    const payload = { ...collectionData, cards_data: cards };

    try {
      if (isEditMode) {
        await api.put(`/collections/${id}/`, payload);
        alert('Coleção atualizada com sucesso!');
      } else {
        await api.post('/collections/', payload);
        alert('Coleção criada com sucesso!');
      }
      navigate('/dashboard');
    } catch (error) {
      console.error("Falha ao salvar coleção:", error);
      alert('Ocorreu um erro ao salvar a coleção.');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-white">
        <Navbar />
        <p className="text-center mt-10">Carregando dados...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-white">
      <Navbar />
      <main className="container mx-auto p-6">
        <header className="mb-8">
          <h1 className="text-4xl font-bold">{isEditMode ? 'Editar Coleção' : 'Criar Nova Coleção'}</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">{isEditMode ? 'Altere os detalhes e flashcards da sua coleção.' : 'Preencha os detalhes e adicione seus flashcards.'}</p>
        </header>

        <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div>
              <label htmlFor="title" className="block text-lg font-semibold mb-2">Título da Coleção</label>
              <input type="text" name="title" id="title" value={collectionData.title} onChange={handleCollectionChange} className="w-full bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500" required />
            </div>
            <div>
              <label htmlFor="description" className="block text-lg font-semibold mb-2">Descrição (Opcional)</label>
              <input type="text" name="description" id="description" value={collectionData.description} onChange={handleCollectionChange} className="w-full bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
          </div>
          <div className="mb-8">
            <label className="flex items-center space-x-3 cursor-pointer">
              <input type="checkbox" name="is_public" checked={collectionData.is_public} onChange={handleCollectionChange} className="form-checkbox h-5 w-5 bg-gray-200 dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-blue-500 rounded focus:ring-blue-500" />
              <span className="text-lg">Tornar esta coleção pública?</span>
            </label>
          </div>

          {/* Cards Dinâmicos */}
          <h2 className="text-2xl font-bold mb-4 border-t border-gray-200 dark:border-gray-700 pt-6">Flashcards</h2>
          {cards.map((card, index) => (
            <div key={card.id || `new-${index}`} className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 p-4 border border-gray-200 dark:border-gray-700 rounded-lg relative">
              <div>
                <label className="block text-sm font-semibold mb-1">Frente</label>
                <textarea name="front" value={card.front} onChange={(e) => handleCardChange(index, e)} rows="3" className="w-full bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-blue-500" required></textarea>
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1">Verso</label>
                <textarea name="back" value={card.back} onChange={(e) => handleCardChange(index, e)} rows="3" className="w-full bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-blue-500" required></textarea>
              </div>
              {cards.length > 1 && (
                <button type="button" onClick={() => removeCard(index)} className="absolute -top-3 -right-3 bg-red-600 hover:bg-red-700 text-white rounded-full h-7 w-7 flex items-center justify-center font-bold text-lg leading-none">
                  &times;
                </button>
              )}
            </div>
          ))}

          <div className="flex items-center justify-between mt-8">
            <button type="button" onClick={addCard} className="bg-gray-600 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded-lg">
              + Adicionar Card
            </button>
            <button type="submit" disabled={isSubmitting} className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed">
              {isSubmitting ? 'Salvando...' : (isEditMode ? 'Salvar Alterações' : 'Salvar Coleção')}
            </button>
          </div>
        </form>
      </main>
    </div>
  );
};

export default CollectionFormPage;