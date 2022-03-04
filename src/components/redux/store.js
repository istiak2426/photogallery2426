import {reducer} from "../../components/redux/reducer"
import thunk from 'redux-thunk'
import { createStore, applyMiddleware } from "redux"

export const myStore = createStore(reducer, applyMiddleware(thunk))


 

