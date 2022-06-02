import React from "react";
import { Link, useLocation } from "react-router-dom";
import RoutesTypes from "../constants/routes-types"
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { useNavigate } from "react-router-dom";
import ProfileDropMenuContainer from "./profile/ProfileDropMenuContainer";
import { toggleIsWindowOpen } from "../redux/features/isWindowOpen";

const Header: React.FC = () => {
    const user = useAppSelector(state => state.currentUser.user);
    const isWindowOpen = useAppSelector(state => state.isWindowOpen.isWindowOpen);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const location = useLocation();

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
                    <div className="flex gap-3">
                        {/*<svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                        </svg>
                        <svg
                            xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
                            onClick={handleLogout}
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>*/}
                        {location.pathname === "/" ?
                            <button onClick={() => navigate(RoutesTypes.DASHBOARD)}>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-gray-800" viewBox="0 0 20 20" fill="currentColor">
                                    <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                                </svg>
                            </button> :
                            <button onClick={() => navigate(RoutesTypes.DASHBOARD)}>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-gray-800" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                                </svg>
                            </button>
                        }
                        <div className="relative flex items-center">
                            <button
                                className="h-8 w-8 cursor-pointer rounded-full"
                                onClick={(event) => {
                                    event.stopPropagation();
                                    dispatch(toggleIsWindowOpen())
                                }}
                            >
                                <img
                                    src={user.profileImage.length ? user.profileImage : "../images/default-avatar-image.jpg"}
                                    className="rounded-full"
                                />
                            </button>
                            {isWindowOpen &&
                                <div className="absolute left-[-168px] top-10">
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