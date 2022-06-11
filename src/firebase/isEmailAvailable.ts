import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebaseConfig";


const isEmailAvailable = async (email: string): Promise<boolean> => {
    const allUsers = await getDocs(collection(db, "users"));
    let isAvailable: boolean = true;

    allUsers.forEach(user => {
        const emailOfUser: string = user.data().emailAddress
        if(emailOfUser === email){
            isAvailable = false;
            return;
        }
    })

    return isAvailable;
}

export default isEmailAvailable;