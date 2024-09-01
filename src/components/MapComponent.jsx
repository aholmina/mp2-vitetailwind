import React, { useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

import iconUrl from 'leaflet/dist/images/marker-icon.png';
import iconRetinaUrl from 'leaflet/dist/images/marker-icon-2x.png';
import shadowUrl from 'leaflet/dist/images/marker-shadow.png';

// Fix for default marker icon
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl,
  iconRetinaUrl,
  shadowUrl,
});

const MapComponent = () => {
  const position = [14.4499, 120.9800]; // Coordinates for Las Pinas City
  const mapRef = useRef(null);

  useEffect(() => {
    if (mapRef.current) {
      const map = mapRef.current;
      
      // Remove existing attribution control
      map.eachLayer((layer) => {
        if (layer.getAttribution) {
          map.removeControl(map.attributionControl);
        }
      });

      // Add custom attribution control
      L.control.attribution({
        prefix: '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener noreferrer">OpenStreetMap</a> contributors'
      }).addTo(map);
    }
  }, []);

  return (
    <div className="w-full h-[300px]">
      <MapContainer 
        center={position} 
        zoom={13} 
        className="w-full h-full"
        ref={mapRef}
        attributionControl={false}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={position}>
          <Popup>
            Las Pinas City, Metro Manila, Philippines
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default MapComponent;