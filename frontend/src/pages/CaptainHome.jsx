import React, { useRef, useState, useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'
import CaptainDetails from '../components/CaptainDetails'
import RidePopUp from '../components/RidePopUp'
import ConfirmRidePopUp from '../components/ConfirmRidePopUp'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { SocketContext } from '../context/SocketContext'
import { CaptainDataContext } from '../context/CapatainContext'
import axios from 'axios'
import LiveTracking from '../components/LiveTracking'

const CaptainHome = () => {

    const [ridePopupPanel, setRidePopupPanel] = useState(false)
    const [confirmRidePopupPanel, setConfirmRidePopupPanel] = useState(false)
    const [ride, setRide] = useState(null)

    const ridePopupPanelRef = useRef(null)
    const confirmRidePopupPanelRef = useRef(null)

    const { socket } = useContext(SocketContext)
    const { captain } = useContext(CaptainDataContext)

   
 useEffect(() => {

    if (!socket || !captain?._id) return;

    console.log("🟢 Captain socket ready:", captain._id)

    // JOIN ROOM
    socket.emit('join', {
        userId: captain._id,
        userType: 'captain'
    })

    // LOCATION UPDATE
    const updateLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(position => {

                socket.emit('update-location-captain', {
                    userId: captain._id,
                    location: {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude
                    }
                })
            })
        }
    }

    updateLocation()
    const locationInterval = setInterval(updateLocation, 10000)

    // ✅ IMPORTANT: REMOVE OLD LISTENER FIRST
    socket.off('new-ride')

    // ✅ LISTEN FOR NEW RIDE
    socket.on('new-ride', (data) => {

        console.log("🚖 NEW RIDE RECEIVED:", data)

        setRide(data)
        setRidePopupPanel(true)
    })

    return () => {
        clearInterval(locationInterval)
        socket.off('new-ride')
    }

}, [socket, captain?._id])

    // ================= CONFIRM RIDE =================
    async function confirmRide() {

        const response = await axios.post(
            `${import.meta.env.VITE_BASE_URL}/rides/confirm`,
            {
                rideId: ride._id,
                captainId: captain._id
            },
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            }
        )

        setRidePopupPanel(false)
        setConfirmRidePopupPanel(true)
    }

    // ================= GSAP ANIMATIONS =================

    useGSAP(() => {
        gsap.to(ridePopupPanelRef.current, {
            transform: ridePopupPanel ? 'translateY(0)' : 'translateY(100%)'
        })
    }, [ridePopupPanel])

    useGSAP(() => {
        gsap.to(confirmRidePopupPanelRef.current, {
            transform: confirmRidePopupPanel ? 'translateY(0)' : 'translateY(100%)'
        })
    }, [confirmRidePopupPanel])


    // ================= UI =================

    return (
        <div className='h-screen'>

            <div className='fixed p-2 top-0 flex items-center justify-between w-screen'>
                <img className='w-16' src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="" />
                <Link to='/captain-home' className='h-10 w-10 bg-white flex items-center justify-center rounded-full'>
                    <i className="text-lg font-medium ri-logout-box-r-line"></i>
                </Link>
            </div>

            <div className='h-3/5'>
              <LiveTracking/>
            </div>

            <div className='h-2/5 p-6'>
                <CaptainDetails />
            </div>

            {/* 🚖 RIDE POPUP */}
            <div ref={ridePopupPanelRef} className='fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-10 pt-12'>
                <RidePopUp
                    ride={ride}
                    setRidePopupPanel={setRidePopupPanel}
                    setConfirmRidePopupPanel={setConfirmRidePopupPanel}
                    confirmRide={confirmRide}
                />
            </div>

            {/* ✅ CONFIRM RIDE PANEL */}
            <div ref={confirmRidePopupPanelRef} className='fixed w-full h-screen z-10 bottom-0 translate-y-full bg-white px-3 py-10 pt-12'>
                <ConfirmRidePopUp
                    ride={ride}
                    setConfirmRidePopupPanel={setConfirmRidePopupPanel}
                    setRidePopupPanel={setRidePopupPanel}
                />
            </div>

        </div>
    )
}

export default CaptainHome