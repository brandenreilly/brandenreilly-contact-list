import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { AppContext } from "../layout";

export const EditContact = () => {
    const { contacts , setContacts } = useContext(AppContext)
    const [fullName , setFullName] = useState("")
    const [email , setEmail] = useState("")
    const [phone, setPhone] = useState("")
    const [address, setAddress] = useState("")
    const getContact = useLocation()
    /* const contactID = getContact.state.id */
    // FIgure out why location isnt being read
    useEffect(()=>{
       /*  setFullName(contactInfo.full_name);
        setEmail(contactInfo.email)
        setPhone(contactInfo.phone)
        setAddress(contactInfo.address) */
    },[])

    const EditInformation = (props) => {
        const editContact = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                full_name: `${fullName}`,
                email: `${email}`,
                agenda_slug: `breilly`,
                address: `${address}`,
                phone: `${phone}`
            })
        };
        fetch("https://playground.4geeks.com/apis/fake/contact/" , editContact)
        .then(resp => resp.json())
        .then(data => setContacts(data))
    }

    return(
        <div className="container">
			<div>
				<h1 className="text-center mt-5">Edit A Contact's Information</h1>
				<form>
					<div className="form-group">
						<label htmlFor="editFullName">Full Name</label>
						<input type="text" id="editFullName" required className="form-control" autoComplete="name" placeholder="Full Name" value={fullName} onChange={(e)=>{setFullName(e.target.value)}}/>
					</div>
					<div className="form-group">
						<label htmlFor="editEmail">Email</label>
						<input type="email" id="editEmail" required className="form-control" autoComplete="email" placeholder="Enter email" value={email} onChange={(e)=>{setEmail(e.target.value)}}/>
					</div>
					<div className="form-group">
						<label htmlFor="editPhone">Phone</label>
						<input type="phone" id="editPhone" required className="form-control" autoComplete="tel" placeholder="Enter phone" value={phone} onChange={(e)=>{setPhone(e.target.value)}}/>
					</div>
					<div className="form-group">
						<label htmlFor="editAddress">Address</label>
						<input type="text" id="editAddress" required className="form-control" autoComplete="street-address" placeholder="Enter address" value={address} onChange={(e)=>{setAddress(e.target.value)}}/>
					</div>
					<button type="submit" className="btn btn-primary form-control" onClick={()=>{
						console.log(getContact)
					}}>
						Update Contact Information
					</button>
					<Link className="mt-3 w-100 text-center" to="/">
						Discard Edits
					</Link>
				</form>
			</div>
		</div>
    )
}