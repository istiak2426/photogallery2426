import { combineReducers } from "redux"
import * as actionType  from "../../components/redux/actionType"

const photoReducer = (photoState= { isLoading: false, photos:[], errMes:null, token:null, userId:null }, action ) =>{

	switch(action.type)
	{
			case actionType.PHOTOS_LOADING:
				return {
				...photoState,
				isLoading: true,
				errMes: null,
				photos: []
			}

			case actionType.LOAD_PHOTOS:
				return{
					...photoState,
					isLoading: false,
					errMess:null,
					photos: action.payload
				}

			case actionType.PHOTOS_FAILED:
				return{
					...photoState,
					isLoading: false,
					errMess: action.payload,
					photos:[]

				}

			// auth 
			case actionType.AUTH_SUCCESS:
				return{
					...photoState,
					token: action.payload.token,
					userId: action.payload.userId,
				}

			case actionType.AUTH_LOGOUT:
            	return {
                ...photoState,
                token: null,
                userId: null,
            }

			default:
			return photoState
	}
}




const commentReducer = (commentState= {isLoading:true, comments:[]}, action ) =>{

	switch(action.type)
	{
		case actionType.LOAD_COMMENTS:
		return{
			...commentState,
			isLoading: false,
			comments: action.payload
		};

		case actionType.COMMENT_LOADING:
		return{
			...commentState,
			isLoading: true,
			comments: []
		};
		
		case  actionType.ADD_COMMENT:
		let comment = action.payload;
		return {
			...commentState,
			comments: commentState.comments.concat(comment)
		}

		default:
		return commentState
	}
}

export const reducer = combineReducers({
	photos: photoReducer,
	comments: commentReducer
})











// const authReducer= (authState={token: null, userId: null}, action) =>{

// 	switch(action.type){
// 		case actionTypes.AUTH_SUCCESS:
// 		return {
// 			...authState,
// 			token:action.payload.token,
// 			userId: action.payload.userId,
// 		}

// 		default:
// 			return authState
// 	}


// }




