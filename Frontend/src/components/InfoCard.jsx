import React from 'react'

const InfoCard = ({name, location, isDarkMode}) => {
  return (
    <div className={`p-4 rounded-lg shadow-md border border-gray-300 dark:border-gray-600
    ${isDarkMode ? 'bg-[#1E1E1E] border-white' : 'bg-white border-[#1C293D]'
            }`}>
      <h3 className="font-semibold text-lg">{name}</h3>
      <p className="text-sm">{location}</p>
    </div>
  )
}

export default InfoCard