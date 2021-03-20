import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import RideData from '../../Data/RideData.json'

const BookRide = () => {

    const { vehicleType } = useParams()
    const [rideData, setRideData] = useState({})

    useEffect(() =>
        // fetch(`../../Data/RideData.json`)
        //     .then(res => res.json())
        //     .then(data => setRideData(data))
        setRideData(RideData)
        , [])
    // const car = rideData.vehicleType
    console.log(rideData.vehicleType);
    return (
        <div>
            <h1>success, you {vehicleType} got to google</h1>
            {
                rideData.vehicleType
            }

        </div>
    );
};

export default BookRide;