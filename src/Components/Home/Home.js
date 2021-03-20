import React, { useContext, useEffect, useState } from 'react';
import { Link, useHistory } from "react-router-dom";
import { fullContext } from '../../App'
import RideData from '../../Data/RideData.json'
import Navbar from '../NavBar/Navbar';
import './Home.css'
const Home = () => {
    const history = useHistory()
    const [newAccount, setNewAccount] = useContext(fullContext)
    const [rideData, setRideData] = useState([])
    useEffect(() =>
        setRideData(RideData)
        , [])

    const selectedVehicle = (vehicle) => {
        const newUserInfo = { ...newAccount, vehicle }
        setNewAccount(newUserInfo)
        history.push(`/book/${vehicle.type}`)
    }
    console.log(newAccount)
    return (
        <div className="background">
            <Navbar></Navbar>
            <div className="container home-section">
                <div className="row">
                    {
                        rideData.map(vehicle =>
                            <div className="clo-sm-12 col-md-6 col-lg-3">
                                <div className="vehicle-card m-3 shadow" >
                                    <img style={{ width: '100%' }} src={vehicle.image} alt="img" onClick={() => selectedVehicle(vehicle)}></img>
                                    <p className="m-4" style={{ textAlign: 'center', fontWeight: 'bold' }}>{vehicle.type}</p>
                                </div>
                            </div>)
                    }
                </div>
            </div>

            {/* <p>alredy have account go to <Link to="/log-in">Log in</Link> </p>
            <p>Don't have account go to <Link to="/create-account">Create account</Link> </p> */}
        </div>
    );
};

export default Home;