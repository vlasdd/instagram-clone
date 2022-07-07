import { db } from "firebase-setup/firebaseConfig"
import { doc, getDoc } from "firebase/firestore"
import { useEffect, useState } from "react"
import UserState from "types/user-state-type"

const useUserInfo = ( userId: string, dependencies: any[] ) => {
    const [userInfo, setUserInfo] = useState<{
        username: string,
        profileImage: string,
        userId: string
    }>({
        username: "",
        profileImage: "",
        userId: ""
    })

    useEffect(() => {
        const getUser = async () => {
            const user = (await getDoc(doc(db, "users", userId))).data() as UserState;
            setUserInfo({ ...user })
        }

        setUserInfo({ username: "", profileImage: "", userId: "" })
        getUser();
    }, dependencies)

    return userInfo
}

export default useUserInfo