import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import RoutesTypes from "../../constants/routes-types"
import { useAppSelector } from "../../redux/hooks";
import { useNavigate } from "react-router-dom";
import ProfileDropMenuContainer from "./ProfileDropMenuContainer";
import DropMenu from "../DropMenu";
import UsersSearchDropMenu from "./UsersSearchDropMenu";
import Search from "../../svgs/Search";
import Home from "../../svgs/Home";
import Direct from "../../svgs/Direct";
import useWindowWidth from "../../helpers/useWindowWidth";
import SearchBar from "./SearchBar";

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


    const [currentDropMenu, setCurrentDropMenu] = useState<string>(DropMenuTypes.NONE);
    const [wordEntering, setWordEntering] = useState<string>("");

    useEffect(() => {
        setCurrentDropMenu(DropMenuTypes.NONE);
    }, [location])

    const innerWidth = useWindowWidth();

    return (
        <>
            <header className="w-screen py-2 flex items-center justify-center border-b border-gray-200 bg-white">
                <div className="w-11/12 flex items-center justify-evenly">
                    <Link to={RoutesTypes.DASHBOARD}>
                        <img
                            src="images/instagram-logo.webp"
                            className="h-10"
                        />
                    </Link>
                    {innerWidth > 640 ?
                        <div
                            className="w-64 h-9 relative"
                            onClick={() => {
                                //if (currentDropMenu === DropMenuTypes.NONE) {
                                setCurrentDropMenu(DropMenuTypes.SEARCH);
                                //}
                            }}
                        >
                            <SearchBar
                                wordEntering={wordEntering}
                                setWordEntering={setWordEntering}
                            />
                            {
                                currentDropMenu === DropMenuTypes.SEARCH &&
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
                        </div> :
                        null
                    }
                    {
                        user.userId.length ?
                            <div className="flex gap-3">
                                <button onClick={() => navigate(RoutesTypes.DASHBOARD)}>
                                    <Home />
                                </button>
                                <button
                                    className="pb-1"
                                    onClick={() => navigate(RoutesTypes.DIRECT)}
                                >
                                    <Direct />
                                </button>
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
                                    {
                                        currentDropMenu === DropMenuTypes.PROFILE &&
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
                            </div>
                    }
                </div>
            </header>
        </>
    )
}

export default Header;