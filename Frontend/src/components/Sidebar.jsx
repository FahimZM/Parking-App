import React, { useEffect, useState } from 'react';
import axios from 'axios';
import MiniSidebar from './MiniSidebar';
import ExpandedSidebar from './ExpandedSidebar';

const Sidebar = ({ setPosition, position, isDarkMode, setIsDarkMode }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [isMinimized, setIsMinimized] = useState(false);

  const fetchSuggestions = async (query) => {
    if (query) {
      const url = `https://nominatim.openstreetmap.org/search?format=json&q=${query}&addressdetails=1&limit=5`;
      try {
        const res = await axios.get(url);
        setSuggestions(res.data);
      } catch (error) {
        console.error('Error fetching suggestions: ', error);
      }
    } else {
      setSuggestions([]);
    }
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      fetchSuggestions(searchQuery);
    }, 300);
    return () => clearTimeout(timeoutId);
  }, [searchQuery]);

  const handleSuggestionClick = (lat, lon) => {
    setPosition([lat, lon]);
    setSuggestions([]);
    setSearchQuery('');
  };

  const handleMenuClick =() => {
    setIsMinimized((prev) => !prev)
  }

  const toggleDarkMode = () => {
    setIsDarkMode((prev) => !prev);
};

  return (
    <div>

    {isMinimized ? (

      <MiniSidebar 
      handleMenuClick={handleMenuClick}
      toggleDarkMode={toggleDarkMode}
      isDarkMode={isDarkMode}
      />
    ) : (

      <ExpandedSidebar
      setPosition={setPosition}
      position = {position}
      searchQuery={searchQuery}
      setSearchQuery={setSearchQuery}
      suggestions={suggestions}
      handleSuggestionClick={handleSuggestionClick}
      handleMenuClick={handleMenuClick}
      toggleDarkMode={toggleDarkMode}
      isDarkMode={isDarkMode}
      />
      )}
      
    </div>
  );
};

export default Sidebar;
