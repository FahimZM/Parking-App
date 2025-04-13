import React, { useEffect, useState } from 'react';
import axios from 'axios';
import MiniSidebar from './MiniSidebar';
import ExpandedSidebar from './ExpandedSidebar';

const Sidebar = ({ setPosition, position, isDarkMode, setIsDarkMode, parkingSpots, setParkingSpots }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [isMinimized, setIsMinimized] = useState(false);

  const fetchSuggestions = async (query) => {
    if (query) {
      const url = `https://nominatim.openstreetmap.org/search?format=json&q=${query}&addressdetails=1&limit=5&countrycodes=us&viewbox=-119.25,35.0,-117.5,33.5&bounded=1`;
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

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme") || "light";
    setIsDarkMode(storedTheme);
    document.documentElement.classList.toggle("dark", storedTheme === "dark");
  }, []);
  
  useEffect(() => {
    localStorage.setItem("theme", isDarkMode);
    document.documentElement.classList.toggle("dark", isDarkMode === "dark");
  }, [isDarkMode]);
  
  const toggleDarkMode = () => {
    setIsDarkMode((prev) => (prev === "dark" ? "light" : "dark"));
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
      parkingSpots={parkingSpots}
      setParkingSpots={setParkingSpots}
      />
      )}
      
    </div>
  );
};

export default Sidebar;
