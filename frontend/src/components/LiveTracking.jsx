import React, { useState, useEffect } from 'react'
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api'

const containerStyle = {
    width: '100%',
    height: '100%',
}

const defaultCenter = {
    lat: 28.6139,   // safer default (Delhi)
    lng: 77.2090,
}

const LiveTracking = () => {

    const [currentPosition, setCurrentPosition] = useState(defaultCenter)

    // ✅ Proper way to load Google Maps
    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY
    })

    useEffect(() => {

        if (!navigator.geolocation) {
            console.log("Geolocation not supported")
            return
        }

        // ✅ Only ONE tracker needed
        const watchId = navigator.geolocation.watchPosition(
            (position) => {

                const { latitude, longitude } = position.coords

                console.log('📍 Position updated:', latitude, longitude)

                setCurrentPosition({
                    lat: latitude,
                    lng: longitude
                })
            },
            (error) => {
                console.log("❌ Location error:", error)
            },
            {
                enableHighAccuracy: true,
                maximumAge: 0,
                timeout: 5000
            }
        )

        // ✅ Cleanup
        return () => navigator.geolocation.clearWatch(watchId)

    }, [])

    // Prevent map render before script loads
    if (!isLoaded) return <div>Loading Map...</div>

    return (
        <GoogleMap
            mapContainerStyle={containerStyle}
            center={currentPosition}
            zoom={15}
        >
            <Marker position={currentPosition} />
        </GoogleMap>
    )
}

export default LiveTracking