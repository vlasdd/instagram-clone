import ActionTypes from "../constants/action-types";
import { DocumentData } from "firebase/firestore";
import ISetActiveUser from "../../interfaces/setActiveUserInterface";

export const setActiveUser = (user: DocumentData | undefined): ISetActiveUser => {
    return {
        type: ActionTypes.SET_ACTIVE_USER,
        payload: user
    }
}

export const removeActiveUser = (): {type: string} => {
    return {
        type: ActionTypes.REMOVE_ACTIVE_USER        
    }
}