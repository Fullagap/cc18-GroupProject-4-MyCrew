import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Circle, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Import marker icons
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';
import Clock from '../../components/user/Clock' ;

// Create custom icon for site locations
const siteIcon = new L.Icon({
    iconUrl: 'https://www.svgrepo.com/show/488306/office.svg',
    iconSize: [24, 24], // size of the icon
    iconAnchor: [16, 32], // point of the icon which will correspond to marker's location
    popupAnchor: [0, -32], // point from which the popup should open relative to the iconAnchor
});

// Fix default marker icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: markerIcon2x,
    iconUrl: markerIcon,
    shadowUrl: markerShadow,
});

// Component to auto-center map
function SetViewOnClick({ coords }) {
    const map = useMap();
    useEffect(() => {
        if (coords) {
            map.setView(coords, 15);
        }
    }, [coords, map]);
    return null;
}

const MapComponent = ({ 
    currentPosition,
    officeLocations = [],
    selectedOfficeId = null,
    onDistanceChange 
}) => {
    // Calculate distance between two points
    const calculateDistance = (point1, point2) => {
        if (!point1 || !point2) return null;
        return L.latLng(point1).distanceTo(point2);
    };
    
    

    useEffect(() => {
        if (currentPosition && selectedOfficeId) {
            const selectedOffice = officeLocations.find(office => office.id === selectedOfficeId);
            if (selectedOffice) {
                const distance = calculateDistance(
                    currentPosition,
                    [selectedOffice.latitude, selectedOffice.longitude]
                );
                const isWithinRadius = distance <= selectedOffice.area;
                onDistanceChange?.(distance, isWithinRadius, selectedOffice.area);
            }
        }
    }, [currentPosition, selectedOfficeId, officeLocations]);

    return (
        <div style={{ height: '300px', width: '100%' }}>
            <Clock/>
            <MapContainer 
                center={currentPosition || [13.7563, 100.5018]} 
                zoom={15} 
                style={{ height: '100%', width: '100%' }}
                scrollWheelZoom={false}
            >
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                
                {/* Current user position */}
                {currentPosition && (
                    <Marker position={currentPosition}>
                        <Popup>Your current location</Popup>
                    </Marker>
                )}

                {/* Office locations with radius circles */}
                {officeLocations.map((office) => (
                    <React.Fragment key={office.id}>
                        <Marker 
                            position={[office.latitude, office.longitude]}
                            icon={siteIcon}  // Use custom icon here
                        >
                            <Popup>
                                <strong>{office.siteName}</strong>
                                <br />
                                Allowed radius: {office.area}m
                            </Popup>
                        </Marker>
                        
                        {/* Radius circle */}
                        
                        {selectedOfficeId === office.id && (
                            <Circle
                                center={[office.latitude, office.longitude]}
                                radius={office.area}
                                pathOptions={{
                                    fillColor: '#4CAF50',
                                    fillOpacity: 0.2,
                                    color: '#4CAF50',
                                    weight: 1,
                                }}
                            />
                        )}
                    </React.Fragment>
                ))}

                <SetViewOnClick coords={currentPosition} />
            </MapContainer>
        </div>
    );
};

export default MapComponent;