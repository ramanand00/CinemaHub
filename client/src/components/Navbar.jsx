import React, { useState } from 'react';
import { FaSearch, FaFilm, FaBars } from 'react-icons/fa';

const Navbar = ({ onSearch, onMenuClick }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onSearch(searchQuery);
      setSearchQuery('');
    }
  };

  return (
    <nav className="sticky top-0 z-50 bg-youtube-dark border-b border-youtube-gray px-4 py-3">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        {/* Left Section: Logo and Menu */}
        <div className="flex items-center space-x-4">
          <button
            onClick={onMenuClick}
            className="p-2 rounded-full hover:bg-youtube-gray transition-colors"
            aria-label="Toggle menu"
          >
            <FaBars className="text-xl" />
          </button>
          
          <div className="flex items-center space-x-2">
            <FaFilm className="text-youtube-red text-2xl" />
            <span className="text-xl font-bold">CinemaHub</span>
          </div>
        </div>

        {/* Center Section: Search Bar */}
        <div className="flex-1 max-w-2xl mx-4">
          <form onSubmit={handleSearch} className="relative">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search movies..."
                className="w-full bg-youtube-gray text-white px-4 py-2 pl-10 rounded-full focus:outline-none focus:ring-2 focus:ring-youtube-red focus:border-transparent"
              />
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
            <button
              type="submit"
              className="absolute right-0 top-0 h-full px-6 bg-youtube-lightGray rounded-r-full hover:bg-gray-600 transition-colors"
            >
              Search
            </button>
          </form>
        </div>

        {/* Right Section: User Profile */}
        <div className="flex items-center space-x-4">
          <div className="w-8 h-8 bg-youtube-red rounded-full flex items-center justify-center">
            <span className="font-semibold">U</span>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;