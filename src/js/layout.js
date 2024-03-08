import React, { createContext, useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";

import { Home } from "./views/home";
import { Demo } from "./views/demo";
import { Single } from "./views/single";
import injectContext from "./store/appContext";

import { Navbar } from "./component/navbar";
import { Footer } from "./component/footer"; 

import { Contacts } from "./views/Contacts.jsx";
import { AddContact } from "./views/AddContact.jsx";
import { EditContact } from "./component/EditContact.jsx";

export const AppContext = createContext(null);

//create your first component
const Layout = () => {
	const [contacts , setContacts] = useState([])
	//the basename is used when your project is published in a subdirectory and not in the root of the domain
	// you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
	const basename = process.env.BASENAME || "";
	useEffect(()=>{
		fetch("https://playground.4geeks.com/apis/fake/contact/agenda/breilly")
        .then(resp => resp.json())
        .then(data => setContacts(data))
	}, [])

	return (
		<div>
			<AppContext.Provider value={{ contacts , setContacts }}>
			<BrowserRouter basename={basename}>
				<ScrollToTop>
					<Navbar />
					<Routes>
						<Route exact path="/index.html" element={<Contacts/>} />
						<Route exact path="/" element={<Contacts/>} />
						<Route exact path="/contacts" element={<Contacts/>} />
						<Route exact path="/add" element={<AddContact/>} />
						<Route exact path="/edit" element={<EditContact/>} />
						<Route render={() => <h1 className="notfound">Not found!</h1>} />
					</Routes>
					<Footer />
				</ScrollToTop>
			</BrowserRouter>
			</AppContext.Provider>
		</div>
	);
};

export default injectContext(Layout);
