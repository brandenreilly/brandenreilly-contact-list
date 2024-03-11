import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";

import { ContactCard } from "../component/ContactCard.jsx";
import { Modal } from "../component/Modal.jsx";
import { AppContext } from "../layout.js";

export const Contacts = () => {
    const { contacts , setContacts } = useContext(AppContext)
	const [state, setState] = useState({
		showModal: false,
		currentID: 0
	});
	useEffect(()=>{
		fetch("https://playground.4geeks.com/apis/fake/contact/agenda/breilly")
		.then(resp => resp.json())
		.then(data => setContacts(data))
	},[])

	return (
		<div className="container">
			<div>
				<p className="text-right my-3">
					<Link className="btn btn-success" to="/add">
						Add New Contact
					</Link>
				</p>
				<div id="contacts" className="panel-collapse collapse show" aria-expanded="true">
					<ul className="list-group pull-down" id="contact-list">
					    { contacts.length > 0 && contacts.map((contact , index)=>{
                        return <ContactCard key={index} onDelete={() => setState({ showModal: true , currentID: contact.id })} id={contact.id} contact={contact}/>
                        })}
                    </ul>
				</div>
			</div>
			<Modal show={state.showModal} contact={contacts} onClose={() => setState({ showModal: false })} id={state.currentID} />
		</div>
	);
};