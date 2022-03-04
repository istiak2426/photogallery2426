import React from 'react';
import { Navbar, NavbarBrand, Button} from 'reactstrap';
import { Link } from 'react-router-dom';
import { connect } from "react-redux"


const mapStateToProps = (state) => {
	return{
	token: state.photos 
	}
}

const  Navigation = (props)=> {

	let links = null;
	if(props.token.token === null)
	{
		links = (<>
					<Button >
						<Link to="/login" style={{cursor:"pointer", textDecoration:"none", color:"white"}}>Log in</Link>
					</Button>
				</>) 
	}
	else {
		links = (<>
					<Button >
						<Link to="/logout" style={{cursor:"pointer", textDecoration:"none", color:"white"}}>Log out</Link>
					</Button>
				</>)
		}
	return (
			<div>
				<Navbar  dark color='dark' expand="sm">
					<NavbarBrand href='/' className="mr-auto ml-md-5 Brand">Photo Gallery</NavbarBrand>
					{links}
				</Navbar>
			</div> 
		);
}

export default connect(mapStateToProps)(Navigation)