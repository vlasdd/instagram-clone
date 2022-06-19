import React, { useState } from 'react';
import { Link } from "react-router-dom";
import RoutesTypes from "../../constants/routes-types"
import isEmailAvailable from '../../firebase/isEmailAvailable';
import isUsernameAvailable from "../../firebase/isUsernameAvailable";
import UserData from "../../types/user-data-type";

type SignUpOneProps = {
    setCurrentPageId: React.Dispatch<React.SetStateAction<number>>
    userData: UserData,
    setUserData: React.Dispatch<React.SetStateAction<UserData>>
}

const SignUpOne: React.FC<SignUpOneProps> = ({ setCurrentPageId, userData, setUserData }) => {
    const [error, setError] = useState<string>("");
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const isInvalid = userData.password.length < 6
        || userData.emailOrPhoneNumber.length < 6
        || userData.username.length < 6
        || userData.fullName.length < 6

    const handleSignUp = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.preventDefault();

        const isNameAvailable = await isUsernameAvailable(userData.username);
        if (!isNameAvailable) {
            setError("This username is not available");
            return;
        }

        const isEmailAddressAvailable = await isEmailAvailable(userData.emailOrPhoneNumber);
        if (!isEmailAddressAvailable) {
            setError("Another account is using the same email");
            return;
        }

        const isEmailValid = userData.emailOrPhoneNumber.match(
            /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );

        if (!isEmailValid) {
            setError("Enter a valid email address.");
            return;
        }

        setCurrentPageId(prevVal => prevVal + 1)
    }

    return (
        <div className="w-4/5 sm:w-1/2 lg:w-1/3">
            <div className="flex flex-col items-center w-full border bg-white">
                <div className="flex justify-center w-full">
                    <img
                        src="/images/instagram-logo.webp"
                        className="w-6/12 mt-6"
                    />
                </div>
                <p className="w-4/5 pb-4 text-center text-gray-400 font-semibold">Sign up to see photos and videos from your friends</p>
                {error && <p className="mb-4 w-4/5 text-sm text-red-500 text-center">{error}</p>}
                <form
                    method="POST"
                    className="flex flex-col items-center w-full"
                >
                    <input
                        aria-label="Enter your email address or phone number"
                        className="text-sm w-4/5 py-5 px-4 h-2 border rounded mb-2 bg-[#fcfafa]"
                        type={userData.emailOrPhoneNumber.includes("@") ? "email" : "text"}
                        placeholder="Mobile phone or email"
                        value={userData.emailOrPhoneNumber}
                        onChange={(event) => setUserData(prevData => ({ ...prevData, emailOrPhoneNumber: event.target.value }))}
                    />
                    <input
                        aria-label="Enter your full name"
                        className="text-sm w-4/5 py-5 px-4 h-2 border rounded mb-2 bg-[#fcfafa]"
                        type="text"
                        placeholder="Full name"
                        value={userData.fullName}
                        onChange={(event) => setUserData(prevData => ({ ...prevData, fullName: event.target.value }))}
                    />
                    <input
                        aria-label="Enter your username"
                        className="text-sm w-4/5 py-5 px-4 h-2 border rounded mb-2 bg-[#fcfafa]"
                        type="text"
                        placeholder="Username"
                        value={userData.username}
                        onChange={(event) => setUserData(prevData => ({ ...prevData, username: event.target.value }))}
                    />
                    <div className="w-4/5 border rounded flex items-center bg-[#fcfafa] mb-4">
                        <input
                            aria-label="Enter your password"
                            className="text-sm w-full py-5 px-4 h-2 bg-[#fcfafa]"
                            type={showPassword ? "text" : "password"}
                            placeholder="Password"
                            value={userData.password}
                            onChange={(event) => setUserData(prevData => ({ ...prevData, password: event.target.value }))}
                            autoComplete="on"
                        />
                        {
                            userData.password.length !== 0 &&
                            <button
                                type="button"
                                onClick={() => setShowPassword(prevVal => !prevVal)}
                                className="w-1/5 h-1/2 text-sm bg-red font-medium rounded"
                            >
                                {showPassword ? "Hide" : "Show"}
                            </button>
                        }
                    </div>
                    <p className="w-4/5 text-center text-gray-400 text-sm mb-4">
                        People who use our service may have uploaded your contact information to Instagram
                    </p>
                    <button
                        disabled={isInvalid}
                        type="button"
                        className={`
                            bg-blue-500 w-4/5 text-white rounded h-8 mb-8 font-bold 
                            ${isInvalid && "opacity-50"}
                        `}
                        onClick={event => handleSignUp(event)}
                    >
                        Sign up
                    </button>
                </form>
            </div>
            <div className="flex w-full border bg-white mt-4 py-2 justify-center">
                <p className="text-sm">
                    Have an account?{' '}
                    <Link to={RoutesTypes.LOGIN} className="font-bold text-blue-400">
                        Sign in
                    </Link>
                </p>
            </div>
        </div>
    )
}

export default SignUpOne;