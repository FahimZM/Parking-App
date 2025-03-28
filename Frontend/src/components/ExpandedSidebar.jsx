import React, { useEffect, useState } from 'react';
import axios from 'axios';
import InfoCard from './InfoCard';

const ExpandedSidebar = ({ setPosition, searchQuery, setSearchQuery, suggestions, handleSuggestionClick, handleMenuClick, toggleDarkMode, isDarkMode }) => {
    return (
        <div className={`fixed top-5 bottom-5 left-5 h-[95%] w-[30%] bg-white shadow-lg p-5 rounded-xl z-10 border-2 transition-all duration-200
        ${isDarkMode ? 'bg-gray-900 border-white' : 'bg-white border-[#1C293D]'
            }`}>
        <div className='flex items-center justify-between w-full p-2'>
          <div className='flex space-x-4'>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke={isDarkMode ? 'white' : '#1C293D'} className="size-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
            </svg>

            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke={isDarkMode ? 'white' : '#1C293D'} className="size-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0" />
            </svg>

            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke={isDarkMode ? 'white' : '#1C293D'} className="size-6 cursor-pointer" onClick={toggleDarkMode}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z" />
            </svg>

          </div>

          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke={isDarkMode ? 'white' : '#1C293D'} className="size-6 cursor-pointer" onClick={handleMenuClick}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
          </svg>
        </div>

        <div className="h-[93%] flex flex-col">

        <h1 className={`text-2xl font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-[#1C293D]'}`}>Parker</h1>

        <hr className={`border-t-2 border-gray-300 my-4 mx-auto w-5/6  ${isDarkMode ? 'border-white' : 'border-[#1C293D]'}`} />

        <h2 className={`text-lg font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-[#1C293D]'}`}>Search Locations</h2>
        <input 
          type="text"
          placeholder="Search for a place"
          className={`w-full p-2 border rounded-md focus:outline-none focus:ring-2 ${
            isDarkMode ? 'bg-[#1E1E1E] text-white border-white focus:ring-white' : 'bg-white text-[#1C293D] border-[#1C293D] focus:ring-[#1C293D]'
            }`}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        {suggestions.length > 0 && (
          <ul className="bg-white shadow-md mt-2 max-h-48 overflow-auto text-gray-800">
            {suggestions.map((suggestion, index) => (
              <li
                key={index}
                className="p-2 cursor-pointer hover:bg-gray-200"
                onClick={() => handleSuggestionClick(suggestion.lat, suggestion.lon)}
              >
                {suggestion.display_name}
              </li>
            ))}
          </ul>
        )}

        <div className="flex-1 overflow-auto mt-5">
            <InfoCard name="test" location="LA" isDarkMode={isDarkMode}/>
            <InfoCard name="test" location="LA" isDarkMode={isDarkMode}/>
            <InfoCard name="test" location="LA" isDarkMode={isDarkMode}/>
            <InfoCard name="test" location="LA" isDarkMode={isDarkMode}/>
            <InfoCard name="test" location="LA" isDarkMode={isDarkMode}/>
            
        </div>
        </div>
      </div>
    )
}

export default ExpandedSidebar