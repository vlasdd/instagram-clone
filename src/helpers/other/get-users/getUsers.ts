import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "firebase-setup/firebaseConfig";
import UserState from "types/userStateType";

const getUsers = async (
    wordEntering: string,
    setUsersInfo: React.Dispatch<React.SetStateAction<UserState[]>>
) => {
    if (wordEntering.length === 0) {
        setUsersInfo([]);
        return;
    }

    const usersRef = collection(db, "users");
    const q = query(usersRef, where("username", ">=", wordEntering), where("username", "<=", wordEntering + "~"));

    const querySnapshot = await getDocs(q);
    setUsersInfo(querySnapshot.docs.map(doc => doc.data()) as UserState[])
}

export default getUsers;