import ActionTypes from "../constants/action-types";
import { UserCredential } from "firebase/auth";
import ISetActiveUser from "../../interfaces/setActiveUserInterface";
import IUserStateInterface from "../../interfaces/userStateInterface";

const initialState = {
    user: {}
}

export const userReducer = (state: { user: UserCredential | {} } = initialState, {type, payload}: ISetActiveUser) => {
    switch(type){
        case ActionTypes.SET_ACTIVE_USER: {
            return payload
        }
        case ActionTypes.REMOVE_ACTIVE_USER: {
            return {user: {}}
        }
        default: {
            return state
        }
    }
}

/*export const removeUserReducer = (state: {user: UserCredential | {}} = initialState) => {
    switch(type){
        case ActionTypes.SET_ACTIVE_USER: {
            return payload
        }
        default: {
            return state
        }
    }
}*/