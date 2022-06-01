import React from "react";
import { Link } from "react-router-dom";
import RoutesTypes from "../constants/routes-types"
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { useNavigate } from "react-router-dom";
import { removeActiveUser } from "../redux/features/user";
import useToggle from "../helpers/useToggle";
import ProfileDropMenuContainer from "./Profile/ProfileDropMenuContainer";

const Header: React.FC = () => {
    const user = useAppSelector(state => state.currentUser.user);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const [isProfileOpen, toggleIsProfileOpen] = useToggle(false);

    return (
        <header className="w-screen h-14 flex items-center justify-center border-b-2 border-gray-200 bg-white">
            <div className="w-11/12 flex items-center justify-evenly">
                <Link to={RoutesTypes.DASHBOARD}>
                    <img
                        src="images/instagram-logo.webp"
                        className="h-10"
                    />
                </Link>
                {user.userId.length ?
                    <div className="flex gap-2">
                        {/*<svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                        </svg>
                        <svg
                            xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
                            onClick={handleLogout}
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>*/}
                        <div className="relative">
                            <button
                                className="h-8 w-8 cursor-pointer rounded-full"
                                onClick={toggleIsProfileOpen}
                            >
                                <img
                                    src={user.profileImage.length ? user.profileImage : "../images/default-avatar-image.jpg"}
                                    className="rounded-full"
                                />
                            </button>
                            {isProfileOpen &&
                                <div className="absolute left-[-168px] top-11">
                                    <ProfileDropMenuContainer />
                                </div>}
                        </div>
                    </div> :
                    <div className="flex gap-2 h-12 items-center">
                        <button
                            className="h-3/5 w-16 bg-blue-500 font-bold text-white rounded cursor-pointer"
                            onClick={() => navigate(RoutesTypes.LOGIN)}
                        >
                            Log in
                        </button>
                        <button
                            className="h-3/5 w-16 font-bold cursor-pointer"
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