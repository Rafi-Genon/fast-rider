import React, { useContext, useEffect, useState } from 'react';
import { Link, useHistory } from "react-router-dom";
import { fullContext } from '../../App'
import RideData from '../../Data/RideData.json'
const Home = () => {
    const history = useHistory()
    const [newAccount, setNewAccount] = useContext(fullContext)
    const [rideData, setRideData] = useState({})
    useEffect(() =>
        setRideData(RideData)
        , [])
    // const .vehicleCard = rideData.vehicleCard
    console.log(rideData)
    return (
        <div style={{ textAlign: 'center' }}>
            <p><Link to="/book">Book car</Link></p>
            {/* <h1 style={{ color: 'red' }}>I am the best developer. I do everythig however it difficult</h1>
            <p>name: {newAccount.name}</p>
            <p>email: {newAccount.email}</p>
            <p>password: {newAccount.password}</p>
            <p>confirm-password: {newAccount.confirmPassword}</p>
            <img src={newAccount.photo} alt="" /> */}
            {
                // rideData.map(vehicle => <img src={vehicle.image} alt="img" onClick={() => history.push(`/book/${vehicle.type}`)}></img>)
            }
            {/* <p>{rideData.vehicleCard[1].type}</p> 
            <img src={rideData.vehicleCard[1].image} alt=""/> */}
            {/* <img src="../../Data/Images/Bus.png" alt=""/> */}

            <p>alredy have account go to <Link to="/log-in">Log in</Link> </p>
            <p>Don't have account go to <Link to="/create-account">Create account</Link> </p>
        </div>
    );
};

export default Home;