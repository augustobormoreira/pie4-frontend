import React, { useState } from 'react';

const CustomFlashcard = ({ front, back }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div 
      className="w-full h-80 rounded-lg cursor-pointer perspective"
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <div 
        className={`relative w-full h-full duration-500 transform-style-3d ${isFlipped ? 'rotate-y-180' : ''}`}
      >
        <div className="absolute w-full h-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg flex flex-col items-center justify-center p-6 backface-hidden">
          <span className="absolute top-4 left-4 text-xs text-gray-400 dark:text-gray-500">Clique para virar</span>
          <p className="text-2xl text-center text-gray-800 dark:text-white">{front}</p>
        </div>

        <div className="absolute w-full h-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg flex flex-col items-center justify-center p-6 rotate-y-180 backface-hidden">
           <span className="absolute top-4 left-4 text-xs text-gray-400 dark:text-gray-500">Clique para virar</span>
           <p className="text-2xl text-center font-bold text-gray-900 dark:text-white">{back}</p>
        </div>
      </div>
    </div>
  );
};

export default CustomFlashcard;