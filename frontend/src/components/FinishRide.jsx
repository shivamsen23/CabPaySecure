import React from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const FinishRide = (props) => {

    const navigate = useNavigate()

    async function endRide() {

        try {

            const response = await axios.post(
                `${import.meta.env.VITE_BASE_URL}/rides/end-ride`,
                {
                    rideId: props.ride._id
                },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                }
            )

            console.log("END RIDE RESPONSE:", response.data)

            // ✅ Don't depend on exact status number
            if (response.data) {

                props.setFinishRidePanel(false)

                // small delay for smooth animation
                setTimeout(() => {
                    navigate('/captain-home')
                }, 300)
            }

        } catch (err) {
            console.log("❌ END RIDE ERROR:", err?.response?.data || err.message)
            alert("Ride finish failed")
        }
    }

    return (
        <div>
            <h5 className='p-1 text-center w-[93%] absolute top-0'
                onClick={() => props.setFinishRidePanel(false)}>
                <i className="text-3xl text-gray-200 ri-arrow-down-wide-line"></i>
            </h5>

            <h3 className='text-2xl font-semibold mb-5'>Finish this Ride</h3>

            <div className='flex items-center justify-between p-4 border-2 border-yellow-400 rounded-lg mt-4'>
                <div className='flex items-center gap-3'>
                    <img
                        className='h-12 rounded-full object-cover w-12'
                        src="https://i.pinimg.com/236x/af/26/28/af26280b0ca305be47df0b799ed1b12b.jpg"
                        alt=""
                    />
                    <h2 className='text-lg font-medium'>
                        {props.ride?.user.fullname.firstname}
                    </h2>
                </div>
                <h5 className='text-lg font-semibold'>2.2 KM</h5>
            </div>

            <div className='mt-10 w-full'>
                <button
                    onClick={endRide}
                    className='w-full mt-5 flex text-lg justify-center bg-green-600 text-white font-semibold p-3 rounded-lg'
                >
                    Finish Ride
                </button>
            </div>
        </div>
    )
}

export default FinishRide