import React from 'react';

const RidePopUp = (props) => {
    return (
        <div onClick={() => props.setRidePopupPanel(false)}>
            <h5 
                className='p-3 text-center absolute w-[93%] top-0' 
                onClick={(e) => {
                    e.stopPropagation();
                }}
            >
                <i className="text-3xl text-gray-200 ri-arrow-down-wide-line"></i>
            </h5>

            <h3 className='text-2xl font-semibold mb-5'>New Ride Available</h3>

            {props.ride ? (
                <div className='flex items-center justify-between p-3 bg-yellow-400 rounded-lg mb-2'>
                    <div className='flex items-center gap-3'>
                        <img
                            className='h-10 w-10 rounded-full object-cover'
                            src="./assets/user.png"
                            alt="user"
                        />
                        <h2 className='text-lg font-medium'>
                          {`${props.ride?.user?.fullname?.firstname || ""} ${props.ride?.user?.fullname?.lastname || ""}`}
                        </h2>
                    </div>
                </div>
            ) : (
                <p>Loading ride details...</p>
            )}

            <div className='flex gap-2 justify-between flex-col items-center'>
                <div className='w-full mt-5'>
                    <div className='flex items-center gap-5 p-3 border-b-2'>
                        <i className="ri-map-pin-user-fill"></i>
                        <div>
                            <h3 className='text-sm font-medium'>
                                {props.ride?.pickup}
                            </h3>
                        </div>
                    </div>

                    <div className='flex items-center gap-5 p-3 border-b-2'>
                        <i className="text-lg ri-map-pin-2-fill"></i>
                        <div>
                            <h3 className='text-sm font-medium'>
                                {props.ride?.destination}
                            </h3>
                        </div>
                    </div>

                    <div className='flex items-center gap-5 p-3'>
                        <i className="ri-currency-line"></i>
                        <div>
                            <h3 className='text-lg font-medium'>
                                ₹{props.ride?.fare}
                            </h3>
                        </div>
                    </div>
                </div>

                <div className='flex gap-3 justify-center w-full mt-5'>
                    <button
                        onClick={() => props.setRidePopupPanel(false)}
                        className='bg-gray-300 text-gray-800 font-semibold p-3 px-10 rounded-lg w-1/2'
                    >
                        Ignore
                    </button>

                    <button
                        onClick={props.confirmRide}
                        className='bg-green-600 text-white font-semibold p-3 px-10 rounded-lg w-1/2'
                    >
                        Accept
                    </button>
                </div>
            </div>
        </div>
    );
};

export default RidePopUp;