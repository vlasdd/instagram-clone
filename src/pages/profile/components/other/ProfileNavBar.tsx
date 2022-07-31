import React, { useCallback, useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import ProfileRoutes from 'constants/profile-routes';
import Posts from 'svgs/empty/Posts';
import Saved from 'svgs/empty/Saved';

const ProfileNavBar: React.FC<{ isUsersPage: boolean }> = React.memo(({ isUsersPage }) => {
    const navigate = useNavigate();
    const location = useLocation();

    const defineLocation = useCallback(() => {
        const pathNameArray = location.pathname.split("/");
        switch(pathNameArray[pathNameArray.length - 1]){
            case ProfileRoutes.SAVED: {
                return 1;
            }
            default: {
                return 0;
            }
        }
    }, [location.pathname])

    const [currentTab, setCurrentTab] = useState<number>(defineLocation());

    useEffect(() => {
        setCurrentTab(defineLocation());
    }, [location.pathname])

    const handlePostNavigate = () => {
        navigate(ProfileRoutes.POSTS);
        setCurrentTab(0);
    }

    const handleSavedNavigate = () => {
        navigate(ProfileRoutes.SAVED);
        setCurrentTab(1);
    }

    return (
        <nav className="flex border-t justify-center items-center border-t-gray-300 gap-12 lg:gap-16 text-[12px] font-medium tracking-widest w-full sm:w-3/4 lg:w-2/3 max-w-[1000px]">
            <button
                onClick={handlePostNavigate}
                className={`
                    h-12 flex items-center text-gray-400 gap-1 
                    ${currentTab === 0 && "border-t border-t-gray-900 text-black"}
                `}
            >
                <Posts />
                <p>POSTS</p>
            </button>
            {
                isUsersPage ?
                    <button
                        onClick={handleSavedNavigate}
                        className={`
                            h-12 flex items-center text-gray-400 gap-1  
                            ${currentTab === 1 && "border-t border-t-gray-900 text-black"}
                        `}
                    >
                        <Saved
                            styles="w-4 h-4"
                            includeHovering={false}
                        />
                        <p>SAVED</p>
                    </button> :
                    null
            }
        </nav>
    )
})

export default ProfileNavBar