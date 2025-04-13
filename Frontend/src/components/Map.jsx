import { MapContainer, Polygon, TileLayer, useMap, Marker, Popup } from 'react-leaflet';
import "leaflet/dist/leaflet.css";
import { useEffect, useState } from 'react';
import Papa from 'papaparse';
import parseWKT from '../helper/parse';

const Map = ({ position, isDarkMode, parkingSpots }) => {
  const [mapData, setMapData] = useState([]);

  useEffect(() => {
    Papa.parse('../../LA_Express_Park_Project_Area_20240915.csv', {
      header: true,
      download: true,
      complete: (result) => {
        const polygons = result.data.map((row) => ({
          coordinates: parseWKT(row.the_geom),
          area: row["Project Area"],
          status: row["Status"],
          spaces: row["Number On-Street Spaces"],
        }));
        setMapData(polygons);
      },
    });
  }, []);

  const ChangeMapView = ({ coords }) => {
    const map = useMap();
    map.setView(coords, 13);
    return null;
  };

  const lightModeTileLayer =
    "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
  const darkModeTileLayer =
    "https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png"; 

    const tileLayerURLs = {
      light: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      dark: "https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png",
    };
  

    const LA_BOUNDS = [
      [32.8000, -119.0000],
      [34.8233, -117.6465]  
    ];


  return (
    <div className="fixed top-0 left-0 w-screen h-screen z-0 m-0 p-0">
      <MapContainer center={position} zoom={13} className="w-full h-full">
        <TileLayer
          key={isDarkMode} 
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url={tileLayerURLs[isDarkMode] || tileLayerURLs.light}
        />
        {mapData.map((data, index) => (
          <Polygon key={index} positions={data.coordinates} />
        ))}

        <Marker position={position}>
          <Popup>
            Your Location
          </Popup>
        </Marker>

        {parkingSpots
          .filter(spot => spot && spot.latlng.latitude && spot.latlng.longitude)
          .slice(0, 4)
          .map((spot, index) => (
            <Marker
              key={index}
              position={[parseFloat(spot.latlng.latitude), parseFloat(spot.latlng.longitude)]}
            >
              <Popup>
                <strong>{spot.blockface}</strong>
                <h1>Rate: {spot.raterange}</h1>
                <h1>Time Limit: {spot.timelimit}</h1>
              </Popup>
            </Marker>
          ))}

        <ChangeMapView coords={position} />

      </MapContainer>
    </div>
  );
};

export default Map;
