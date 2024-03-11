import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import MikePhoto from "../../img/m101.jpg";
import { AppContext } from "../layout.js";

export const CardLayoutContacts = () => {
    const { contacts , setContacts } = useContext(AppContext)

    return( 
        <div className="container-fluid">
            <div className="row d-flex justify-content-center">
            {contacts.map((contact, index)=>{
                return (
                        <div className="col-3 mx-2 d-flex justify-content-center" key={index}>                             
                            <div className="card" style={{width: "12rem"}}>
                                <img src={MikePhoto} class="card-img-top" alt="..."/>
                                <div className="card-body">
                                    <h5 className="card-title">{contact.full_name}</h5>
                                </div>
                                <div className="card-footer">
                                    <Link to={{pathname: "/contacts/" + index , }} state={{contact: contact , photo: MikePhoto}}>
                                        <button className="btn btn-primary">More Info</button>
                                    </Link>
                                </div>
                            </div>
                        </div>
            )})}
            </div>
        </div>
)}