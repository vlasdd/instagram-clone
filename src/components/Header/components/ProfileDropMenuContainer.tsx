import React from 'react';
import { useNavigate } from 'react-router-dom';
import ProfileRoutes from '../../../constants/profile-routes';
import RoutesTypes from '../../../constants/routes-types';
import { removeSignedUser } from '../../../redux/features/signedUser';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import ProfileDropMenuElement from './ProfileDropMenuElement';
import { signOut } from 'firebase/auth';
import { auth } from '../../../firebase/firebaseConfig';
import Profile from '../../../svgs/Profile';
import Saved from '../../../svgs/Saved';
import Settings from '../../../svgs/Settings';
import SwitchAccounts from '../../../svgs/SwitchAccounts';

const ProfileDropMenuContainer: React.FC = () => {
    const dispatch = useAppDispatch();
    const user = useAppSelector(state => state.signedUser.user);
    const navigate = useNavigate();

    const handleLogout = async () => {
        await signOut(auth);
        dispatch(removeSignedUser());
        navigate(RoutesTypes.LOGIN);
    }
    //w-56 bg-white flex flex-col items-center rounded-md drop-shadow-md relative
    //w-screen h-screen bg-[rgba(0,0,0,0.6)] fixed top-0 right-0 
    return (
        <>
            <ProfileDropMenuElement
                image={<Profile styles="h-5 w-5 text-gray-700"/>} 
                text="Profile"
                callback={() => {
                    navigate(RoutesTypes.DASHBOARD + user.userId)
                }}
            />
            <ProfileDropMenuElement
                image={<Saved styles="h-5 w-5 text-gray-700"/>} 
                text="Saved"
                callback={() => {
                    navigate(RoutesTypes.DASHBOARD + user.userId + "/" + ProfileRoutes.SAVED)
                }}
            />
            <ProfileDropMenuElement
                image={<Settings styles="h-5 w-5 text-gray-700"/>} 
                text="Settings"
                callback={() => console.log("clicked")}
            />
            <ProfileDropMenuElement
                image={<SwitchAccounts />} 
                text="Switch Accounts"
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