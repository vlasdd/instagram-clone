import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import ProfileRoutes from '../../constants/profile-routes';

const ProfileNavBar: React.FC<{ isUsersPage: boolean }> = ({ isUsersPage }) => {
    const navigate = useNavigate();
    const location = useLocation();

    const defineLocation = () => {
        const pathNameArray = location.pathname.split("/");
        switch(pathNameArray[pathNameArray.length - 1]){
            case ProfileRoutes.SAVED: {
                return 1;
            }
            case ProfileRoutes.TAGGED: {
                return 2;
            }
            default: {
                return 0;
            }
        }
    }

    const [currentTab, setCurrentTab] = useState<number>(defineLocation());

    useEffect(() => {
        setCurrentTab(defineLocation());
    }, [location.pathname])

    return (
        <div className="flex border-t justify-center items-center border-t-gray-300 gap-12 lg:gap-16 text-[12px] font-medium tracking-widest w-full sm:w-3/4 lg:w-2/3">
            <button
                onClick={() => {
                    navigate(ProfileRoutes.POSTS);
                    setCurrentTab(0);
                }}
                className={`h-12 flex items-center text-gray-400 gap-1 ${currentTab === 0 && "border-t border-t-gray-900 text-black"}`}
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                </svg>
                <p>POSTS</p>
            </button>
            {isUsersPage ?
                <button
                    onClick={() => {
                        navigate(ProfileRoutes.SAVED);
                        setCurrentTab(1);
                    }}
                    className={`h-12 flex items-center text-gray-400 gap-1  ${currentTab === 1 && "border-t border-t-gray-900 text-black"}`}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                    </svg>
                    <p>SAVED</p>
                </button> :
                null
            }
            <button
                onClick={() => {
                    navigate(ProfileRoutes.TAGGED);
                    setCurrentTab(2);
                }}
                className={`h-12 flex items-center text-gray-400 gap-1 ${currentTab === 2 && "border-t border-t-gray-900 text-black"}`}
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p>TAGGED</p>
            </button>
        </div>
    )
}

export default ProfileNavBar