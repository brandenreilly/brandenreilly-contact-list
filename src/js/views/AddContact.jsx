import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../layout";

export const AddContact = () => {
	const { contacts , setContacts } = useContext(AppContext)
    const [fullName , setFullName] = useState("")
    const [email , setEmail] = useState("")
    const [phone , setPhone] = useState("")
    const [address , setAddress] = useState("")

	const addData = async (id) => {
        const addContact = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                full_name: fullName,
                email: email,
                agenda_slug: "breilly",
                address: address,
                phone: phone
            })
        };
		const response = await fetch('https://playground.4geeks.com/apis/fake/contact', addContact);
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

	return (
		<div className="container">
			<div>
				<h1 className="text-center mt-5">Add a new contact</h1>
				<form>
					<div className="form-group">
						<label htmlFor="fullName">Full Name</label>
						<input type="text" id="fullName" required className="form-control" autoComplete="name" placeholder="Full Name" value={fullName} onChange={(e)=>{setFullName(e.target.value)}}/>
					</div>
					<div className="form-group">
						<label htmlFor="email">Email</label>
						<input type="email" id="email" required className="form-control" autoComplete="email" placeholder="Enter email" value={email} onChange={(e)=>{setEmail(e.target.value)}}/>
					</div>
					<div className="form-group">
						<label htmlFor="phone">Phone</label>
						<input type="phone" id="phone" required className="form-control" autoComplete="tel" placeholder="Enter phone" value={phone} onChange={(e)=>{setPhone(e.target.value)}}/>
					</div>
					<div className="form-group">
						<label htmlFor="address">Address</label>
						<input type="text" id="address" required className="form-control" autoComplete="street-address" placeholder="Enter address" value={address} onChange={(e)=>{setAddress(e.target.value)}}/>
					</div>
					<Link to="/">
						<button type="submit" className="btn btn-primary form-control" onClick={()=>{
							addData()
						}}>
							Save
						</button>
					</Link>
					<Link className="mt-3 w-100 text-center" to="/">
						Or Back to Contacts
					</Link>
				</form>
			</div>
		</div>
	);
};