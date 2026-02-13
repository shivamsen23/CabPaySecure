import { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet-routing-machine';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';

const LivelineTracking = ({ pickupLat, pickupLng, dropLat, dropLng, captainLocation }) => {
    const mapRef = useRef(null);
    const mapInstance = useRef(null);
    const routingControl = useRef(null);
    const captainMarker = useRef(null);

    useEffect(() => {
        // Initialize map only once
        if (!mapInstance.current) {
            mapInstance.current = L.map(mapRef.current).setView(
                [pickupLat, pickupLng],
                13
            );

            // Add tile layer (map background)
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '© OpenStreetMap contributors',
                maxZoom: 19
            }).addTo(mapInstance.current);

            // Add pickup marker (green)
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
                .bindPopup('Pickup Location')
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

            // Add route (line from pickup to destination)
            routingControl.current = L.Routing.control({
                waypoints: [
                    L.latLng(pickupLat, pickupLng),
                    L.latLng(dropLat, dropLng)
                ],
                lineOptions: {
                    styles: [
                        {
                            color: '#4F46E5', // Indigo blue like Uber
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

            console.log('✅ Route line added to user map');
        }

        // Update captain marker in real-time
        if (captainLocation?.lat && captainLocation?.lng) {
            if (captainMarker.current) {
                captainMarker.current.setLatLng([captainLocation.lat, captainLocation.lng]);
            } else {
                // Create captain marker (blue)
                captainMarker.current = L.marker(
                    [captainLocation.lat, captainLocation.lng],
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
                    .bindPopup('Captain Location');

                console.log('✅ Captain marker added');
            }

            // Animate map to show all markers
            mapInstance.current.fitBounds([
                [pickupLat, pickupLng],
                [dropLat, dropLng],
                [captainLocation.lat, captainLocation.lng]
            ]);
        }

        return () => {
            // Don't destroy map on unmount - just cleanup if needed
        };

    }, [pickupLat, pickupLng, dropLat, dropLng, captainLocation]);

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

export default LivelineTracking;