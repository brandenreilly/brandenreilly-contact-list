import React, { useState, useEffect, useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import MikePhoto from "../../img/m101.jpg";
import { AppContext } from "../layout.js";

export const MoreInfoPage = () => {
    const { contacts , setContacts } = useContext(AppContext)
    const state = useLocation()
    useEffect(()=>{console.log(state)},[])
    return (
        <div className="container-fluid d-flex justify-content-center">
            <div className="header text-center">
                <img src={state.state.photo}/>
                <h1>{state.state.contact.full_name}</h1>
                <p>Address: {state.state.contact.address}</p>
                <p>Phone Number: {state.state.contact.phone}</p>
                <p>Email: {state.state.contact.email}</p>
                <Link to="/contacts/">
                    <button className="btn btn-danger">Go Back</button>
                </Link>
            </div>
        </div>
    )
}