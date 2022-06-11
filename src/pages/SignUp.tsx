import React, { useEffect, useState } from "react";
import SignUpOne from "../components/SignUp/SignUpOne";
import SignUpTwo from "../components/SignUp/SignUpTwo";
import BirthdateState from "../types/birthdate-type";
import UserData from "../types/user-data-type";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebase/firebaseConfig";
import { doc, setDoc, getDoc } from "firebase/firestore"; 
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
       // event.preventDefault();

        /*const isAvailable = await isUsernameAvailable(userData.username)
        if (!isAvailable) {
            setError("This username is not available");
            return;
        }*/

        try {
            const user = await createUserWithEmailAndPassword(auth, userData.emailOrPhoneNumber, userData.password);

            const userDoc: UserState = {
                userId: user.user.uid,
                username: userData.username.toLowerCase(),
                fullName: userData.fullName,
                emailAddress: userData.emailOrPhoneNumber.toLowerCase(),
                following: [],
                followers: [],
                /*following: [
                    {userId: "12312", profileImage: "../images/default-avatar-image.jpg", username: "first", fullName: "1231243124"},
                    {userId: "Qsd342", profileImage: "../images/default-avatar-image.jpg", username: "second", fullName: "sadasdasd"}
                ],
                followers: [
                    {userId: "12312", profileImage: "../images/default-avatar-image.jpg", username: "first", fullName: "1231243124", },
                    {userId: "Qsd342", profileImage: "../images/default-avatar-image.jpg", username: "second", fullName: "sadasdasd"}
                ],*/
                dateCreated: Date.now(),
                birthdate: userData.birthdate,
                phoneNumber: "",
                profileImage: "",
                posts: []
            }
            
            await setDoc(doc(db, "users", user.user.uid), userDoc)

          //  const currentDoc = await getDoc(doc(db, "users", user.user.uid));
            dispatch(setSignedUser(userDoc));
            navigate(RoutesTypes.DASHBOARD);
        }
        catch (error: any) {
            //setUserData(prevData => ({ ...prevData, emailOrPhoneNumber: "" }));
            //setUserData(prevData => ({ ...prevData, password: "" }));
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