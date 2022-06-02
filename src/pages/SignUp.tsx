import React, { useEffect, useState } from "react";
import SignUpOne from "../components/sign-up/SignUpOne";
import SignUpTwo from "../components/sign-up/SignUpTwo";
import BirthdateState from "../types/birthdate-type";
import UserData from "../types/user-data-type";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebase/firebase-config";
import { doc, setDoc, getDoc } from "firebase/firestore"; 
import { useAppDispatch } from "../redux/hooks";
import { setActiveUser } from "../redux/features/user";
import UserState from "../types/user-state-type";
import { useNavigate } from "react-router-dom";
import RoutesTypes from "../constants/routes-types";

const SignUp: React.FC = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const [currentPageId, setCurrentPageId] = useState<number>(0)
    const [userData, setUserData] = useState<UserData>({
        username: "",
        fullName: "",
        emailOrPhoneNumber: "",
        password: "",
        birthdate: {} as BirthdateState,
    })

    const handleSignUp = async () => {
       // event.preventDefault();

        /*const isAvailable = await isUsernameAvailable(userData.username)
        if (!isAvailable) {
            setError("This username is not available");
            return;
        }*/

        try {
            const user = await createUserWithEmailAndPassword(auth, userData.emailOrPhoneNumber, userData.password);
            await setDoc(doc(db, "users", userData.username), {
                userId: user.user.uid,
                username: userData.username.toLowerCase(),
                fullName: userData.fullName,
                emailAddress: userData.emailOrPhoneNumber.toLowerCase(),
                following: [],
                followers: [],
                dateCreated: Date.now(),
                birthdate: userData.birthdate,
                phoneNumber: "",
                profileImage: "",
                posts: []
            })

            const currentDoc = await getDoc(doc(db, "users", userData.username));
            dispatch(setActiveUser(currentDoc.data() as UserState));
            navigate(RoutesTypes.DASHBOARD);
        }
        catch (error: any) {
            setUserData(prevData => ({ ...prevData, emailOrPhoneNumber: "" }));
            setUserData(prevData => ({ ...prevData, password: "" }));
            console.log(error);
        }
    }

    useEffect(() => {
        if (currentPageId === 2) {
            handleSignUp();
        }
    }, [currentPageId])

    return (
        <div className="h-screen w-screen flex justify-center items-center bg-[#FAFAFA]">
            {(() => {
                switch (currentPageId) {
                    case 0: {
                        return <SignUpOne {...{ setCurrentPageId, userData, setUserData }} />
                    }
                    case 1: {
                        return <SignUpTwo {...{ setCurrentPageId, setUserData }} />
                    }
                }
            })()}
        </div>
    )
}

export default SignUp;