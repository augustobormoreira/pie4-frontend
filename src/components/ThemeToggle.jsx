import React, { useContext } from 'react';
import { FiSun, FiMoon } from 'react-icons/fi';
import { ThemeContext } from '../context/ThemeContext';

const ThemeToggle = () => {
    const { theme, toggleTheme } = useContext(ThemeContext);

    return (
        <button
            onClick={toggleTheme}
            className="p-2 rounded-full 
                       bg-gray-200 text-gray-800 hover:bg-gray-300 
                       dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600 
                       transition-colors"
            aria-label="Alternar tema"
        >
            {theme === 'light' ? <FiMoon size={18} /> : <FiSun size={18} />}
        </button>
    );
};

export default ThemeToggle;