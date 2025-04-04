import React, { useEffect, useState } from 'react';

const InfoCard = ({ index, location, isDarkMode }) => {
  const [parkingSpots, setParkingSpots] = useState([]);
  const [loading, setLoading] = useState(true); 

  const [lat, long] = location;

  const parkingInfo = async (lat, long) => {
    try {
      const response = await fetch(`http://localhost:3000/parking?lat=${lat}&long=${long}`);
      return await response.json();
    } catch (err) {
      console.error('Error fetching parking data:', err);
      return [];
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = await parkingInfo(lat, long);
      setParkingSpots(data);
      setLoading(false); 
    };

    fetchData();
  }, [lat, long]); 

  if (loading) {
    return <div className={`p-4 rounded-lg shadow-md border border-gray-300 dark:border-gray-600
    ${isDarkMode ? 'bg-[#1E1E1E] border-white' : 'bg-white border-[#1C293D]'
      }`}v>Loading parking spots...</div>; 
  }

  const spot = parkingSpots[index]; 

  if (!spot) {
    return <p>No parking spot found at index {index}.</p>;
  }

  return (
    <div
    className={`p-4 rounded-lg shadow-md border
      ${isDarkMode 
        ? 'bg-[#1E1E1E] border-white text-white' 
        : 'bg-white border-[#1C293D] text-black'
      }`}
  >
      <strong>{spot.blockface}</strong>

      <h1>Rate: {spot.raterange}</h1>
      <h1>Time Limit: {spot.timelimit}</h1>
    </div>
  )
}

export default InfoCard
