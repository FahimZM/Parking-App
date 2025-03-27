import { MapContainer, Polygon, TileLayer, useMap } from 'react-leaflet';
import "leaflet/dist/leaflet.css";
import { useEffect, useState } from 'react';
import Papa from 'papaparse';
import parseWKT from '../helper/parse';

const Map = ({ position, isDarkMode }) => {
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

  return (
    <div className="fixed top-0 left-0 w-screen h-screen z-0 m-0 p-0">
      <MapContainer center={position} zoom={13} className="w-full h-full">
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url={isDarkMode ? darkModeTileLayer : lightModeTileLayer}
        />
        {mapData.map((data, index) => (
          <Polygon key={index} positions={data.coordinates} />
        ))}
        <ChangeMapView coords={position} />
      </MapContainer>
    </div>
  );
};

export default Map;
