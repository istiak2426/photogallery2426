// Middleware
import * as actionType from "../../components/redux/actionType"

import axios from 'axios'

export const addComment  = (photoId, author, comment)=> dispatch => {
	
	
const newComment = {
		photoId: photoId,
		author: author,
		comment: comment
	}
	newComment.date = new Date().toISOString();

	const { REACT_APP_DEV_URL } = process.env;

	axios.post(`${REACT_APP_DEV_URL }/comments`, newComment)

	.then(res => res.data)
	.then (comment => dispatch(commentConcat(comment)))
}

export  const commentConcat = (comment) => ({
	type: actionType.ADD_COMMENT,
	payload: comment
})

export const commentLoading = ()=>({
	type: actionType.COMMENT_LOADING
})

export const loadCommets = comments =>({
	type: actionType.LOAD_COMMENTS, 
	payload: comments
})

export const fetchComments  = () => dispatch => {
	dispatch(commentLoading());
	

	const { REACT_APP_DEV_URL } = process.env;

	axios.get(`${ REACT_APP_DEV_URL }/comments`)

	.then(res => res.data)
	.then(comments => dispatch(loadCommets(comments)))
}

export const loadPhotos = photos => ({
	type: actionType.LOAD_PHOTOS,
	payload: photos
})

export const photosLoading = () => ({
	type: actionType.PHOTOS_LOADING 
})

export const photosFailed = (errMess) =>({
	type: actionType.PHOTOS_FAILED,
	payload: errMess
})

export const fetchPhotos = () =>{

	return dispatch =>{
		dispatch(photosLoading());

		

		const { REACT_APP_DEV_URL } = process.env;

		axios.get( `${ REACT_APP_DEV_URL }/photos`)
		.then(res => res.data)
		.then(photos => dispatch(loadPhotos(photos)) )
		.catch(error => dispatch(photosFailed(error.message)))
	}
}




