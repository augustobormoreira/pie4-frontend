import React, { useState, useContext } from 'react';
import { NavLink } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import ThemeToggle from './ThemeToggle';
import { FiGrid, FiCompass, FiPlusSquare, FiLogIn, FiUserPlus, FiLogOut, FiMenu, FiX, FiSettings } from 'react-icons/fi';

const Navbar = () => {
  const { user, logoutUser } = useContext(AuthContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const getNavLinkClass = ({ isActive }) => {
    const baseClasses = 'flex items-center space-x-2 hover:text-blue-400 transition-colors py-2 px-3 rounded-md';
    const activeClasses = 'text-blue-400 bg-gray-100 dark:bg-gray-700 font-bold';
    return isActive ? `${baseClasses} ${activeClasses}` : baseClasses;
  };

  const NavLinks = ({ mobile = false }) => (
    <>
    
      <NavLink to="/dashboard" className={getNavLinkClass} onClick={() => mobile && setIsMenuOpen(false)}>
        <FiGrid />
        <span>Minhas Coleções</span>
      </NavLink>
      <NavLink to="/discover" className={getNavLinkClass} onClick={() => mobile && setIsMenuOpen(false)}>
        <FiCompass />
        <span>Descobrir</span>
      </NavLink>
      <NavLink
        to="/collections/new"
        className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg text-sm"
        onClick={() => mobile && setIsMenuOpen(false)}
      >
        <FiPlusSquare />
        <span>Criar FlashCards</span>
      </NavLink>
    </>
  );

  return (
    <nav className="bg-white dark:bg-gray-800 bg-gray-800 text-gray-800 dark:text-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 h-16 flex justify-between items-center">

        <NavLink to="/" className="text-2xl font-bold hover:text-blue-400">
          KHAVA
        </NavLink>

        <div className="hidden md:flex items-center space-x-4">
          {user ? (
            <>
              <NavLinks />
              <ThemeToggle />
              <NavLink to="/settings" className={getNavLinkClass} onClick={() => mobile && setIsMenuOpen(false)}>
                <FiSettings />
              </NavLink>
              <button onClick={logoutUser} className="flex items-center space-x-2 text-gray-500 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-500 font-semibold py-2 px-3 rounded-lg text-sm transition-colors">
                <FiLogOut />
                <span>Sair</span>
              </button>
            </>
          ) : (
            <div className="flex items-center space-x-4">
              <ThemeToggle />
              <NavLink to="/login" className={getNavLinkClass}><FiLogIn /><span>Login</span></NavLink>
              <NavLink to="/register" className="flex items-center space-x-2 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg text-sm"><FiUserPlus /><span>Registrar</span></NavLink>
            </div>
          )}
        </div>

        {user && (
          <div className="md:hidden flex items-center">
             <ThemeToggle />
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="ml-4">
              {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>
        )}
      </div>

      {isMenuOpen && user && (
        <div className="md:hidden bg-white dark:bg-gray-800 absolute w-full left-0 shadow-lg">
          <div className="flex flex-col items-center space-y-4 py-4 border-t border-gray-200 dark:border-gray-700">
            <NavLinks mobile={true} />
            <button onClick={logoutUser} className="flex items-center space-x-2 text-gray-500 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-500 font-semibold py-2 px-3 rounded-lg text-sm transition-colors">
              <FiLogOut />
              <span>Sair</span>
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;