import axios from 'axios'

import * as actionType from "../../components/redux/actionType"


export const authSuccess = (token, userId) => {
    return {
        type: actionType.AUTH_SUCCESS,
        payload: {
            token: token,
            userId: userId,
        }
    }
}


export const auth = (email, password, mode) => dispatch => {
    const authData = {
        email: email,
        password: password,
		returnSecureToken: true,  
    }

	let authUrl = null;
    if (mode === "Sign Up"){
		authUrl = "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=";
	}
	else{
		authUrl = "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=";
	}

	const API_KEY = "AIzaSyB-TtSew3ZCMopFlzpaDIvUeQQMkWMo138";

	axios.post( authUrl + API_KEY, authData )
	.then(response => {
		if(response.status === 200){
			localStorage.setItem('token', response.data.idToken);
            localStorage.setItem('userId', response.data.localId);
			const expirationTime = new Date(new Date().getTime() + response.data.expiresIn * 1000);
			localStorage.setItem('expirationTime', expirationTime);
			dispatch(authSuccess(response.data.idToken, response.data.localId));}
	})
}

export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationTime');
    localStorage.removeItem('userId');
    return {
        type: actionType.AUTH_LOGOUT,
    }
}


export const authCheck = () => dispatch => {
    const token = localStorage.getItem('token');
    if (!token) {
        // Logout
        dispatch(logout());
    } else {
        const expirationTime = new Date(localStorage.getItem('expirationTime'));
        if (expirationTime <= new Date()) {
            // Logout
            dispatch(logout());
        } else {
            const userId = localStorage.getItem('userId');
            dispatch(authSuccess(token, userId));
        }
    }
}
