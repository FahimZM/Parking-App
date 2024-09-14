import React, { useEffect, useState } from 'react';
import Draggable from 'react-draggable';
import Map from './Map';
import axios from 'axios';

const CenteredCard = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [position, setPosition] = useState([51.505, -0.09]);

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

  // Update suggestions while typing
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      fetchSuggestions(searchQuery);
    }, 300); // Delay for user input throttling
    return () => clearTimeout(timeoutId); // Clear timeout on cleanup
  }, [searchQuery]);

  // Function to handle the selection of a suggestion
  const handleSuggestionClick = (lat, lon) => {
    setPosition([lat, lon]);
    setSuggestions([]);
    setSearchQuery(''); // Clear search box after selection
  };


  return (
    <div className="flex items-center justify-center min-h-screen overflow-hidden">
      

        <div className="hidden md:block">
            <div className="card bg-white shadow-lg rounded-xl p-5">
                {/* Inner box */}
                    <Map position={position}/>

                    <div className="absolute top-12 left-1/3 z-10">
                      <input
                        type="text"
                        placeholder="Search for a place"
                        className="input input-bordered w-[160%] bg-white text-black rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />

                      {suggestions.length > 0 && (
                        <ul className="bg-white w-64 shadow-lg absolute top-full left-0 mt-1 max-h-48 overflow-auto z-20 w-[160%] text-info">
                          {suggestions.map((suggestion, index) => (
                            <li
                              key={index}
                              className="p-2 cursor-pointer hover:bg-gray-200"
                              onClick={() =>
                                handleSuggestionClick(suggestion.lat, suggestion.lon)
                              }
                            >
                              {suggestion.display_name}
                            </li>
                          ))}
                        </ul>
                      )}
                  </div>
                
            </div>
        </div>

        {/* Mobile Design */}
        <div className="block md:hidden">
            {/* <div className='card bg-white shadow-lg rounded-xl min-h-screen'>
                
            </div> */}
            {/* <Draggable axis="y" bounds="parent">
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-12 h-2 bg-gray-300 rounded-full shadow-md cursor-pointer">
              <p className="text-xs text-gray-700 text-center">Pull</p>
            </div>
          </Draggable> */}
        </div>
      
      </div>
  );
};

export default CenteredCard;
