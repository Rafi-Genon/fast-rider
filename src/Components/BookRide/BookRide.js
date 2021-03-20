import React, { useContext } from 'react';
import { useParams } from 'react-router';
import { fullContext } from '../../App'
import Navbar from '../NavBar/Navbar';
import './BookRide.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUsers } from '@fortawesome/free-solid-svg-icons'
const BookRide = () => {
    const [userDetails, setUserDetails] = useContext(fullContext)
    const { vehicleType } = useParams()
    const confirmDestination = () => {
        const newUserInfo = { ...userDetails }
        newUserInfo.destinationConfirm = true
        setUserDetails(newUserInfo)
    }

    const handleBlur = (e) => {
        let isFeildValid = true;
        if (e.target.name === 'from') {
            isFeildValid = e.target.value
        }
        if (e.target.name === 'to') {
            isFeildValid = e.target.value
        }
        if (isFeildValid) {
            const newUserInfo = { ...userDetails }
            newUserInfo[e.target.name] = e.target.value
            setUserDetails(newUserInfo);
        }
    }
    console.log('destinitoin', userDetails);
    const { destinationConfirm, from, to} = userDetails
    return (
        <div>
            <Navbar></Navbar>
            <div className="container pt-5" style={{ borderTop: 'gray 2px solid' }}>
                <div className="row">
                    <div className="col-lg-4 col-sm-12 my-3 destination-section">
                        {
                            destinationConfirm
                                ? <div className="destination-form p-3">
                                    <div className="p-3 mb-3" style={{ backgroundColor: '#ff6e40', color: 'white', borderRadius: '0.75em' }}>
                                        <p>{from}</p>
                                        <p>{to}</p>
                                    </div>
                                    <div style={{ backgroundColor: 'white', borderRadius: '0.75em' }} className="d-flex shadow my-3 p-2 py-4 align-items-center justify-content-around">
                                        <div style={{ width: '25%' }}>
                                            <img style={{ width: '100%' }} src={userDetails.vehicle.image} alt="" />
                                        </div>
                                        <p>{userDetails.vehicle.type}</p>
                                        <p><FontAwesomeIcon icon={faUsers} /> {userDetails.vehicle.seat}</p>
                                        <p>{userDetails.vehicle.rent}</p>
                                    </div>
                                    <div style={{ backgroundColor: 'white', borderRadius: '0.75em' }} className="d-flex shadow my-3 p-2 py-4 align-items-center justify-content-around">
                                        <div style={{ width: '25%' }}>
                                            <img style={{ width: '100%' }} src={userDetails.vehicle.image} alt="" />
                                        </div>
                                        <p>{userDetails.vehicle.type}</p>
                                        <p><FontAwesomeIcon icon={faUsers} /> {userDetails.vehicle.seat}</p>
                                        <p>{userDetails.vehicle.rent}</p>
                                    </div>
                                    <div style={{ backgroundColor: 'white', borderRadius: '0.75em' }} className="d-flex shadow my-3 p-2 py-4 align-items-center justify-content-around">
                                        <div style={{ width: '25%' }}>
                                            <img style={{ width: '100%' }} src={userDetails.vehicle.image} alt="" />
                                        </div>
                                        <p>{userDetails.vehicle.type}</p>
                                        <p><FontAwesomeIcon icon={faUsers} /> {userDetails.vehicle.seat}</p>
                                        <p>{userDetails.vehicle.rent}</p>
                                    </div>
                                </div>

                                : <div className="destination-form p-3 ">
                                    <label htmlFor="">Pick From</label>
                                    <input className="form-control" type="text" onBlur={handleBlur} name="from" placeholder="Pick From" required />
                                    <br />
                                    <label htmlFor="">Pick To</label>
                                    <input className="form-control" type="text" onBlur={handleBlur} placeholder="Pick To" name="to" required />
                                    <br />
                                    <input type="date" name="" id="" /><br />
                                    <button className="btn btn-warning mt-3" style={{ width: '100%', fontWeight: '600' }} onClick={confirmDestination}>Search</button>
                                </div>
                        }
                    </div>
                    <div className="col-lg-8 col-sm-12 my-3">
                        <iframe className="shadow" style={{ border: "0px", width: "100%", borderRadius: '1em', height: "450px" }} src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3649.093237483057!2d90.4068774143504!3d23.850822690850915!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c686c0c59ce3%3A0x294f4d37d1769987!2sAirport%20-%20Dakshinkhan%20Rd%2C%20Dhaka%201230!5e0!3m2!1sen!2sbd!4v1616247010207!5m2!1sen!2sbd" allowfullscreen="" loading="lazy"></iframe>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BookRide;