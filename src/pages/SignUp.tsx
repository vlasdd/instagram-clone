import React, { useEffect, useState } from "react";
import SignUpOne from "../components/sign-up/SignUpOne";
import SignUpTwo from "../components/sign-up/SignUpTwo";
import BirthdateState from "../types/birthdate-type";
import UserData from "../types/user-data-type";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebase/firebaseConfig";
import { doc, setDoc, getDoc, Timestamp } from "firebase/firestore"; 
import { useAppDispatch } from "../redux/hooks";
import { setSignedUser } from "../redux/features/signedUser";
import UserState from "../types/user-state-type";
import { Navigate, useNavigate } from "react-router-dom";
import RoutesTypes from "../constants/routes-types";

const SignUp: React.FC = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const lastPageId = 2;

    const [shouldRedirect, setShouldRedirect] = useState<boolean>(false);
    const [currentPageId, setCurrentPageId] = useState<number>(0)
    const [userData, setUserData] = useState<UserData>({
        username: "",
        fullName: "",
        emailOrPhoneNumber: "",
        password: "",
        birthdate: {} as BirthdateState,
    })

    const handleSignUp = async () => {
        try {
            const user = await createUserWithEmailAndPassword(auth, userData.emailOrPhoneNumber, userData.password);

            const userDoc: UserState = {
                userId: user.user.uid,
                username: userData.username.toLowerCase(),
                fullName: userData.fullName,
                emailAddress: userData.emailOrPhoneNumber.toLowerCase(),
                following: [],
                followers: [],
                dateCreated: new Date().getTime(),
                birthdate: userData.birthdate,
                phoneNumber: "",
                profileImage: "",
                posts: []
            }
            
            await setDoc(doc(db, "users", user.user.uid), userDoc)

            dispatch(setSignedUser(userDoc));
            navigate(RoutesTypes.DASHBOARD);
        }
        catch (error: any) {
            setShouldRedirect(true);
            console.log(error);
        }
    }

    useEffect(() => {
        if (currentPageId === lastPageId) {
            handleSignUp();
        }
    }, [currentPageId])

    return (
        shouldRedirect ?
            <Navigate to={RoutesTypes.NOT_FOUND} /> :
            <div className="h-screen w-screen flex justify-center items-center bg-[#FAFAFA]">
                {
                    (() => {
                        switch (currentPageId) {
                            case 0: {
                                return <SignUpOne {...{ setCurrentPageId, userData, setUserData }} />
                            }
                            case 1: {
                                return <SignUpTwo {...{ setCurrentPageId, setUserData }} />
                            }
                        }
                    })()
                }
            </div>
    )
}

export default SignUp;