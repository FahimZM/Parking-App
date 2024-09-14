import { MapContainer, TileLayer, useMap } from 'react-leaflet'
import "leaflet/dist/leaflet.css";


const Map = ({position}) => {
    const ChangeMapView = ({ coords }) => {
        const map = useMap();
        map.setView(coords, 13);
        return null;
      };

    return (
        <MapContainer 
            center={position} 
            zoom={13} 
            className="w-[145vh] h-[90vh] z-0 rounded-lg shadow-inner">
  
        <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <ChangeMapView coords={position} />
        </MapContainer>
    )
}

export default Map