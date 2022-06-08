import React from 'react';
import { useNavigate } from 'react-router-dom';
import ProfileRoutes from '../../constants/profile-routes';
import RoutesTypes from '../../constants/routes-types';
import { removeActiveUser } from '../../redux/features/user';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import ProfileDropMenuElement from './ProfileDropMenuElement';
import { motion } from "framer-motion";

const ProfileDropMenuContainer: React.FC = () => {
    const dispatch = useAppDispatch();
    const user = useAppSelector(state => state.currentUser.user);
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(removeActiveUser());
        navigate(RoutesTypes.LOGIN);
    }
    //w-56 bg-white flex flex-col items-center rounded-md drop-shadow-md relative
    //w-screen h-screen bg-[rgba(0,0,0,0.6)] fixed top-0 right-0 
    return (
        <>
            <ProfileDropMenuElement
                image={
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                } text="Profile"
                callback={() => {
                    navigate(RoutesTypes.DASHBOARD + user.userId)
                }}
            />
            <ProfileDropMenuElement
                image={
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                    </svg>
                } text="Saved"
                callback={() => {
                    navigate(RoutesTypes.DASHBOARD + user.userId + "/" + ProfileRoutes.SAVED)
                }}
            />
            <ProfileDropMenuElement
                image={
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                } text="Settings"
                callback={() => console.log("clicked")}
            />
            <ProfileDropMenuElement
                image={
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                    </svg>
                } text="Switch Accounts"
                callback={() => console.log("clicked")}
            />
            <div className="w-full border-t-2"></div>
            <ProfileDropMenuElement
                text="Log Out"
                callback={handleLogout}
            />
            <div className="w-4 h-4 absolute bg-white rotate-45 top-[-8px] right-8 "></div>
        </>
    )
}

export default ProfileDropMenuContainer;