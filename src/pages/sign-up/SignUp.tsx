import React, { useEffect, useState } from "react";
import SignUpOne from "pages/sign-up/components/SignUpOne";
import SignUpTwo from "pages/sign-up/components/SignUpTwo";
import BirthdateState from "types/birthdateType";
import UserData from "types/userDataType";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "firebase-setup/firebaseConfig";
import { doc, setDoc } from "firebase/firestore"; 
import { useAppDispatch } from "redux-setup/hooks";
import { setSignedUser } from "redux-setup/features/signed-user/signedUser";
import UserState from "types/userStateType";
import { Navigate, useNavigate } from "react-router-dom";
import RoutesTypes from "constants/routes-types";

const LAST_PAGE_ID = 2;

const SignUp: React.FC = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

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
                posts: [],
                savedPosts: [],
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
        if (currentPageId === LAST_PAGE_ID) {
            handleSignUp();
        }
    }, [currentPageId])

    const generatePages = () => {
        switch (currentPageId) {
            case 0: {
                return <SignUpOne {...{ setCurrentPageId, userData, setUserData }} />
            }
            case 1: {
                return <SignUpTwo {...{ setCurrentPageId, setUserData }} />
            }
            default: {
                return null;
            }
        }
    }

    return (
        shouldRedirect ?
            <Navigate to={RoutesTypes.NOT_FOUND} /> :
            <div className="h-screen w-screen flex justify-center items-center bg-[#FAFAFA]">
                {generatePages()}
            </div>
    )
}

export default SignUp;