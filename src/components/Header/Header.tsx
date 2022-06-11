import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import RoutesTypes from "../../constants/routes-types"
import { useAppSelector } from "../../redux/hooks";
import { useNavigate } from "react-router-dom";
import ProfileDropMenuContainer from "./ProfileDropMenuContainer";
import DropMenu from "../DropMenu";
import UsersSearchDropMenu from "./UsersSearchDropMenu";

enum DropMenuTypes{
    NONE = "",
    PROFILE = "profile",
    ACTIONS = "actions",
    SEARCH = "search",
}

const Header: React.FC = () => {
    const user = useAppSelector(state => state.signedUser.user);
    const navigate = useNavigate();
    const location = useLocation();
    const inputRef = useRef<any>();

    const [currentDropMenu, setCurrentDropMenu] = useState<string>(DropMenuTypes.NONE);
    const [wordEntering, setWordEntering] = useState<string>("");

    useEffect(() => {
        setCurrentDropMenu(DropMenuTypes.NONE);
    }, [location])

    return (
        <>
            <header className="w-screen h-14 flex items-center justify-center border-b-2 border-gray-200 bg-white">
                <div className="w-11/12 flex items-center justify-evenly">
                    <Link to={RoutesTypes.DASHBOARD}>
                        <img
                            src="images/instagram-logo.webp"
                            className="h-10"
                        />
                    </Link>
                    <div
                        className="w-64 h-9 relative"
                        onClick={() => {
                            //if (currentDropMenu === DropMenuTypes.NONE) {
                            inputRef.current.focus();
                            setCurrentDropMenu(DropMenuTypes.SEARCH);
                            //}
                        }}
                    >
                        <button
                            className="bg-gray-200 rounded-lg flex px-4 items-center h-full w-full"
                            onClick={() => console.log("div clicked")}
                        >
                            {document.activeElement !== inputRef.current ?
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg> :
                                undefined
                            }
                            <input
                                className="w-full h-full bg-gray-200 rounded-lg placeholder:font-light placeholder:text-gray-400 relative"
                                type="text"
                                placeholder="Search"
                                ref={inputRef}
                                value={wordEntering}
                                onChange={(event) => setWordEntering(event.target.value)}
                                onClick={() => console.log("input cliked")}
                            />
                            {document.activeElement === inputRef.current ?
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                </svg> :
                                undefined
                            }
                        </button>
                        {currentDropMenu === DropMenuTypes.SEARCH &&
                            <DropMenu
                                closeEvent={event => {
                                    event.stopPropagation();
                                    setCurrentDropMenu(DropMenuTypes.NONE)
                                }}
                                styles="w-[375px] top-12 left-[-65px] h-96"
                            >
                                <UsersSearchDropMenu
                                    wordEntering={wordEntering}
                                />
                            </DropMenu>
                        }
                    </div>
                    {user.userId.length ?
                        <div className="flex gap-3">
                            {location.pathname === RoutesTypes.DASHBOARD ?
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
                                    className="h-7 w-7 cursor-pointer rounded-full"
                                    onClick={() => { setCurrentDropMenu(DropMenuTypes.PROFILE); console.log("profile clicked") }}
                                >
                                    <img
                                        src={user.profileImage.length ? user.profileImage : "../images/default-avatar-image.jpg"}
                                        className="rounded-full h-7 w-7 object-cover"
                                    />
                                </button>
                                {currentDropMenu === DropMenuTypes.PROFILE &&
                                    <DropMenu
                                        closeEvent={() => setCurrentDropMenu(DropMenuTypes.NONE)}
                                        styles="w-56 left-[-168px] top-11"
                                    >
                                        <ProfileDropMenuContainer />
                                    </DropMenu>
                                }
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
        </>
    )
}

export default Header;