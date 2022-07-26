import React, { useCallback, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import RoutesTypes from "constants/routes-types"
import { useAppSelector } from "redux-setup/hooks";
import { useNavigate } from "react-router-dom";
import ProfileDropMenuContainer from "./components/profile-drop-menu/ProfileDropMenuContainer";
import DropMenu from "components/other/DropMenu";
import UsersSearchDropMenu from "./components/search/UsersSearchDropMenu";
import Home from "svgs/both/Home";
import Direct from "svgs/empty/Direct";
import useWindowWidth from "helpers/hooks/useWindowWidth";
import SearchBar from "./components/search/SearchBar";
import NewPost from "svgs/both/NewPost";
import Modal from "components/modal/Modal";
import NewPostModal from "./components/new-post-modal/NewPostModal";
import Fire from "svgs/both/Fire";
import FilledDirect from "svgs/filled/FilledDirect";

enum MenuTypes{
    NONE = "",
    PROFILE = "profile",
    SEARCH = "search",
    NEW_POST = "newPost",
}

const Header: React.FC = React.memo(() => {
    const user = useAppSelector(state => state.signedUser.user);
    const navigate = useNavigate();
    const location = useLocation();

    const [currentMenu, setCurrentMenu] = useState<MenuTypes>(MenuTypes.NONE);
    const [wordEntering, setWordEntering] = useState<string>("");

    const innerWidth = useWindowWidth();
    
    useEffect(() => {
        setCurrentMenu(MenuTypes.NONE);
    }, [location])

    const generateModal = () => {
        switch (currentMenu) {
            case MenuTypes.PROFILE: {
                return (
                    <DropMenu
                        closeEvent={() => setCurrentMenu(MenuTypes.NONE)}
                        styles="w-56 left-[-168px] top-11"
                    >
                        <ProfileDropMenuContainer />
                    </DropMenu>
                )
            }
            case MenuTypes.NEW_POST: {
                return (
                    <Modal
                        closeEvent={() => setCurrentMenu(MenuTypes.NONE)}
                        styles="h-[500px] top-[14%] w-"
                    >
                        <NewPostModal closeEvent={() => setCurrentMenu(MenuTypes.NONE)}/>
                    </Modal>
                )
            }
            default: {
                return null;
            }
        }
    }

    const closeEvent = useCallback((event: any) => {
        event.stopPropagation();
        setCurrentMenu(MenuTypes.NONE)
    }, [])

    const setMenuToSearch = useCallback(() => {
        setCurrentMenu(MenuTypes.SEARCH)
    }, [])

    const navigateToDashboard = useCallback(() => {
        navigate(RoutesTypes.DASHBOARD)
    }, [])

    const navigateToDirect = useCallback(() => {
        navigate(RoutesTypes.DIRECT)
    }, [])

    const setMenuToNewPost = useCallback(() => {
        setCurrentMenu(MenuTypes.NEW_POST)
    }, [])

    const navigateToExplore = useCallback(() => {
        navigate(RoutesTypes.EXPLORE)
    }, [])

    const setMenuToProfile = useCallback(() => {
        setCurrentMenu(MenuTypes.PROFILE)
    }, [])

    return (
        <header className="w-screen py-2 flex items-center justify-center border-b border-gray-200 bg-white">
            <div className="w-11/12 flex items-center justify-evenly">
                <Link to={RoutesTypes.DASHBOARD}>
                    <img
                        src={process.env.PUBLIC_URL + "/images/instagram-logo.webp"}
                        className="h-10"
                    />
                </Link>
                {
                    innerWidth > 640 ?
                        <div className="w-64 h-9 relative" onClick={setMenuToSearch}>
                            <SearchBar
                                wordEntering={wordEntering}
                                setWordEntering={setWordEntering}
                            />
                            {
                                currentMenu === MenuTypes.SEARCH ?
                                    <DropMenu
                                        closeEvent={closeEvent}
                                        styles="w-[375px] top-12 left-[-65px] h-96 z-20"
                                    >
                                        <UsersSearchDropMenu wordEntering={wordEntering} />
                                    </DropMenu> :
                                    null
                            }
                        </div> :
                        null
                }
                <div className="flex gap-4">
                    <button onClick={navigateToDashboard}>
                        <Home />
                    </button>
                    <button className="pb-1 mr-[-3px]" onClick={navigateToDirect}>
                        {
                            location.pathname.includes(RoutesTypes.DIRECT) ?
                                <FilledDirect styles="h-6 w-6 text-gray-800 rotate-[55deg]" /> :
                                <Direct
                                    styles="h-6 w-6 text-gray-800 rotate-[55deg]"
                                    includeHovering={false}
                                />
                        }
                    </button>
                    <button onClick={setMenuToNewPost}>
                        <NewPost isOpen={currentMenu === MenuTypes.NEW_POST} />
                    </button>
                    <button onClick={navigateToExplore}>
                        <Fire />
                    </button>
                    <div className="relative flex items-center">
                        <button
                            className="h-7 w-7 cursor-pointer rounded-full"
                            onClick={setMenuToProfile}
                        >
                            <img
                                src={
                                    user.profileImage.length ?
                                        user.profileImage :
                                        process.env.PUBLIC_URL + "/images/default-avatar-image.jpg"
                                }
                                className="rounded-full h-7 w-7 object-cover"
                            />
                        </button>
                        {generateModal()}
                    </div>
                </div>
            </div>
        </header>
    )
})

export default Header;