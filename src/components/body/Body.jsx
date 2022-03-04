import React, { Component } from 'react';
import Menu from './Menu';
import Auth from '../Auth/Auth';
import {Route, Redirect, Switch} from 'react-router-dom'
import { connect } from 'react-redux';
import { authCheck } from '../redux/authActionCreators';

import Logout from "../Auth/Logout"


const mapStateToProps = (state) => {
	return{
	token: state.photos
	}
}

const mapDispatchToProps = dispatch =>{
	return {
		authCheck: () => dispatch(authCheck()),
	}
}

class Body extends Component {

	componentDidMount(){
		this.props.authCheck();
	}

	render(){

		let routes= null;
		if(this.props.token.token === null)
		{
			routes = (
			<Switch>
				<Route path='/login' component={Auth}/>
				<Redirect to='/login' />
			</Switch>)
		}
		else{
			routes = ( 
			<Switch>
				<Route path='/logout'  exact component={Logout}/>
				<Route path='/' exact component={Menu}/>
				<Redirect  to="/" />
			</Switch>
			)
		}
	
		return (
			<div>
				<Switch>
					{routes}
				</Switch>
			</div>
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps) (Body);