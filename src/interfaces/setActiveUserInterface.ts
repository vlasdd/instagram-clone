import { DocumentData } from "firebase/firestore";

export default interface ISetActiveUser{
    type: string;
    payload?: DocumentData | undefined
}