import { db } from "firebase-setup/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import UserState from "types/userStateType";

type UserInfo = {
    username: string,
    profileImage: string,
    userId: string
}

type UseUserInfoType = (fromId: string) => UserInfo

const defaultInfo = {
    username: "",
    profileImage: "",
    userId: ""
}

const useUserInfo: UseUserInfoType = (fromId) => {
    const [userInfo, setUserInfo] = useState<UserInfo>(defaultInfo)

    useEffect(() => {
        const getUser = async () => {
            const user = (await getDoc(doc(db, "users", fromId))).data() as UserState;
            setUserInfo({ ...user })
        }

        setUserInfo(defaultInfo)
        getUser();
    }, [fromId])

    return userInfo
}

export default useUserInfo