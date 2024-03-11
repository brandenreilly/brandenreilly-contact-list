import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AppContext } from "../layout";

export const EditContact = (props) => {
    const { contacts , setContacts } = useContext(AppContext)
    const [fullName , setFullName] = useState("")
    const [email , setEmail] = useState("")
    const [phone, setPhone] = useState("")
    const [address, setAddress] = useState("")
    const getContact = useLocation()
    useEffect(()=>{
        setFullName(getContact.state.contact.full_name);
        setEmail(getContact.state.contact.email);
        setPhone(getContact.state.contact.phone);
        setAddress(getContact.state.contact.address);
    },[])

    // ALSO NOT WAITING LONG ENOUGH...
    /* const editInformation = (props) => {
        const editContact = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                full_name: fullName,
                email: email,
                agenda_slug: `breilly`,
                id: getContact.state.id,
                address: address,
                phone: phone
            })
        };
        fetch("https://playground.4geeks.com/apis/fake/contact/" + getContact.state.id , editContact)
        .then(resp => resp.json())
        .then(data => alert(data.msg))
        .then(fetch("https://playground.4geeks.com/apis/fake/contact/agenda/breilly")
        .then(res => res.json())
        .then(data => setContacts(data)))
    } */

    const editData = async (id) => {
        const editContact = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                full_name: fullName,
                email: email,
                agenda_slug: `breilly`,
                id: getContact.state.id,
                address: address,
                phone: phone
            })
        };
		const response = await fetch('https://playground.4geeks.com/apis/fake/contact/'+ getContact.state.id, editContact);
		if (response.ok) {
			const data = await response.json();
			fetch("https://playground.4geeks.com/apis/fake/contact/agenda/breilly")
			.then(resp => resp.json())
			.then(respData => setContacts(respData))
		} else {
			console.log('error: ', response.status, response.statusText);
			return {error: {status: response.status, statusText: response.statusText}};
		};
	};


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
                    <Link to="/">
                        <button type="submit" className="btn btn-primary form-control" onClick={()=>{
                            editData()
					    }}>
						    Update Contact Information
					    </button>
					</Link>
                    <Link className="mt-3 w-100 text-center" to="/">
						Discard Edits
					</Link>
				</form>
			</div>
		</div>
    )
}