import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import RoutesTypes from "constants/routes-types"
import { useAppSelector } from "redux-setup/hooks";
import { useNavigate } from "react-router-dom";
import ProfileDropMenuContainer from "./components/ProfileDropMenuContainer";
import DropMenu from "components/other/DropMenu";
import UsersSearchDropMenu from "./components/UsersSearchDropMenu";
import Home from "svgs/both/Home";
import Direct from "svgs/empty/Direct";
import useWindowWidth from "helpers/hooks/useWindowWidth";
import SearchBar from "./components/SearchBar";
import NewPost from "svgs/both/NewPost";
import Modal from "components/modal/Modal";
import NewPostModal from "./components/new-post-modal/NewPostModal";

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

    const [currentMenu, setCurrentMenu] = useState<string>(MenuTypes.NONE);
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
                        <div
                            className="w-64 h-9 relative"
                            onClick={() => setCurrentMenu(MenuTypes.SEARCH)}
                        >
                            <SearchBar
                                wordEntering={wordEntering}
                                setWordEntering={setWordEntering}
                            />
                            {
                                currentMenu === MenuTypes.SEARCH ?
                                    <DropMenu
                                        closeEvent={event => {
                                            event.stopPropagation();
                                            setCurrentMenu(MenuTypes.NONE)
                                        }}
                                        styles="w-[375px] top-12 left-[-65px] h-96 z-20"
                                    >
                                        <UsersSearchDropMenu
                                            wordEntering={wordEntering}
                                        />
                                    </DropMenu> :
                                    null
                            }
                        </div> :
                        null
                }
                <div className="flex gap-4">
                    <button onClick={() => navigate(RoutesTypes.DASHBOARD)}>
                        <Home />
                    </button>
                    <button
                        className="pb-1 mr-[-3px]"
                        onClick={() => navigate(RoutesTypes.DIRECT)}
                    >
                        <Direct
                            styles="h-6 w-6 text-gray-800 rotate-[55deg]"
                            includeHovering={false}
                        />
                    </button>
                    <button
                        onClick={() => setCurrentMenu(MenuTypes.NEW_POST)}
                    >
                        <NewPost
                            isOpen={currentMenu === MenuTypes.NEW_POST}
                        />
                    </button>
                    <div className="relative flex items-center">
                        <button
                            className="h-7 w-7 cursor-pointer rounded-full"
                            onClick={() => setCurrentMenu(MenuTypes.PROFILE)}
                        >
                            <img
                                src={user.profileImage.length ? user.profileImage : process.env.PUBLIC_URL + "/images/default-avatar-image.jpg"}
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