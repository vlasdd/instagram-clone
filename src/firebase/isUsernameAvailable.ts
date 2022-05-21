import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebase-config";


const isUsernameAvailable = async (name: string): Promise<boolean> => {
    const allUsers = await getDocs(collection(db, "users"));
    let isAvailable: boolean = true;

    allUsers.forEach(user => {
        const nameOfUser: string = user.data().username
        if(nameOfUser === name){
            isAvailable = false;
            return;
        }
    })

    return isAvailable;
}

export default isUsernameAvailable;