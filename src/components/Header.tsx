import React, { FC } from "react";
import { Link } from "react-router-dom";
import RoutesTypes from "../constants/routes-types"
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { removeActiveUser } from "../redux/actions/userActions";
import { useNavigate } from "react-router-dom";
import IUserStateInterface from "../interfaces/userStateInterface";

const Header: FC = () => {
    const user = useAppSelector((user: IUserStateInterface) => user.currentUser);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(removeActiveUser());
        navigate(RoutesTypes.LOGIN);
    }

    return (
        <header className="w-screen h-14 flex items-center justify-center border-b-2 border-gray-200">
            <div className="w-11/12 flex items-center justify-between">
                <Link to={RoutesTypes.DASHBOARD}>
                    <img
                        src="images/instagram-logo.webp"
                        className="h-12"
                    />
                </Link>
                {user.userId ?
                    <div className="flex gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                        </svg>
                        <svg
                            xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
                            onClick={handleLogout}
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                    </div> :
                    <div className="flex gap-2 h-12 items-center">
                        <button
                            className="h-3/4 w-20 bg-blue-500 font-bold text-white rounded cursor-pointer"
                            onClick={() => navigate(RoutesTypes.LOGIN)}
                        >
                            Log in
                        </button>
                        <button
                            className="h-3/4 w-20 font-bold cursor-pointer"
                            onClick={() => navigate(RoutesTypes.SIGN_UP)}
                        >
                            Sign up
                        </button>
                    </div>}
            </div>
        </header>
    )
}

export default Header;