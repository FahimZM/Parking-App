import React, { useEffect, useState } from 'react';
import axios from 'axios';
import InfoCard from './InfoCard';

const ExpandedSidebar = ({ setPosition, position, searchQuery, setSearchQuery, suggestions, handleSuggestionClick, handleMenuClick, toggleDarkMode, isDarkMode, parkingSpots, setParkingSpots  }) => {
  
    return (
        <div className={`fixed top-5 bottom-5 left-5 h-[95%] w-[30%] bg-white shadow-lg p-5 rounded-xl z-10 border-2 transition-all duration-200 dark:bg-[#1E1E1E] dark:border-white`}>
        <div className='flex items-center justify-between w-full p-2'>
          <div className='flex space-x-4'>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 cursor-pointer" onClick={toggleDarkMode}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z" />
            </svg>

          </div>

          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 cursor-pointer" onClick={handleMenuClick}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
          </svg>
        </div>

        <div className="h-[93%] flex flex-col">

        <h1 className={`text-2xl font-bold mb-2 text-black dark:text-white`}>Parker</h1>

        <hr className={`border-t-2 border-gray-300 my-4 mx-auto w-5/6 dark:border-white`} />
        <input 
          type="text"
          placeholder="Search for a place"
          className={`p-4 rounded-lg shadow-md border bg-white dark:bg-[#1E1E1E] text-black dark:text-white border-gray-300 dark:border-white
    `}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        <div className="relative">
          {suggestions.length > 0 && (
            <ul className="absolute top-full left-0 w-full bg-white rounded-md shadow-md mt-2 max-h-48 overflow-auto text-gray-800 dark:bg-[#1E1E1E] dark:text-white">
              {suggestions.map((suggestion, index) => (
                <li
                  key={index}
                  className="p-2 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700"
                  onClick={() => handleSuggestionClick(suggestion.lat, suggestion.lon)}
                >
                  {suggestion.display_name}
                </li>
              ))}
            </ul>
          )}
      </div>

        <div className="flex-1 overflow-auto mt-5">
            <InfoCard index = "0" location ={position} isDarkMode={isDarkMode} parkingSpots={parkingSpots} setParkingSpots={setParkingSpots}/>
            <InfoCard index = "1" location ={position} isDarkMode={isDarkMode} parkingSpots={parkingSpots} setParkingSpots={setParkingSpots}/>
            <InfoCard index = "2" location ={position} isDarkMode={isDarkMode} parkingSpots={parkingSpots} setParkingSpots={setParkingSpots}/>
            <InfoCard index = "3" location ={position} isDarkMode={isDarkMode} parkingSpots={parkingSpots} setParkingSpots={setParkingSpots}/>

        </div>
        </div>
      </div>
    )
}

export default ExpandedSidebar