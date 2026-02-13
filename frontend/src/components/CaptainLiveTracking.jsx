import { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet-routing-machine';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';

const CaptainLiveTracking = ({ pickupLat, pickupLng, dropLat, dropLng, userLocation }) => {
    const mapRef = useRef(null);
    const mapInstance = useRef(null);
    const routingControl = useRef(null);
    const userMarker = useRef(null);

    useEffect(() => {
        // Initialize map only once
        if (!mapInstance.current) {
            // Start from captain's current location if available
            const startLat = pickupLat || 26.8614;
            const startLng = pickupLng || 75.8160;

            mapInstance.current = L.map(mapRef.current).setView(
                [startLat, startLng],
                13
            );

            // Add tile layer
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '© OpenStreetMap contributors',
                maxZoom: 19
            }).addTo(mapInstance.current);

            // Add pickup marker (green) - User location
            L.marker([pickupLat, pickupLng], {
                icon: L.icon({
                    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
                    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
                    iconSize: [25, 41],
                    iconAnchor: [12, 41],
                    popupAnchor: [1, -34],
                    shadowSize: [41, 41]
                })
            })
                .addTo(mapInstance.current)
                .bindPopup('User Pickup Location')
                .openPopup();

            // Add destination marker (red)
            L.marker([dropLat, dropLng], {
                icon: L.icon({
                    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
                    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
                    iconSize: [25, 41],
                    iconAnchor: [12, 41],
                    popupAnchor: [1, -34],
                    shadowSize: [41, 41]
                })
            })
                .addTo(mapInstance.current)
                .bindPopup('Destination');

            // Add route line
            routingControl.current = L.Routing.control({
                waypoints: [
                    L.latLng(pickupLat, pickupLng),
                    L.latLng(dropLat, dropLng)
                ],
                lineOptions: {
                    styles: [
                        {
                            color: '#4F46E5', // Indigo blue
                            opacity: 0.8,
                            weight: 5,
                            lineCap: 'round',
                            lineJoin: 'round'
                        }
                    ]
                },
                routeWhileDragging: false,
                addWaypoints: false,
                draggableWaypoints: false,
                fitSelectedRoutes: true,
                showAlternatives: false,
                router: L.Routing.osrmv1({
                    serviceUrl: 'https://router.project-osrm.org/route/v1'
                })
            }).addTo(mapInstance.current);

            console.log('✅ Route line added to captain map');
        }

        // Update user marker in real-time (captain perspective)
        if (userLocation?.lat && userLocation?.lng) {
            if (userMarker.current) {
                userMarker.current.setLatLng([userLocation.lat, userLocation.lng]);
            } else {
                userMarker.current = L.marker(
                    [userLocation.lat, userLocation.lng],
                    {
                        icon: L.icon({
                            iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
                            shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
                            iconSize: [25, 41],
                            iconAnchor: [12, 41],
                            popupAnchor: [1, -34],
                            shadowSize: [41, 41]
                        })
                    }
                )
                    .addTo(mapInstance.current)
                    .bindPopup('User Location');

                console.log('✅ User marker added on captain map');
            }
        }

        return () => {
            // Cleanup if needed
        };

    }, [pickupLat, pickupLng, dropLat, dropLng, userLocation]);

    return (
        <div
            ref={mapRef}
            style={{
                height: '100%',
                width: '100%',
                borderRadius: '10px'
            }}
        />
    );
};

export default CaptainLiveTracking;