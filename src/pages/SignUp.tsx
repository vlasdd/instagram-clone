import React, { FC, useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebase/firebase-config";
import { doc, setDoc, getDoc } from "firebase/firestore"; 
import RoutesTypes, * as ROUTES from "../constants/routes-types"
import { setActiveUser } from "../redux/actions/userActions";
import { useAppDispatch } from "../redux/hooks";
import isUsernameAvailable from "../firebase/isUsernameAvailable";
//import { FirebaseContext } from '../context/firebaseContext';

const SignUp: FC = () => {
    //const { firebase } = useContext(FirebaseContext);
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const [username, setUsername] = useState<string>("");
    const [fullName, setFullName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [error, setError] = useState<string>("");

    const isInvalid = password.length < 6
        || email.length < 6
        || username.length < 6
        || fullName.length < 6
        //|| fullName.split("").some(elem => elem.toUpperCase() === elem);

    const handleSignUp = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.preventDefault();

        const isAvailable = await isUsernameAvailable(username)
        if(!isAvailable){
            setError("This username is not available");
            return;
        }

        try {
            const user = await createUserWithEmailAndPassword(auth, email, password);
            await setDoc(doc(db, "users", user.user.uid), {
                userId: user.user.uid,
                username: username.toLowerCase(),
                fullName,
                emailAddress: email.toLowerCase(),
                following: [],
                dateCreated: Date.now()
            })

            const currentDoc = await getDoc(doc(db, "users", user.user.uid));

            dispatch(setActiveUser(currentDoc.data()));
            navigate(RoutesTypes.DASHBOARD);
        } 
        catch (error: any) {
            setEmail('');
            setPassword('');
            setError(error.message);
            console.log(error);
        }
    }

    return (
        <div className="h-screen w-screen flex justify-center items-center bg-[#FAFAFA]">
            <div className="w-4/5 sm:w-3/5 lg:w-1/3">
                <div className="flex flex-col items-center w-full border bg-white">
                    <div className="flex justify-center w-full pb-4">
                        <img
                            src="/images/instagram-logo.webp"
                            className="w-6/12 mt-6"
                        />
                    </div>
                    {error && <p className="mb-4 w-4/5 text-xs text-red-500">{error}</p>}
                    <form
                        method="POST"
                        className="flex flex-col items-center w-full"
                    >
                        <input
                            aria-label="Enter your username"
                            className="text-sm w-4/5 py-5 px-4 h-2 border rounded mb-2 bg-[#FAFAFA]"
                            type="text"
                            placeholder="Username"
                            value={username}
                            onChange={(event) => setUsername(event.target.value)}
                        />
                        <input
                            aria-label="Enter your full name"
                            className="text-sm w-4/5 py-5 px-4 h-2 border rounded mb-2 bg-[#FAFAFA]"
                            type="text"
                            placeholder="Full name"
                            value={fullName}
                            onChange={(event) => setFullName(event.target.value)}
                        />
                        <input
                            aria-label="Enter your email address"
                            className="text-sm w-4/5 py-5 px-4 h-2 border rounded mb-2 bg-[#FAFAFA]"
                            type="text"
                            placeholder="Email address"
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                        />
                        <input
                            aria-label="Enter your password"
                            className="text-sm w-4/5 py-5 px-4 h-2 border rounded mb-6 bg-[#FAFAFA]"
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(event) => setPassword(event.target.value)}
                        />
                        <button
                            disabled={isInvalid}
                            type="submit"
                            className={`
                                    bg-blue-500 w-4/5 text-white rounded h-8 mb-8 font-bold 
                                    ${isInvalid && "opacity-50"}
                                `}
                            onClick={(event) => handleSignUp(event)}
                        >
                            Sign up
                        </button>
                    </form>
                </div>
                <div className="flex w-full border bg-white mt-8 py-2 justify-center">
                    <p className="text-sm">
                        Have an account?{' '}
                        <Link to={RoutesTypes.LOGIN} className="font-bold text-blue-400">
                            Sign in
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default SignUp;