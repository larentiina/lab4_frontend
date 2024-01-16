import {getAuthToken} from "../../asyncRequest/AxiosRequestHandler";

const defaultState={
    token: getAuthToken(),
    isAuthenticated: getAuthToken() !== "null" && getAuthToken() !== ""
}
const SET_USER="SET_USER"
const DELETE_USER="DELETE_USER"
export const authReducer =(state=defaultState,action)=>{
    switch (action.type) {
        case SET_USER:
            return {...state, token: action.payload, isAuthenticated: true}
        case DELETE_USER:
            return {...state, token: "",isAuthenticated: false}
        default:
            return state
    }

}
export const setUserAction = (payload)=>({type: SET_USER,payload})
export const deleteUserAction = (payload)=>({type: DELETE_USER,payload})
