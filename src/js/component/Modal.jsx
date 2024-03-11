import React, { useState, useEffect, useContext } from "react";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { AppContext } from "../layout";

export const Modal = props => {
	const { contacts , setContacts } = useContext(AppContext)
	
	// NOT WAITING LONG ENOUGH TO USE THE GET FETCH
	/* const deleteContactFunc = (id) => {
	 	const deleteContact = { method: 'DELETE' }
		fetch("https://playground.4geeks.com/apis/fake/contact/"+id, deleteContact)
		.then(resp => resp.json())
		.then(fetch("https://playground.4geeks.com/apis/fake/contact/agenda/breilly")
		.then(res => res.json())
		.then(data => setContacts(data))
	)}; */
	const deleteData = async (id) => {
		const response = await fetch('https://playground.4geeks.com/apis/fake/contact/'+ id, {
			method: 'DELETE',
		});
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
		<div className="modal" tabIndex="-1" role="dialog" style={{ display: props.show ? "inline-block" : "none" }}>
			<div className="modal-dialog" role="document">
				<div className="modal-content">
					<div className="modal-header">
						<h5 className="modal-title">Are you sure?</h5>
						{props.onClose ? (
							<button
								onClick={() => props.onClose()}
								type="button"
								className="close"
								data-dismiss="modal"
								aria-label="Close">
								<span aria-hidden="true">&times;</span>
							</button>
						) : (
							""
						)}
					</div>
					<div className="modal-body">
						<p>Warning: unknown consequences after this point... Kidding!</p>
					</div>
					<div className="modal-footer">
						<button type="button" aria-label="Close" data-dismiss="modal" className="btn btn-primary" onClick={()=>{props.onClose()}}>
							Don't Delete
						</button>
						<button type="button" className="btn btn-danger" data-dismiss="modal" onClick={()=>{
							deleteData(props.id);
							props.onClose()
							}}>
							Delete
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};
/**
 * Define the data-types for
 * your component's properties
 **/
Modal.propTypes = {
	history: PropTypes.object,
	onClose: PropTypes.func,
	show: PropTypes.bool,
	currentID: PropTypes.number
};

/**
 * Define the default values for
 * your component's properties
 **/
Modal.defaultProps = {
	show: false,
	onClose: null
};