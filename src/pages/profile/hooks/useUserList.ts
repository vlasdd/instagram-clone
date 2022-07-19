import { db } from "firebase-setup/firebaseConfig";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useAppSelector } from "redux-setup/hooks";
import UserState from "types/userStateType";

type UseUserListType = (usersList: {userId: string}[]) => UserState[]
    
const useUserList: UseUserListType = (usersList) => {
    const userOnPage = useAppSelector(state => state.userOnPage.user);
    const [allUsers, setAllUsers] = useState<UserState[]>([]);

    useEffect(() => {
        const getUsers = async () => {
            if(!usersList.length){
                return;
            }

            const usersRef = collection(db, "users");
            const q = query(usersRef, where("userId", "in", usersList.map(obj => obj.userId)));
        
            const querySnapshot = await getDocs(q);
            setAllUsers(querySnapshot.docs.map(doc => doc.data()) as UserState[])
        } 

        getUsers();
    }, [userOnPage.userId])

    return allUsers
}

export default useUserList