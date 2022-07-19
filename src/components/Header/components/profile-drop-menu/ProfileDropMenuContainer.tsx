import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import ProfileRoutes from 'constants/profile-routes';
import RoutesTypes from 'constants/routes-types';
import { removeSignedUser } from 'redux-setup/features/signedUser';
import { useAppDispatch, useAppSelector } from 'redux-setup/hooks';
import ProfileDropMenuElement from './ProfileDropMenuElement';
import { signOut } from 'firebase/auth';
import { auth } from 'firebase-setup/firebaseConfig';
import Profile from 'svgs/empty/Profile';
import Saved from 'svgs/empty/Saved';
import Settings from 'svgs/empty/Settings';
import SwitchAccounts from 'svgs/empty/SwitchAccounts';
import AccountsRoutes from 'constants/accounts-routes';

const ProfileDropMenuContainer: React.FC = React.memo(() => {
    const dispatch = useAppDispatch();
    const user = useAppSelector(state => state.signedUser.user);
    const navigate = useNavigate();

    const handleLogout = useCallback(async () => {
        await signOut(auth);
        dispatch(removeSignedUser());
        navigate(RoutesTypes.LOGIN);
    }, [auth])

    return (
        <>
            <ProfileDropMenuElement
                image={<Profile styles="h-5 w-5 text-gray-700" />}
                text="Profile"
                callback={() => navigate(RoutesTypes.DASHBOARD + user.userId)}
            />
            <ProfileDropMenuElement
                image={(
                    <Saved
                        styles="h-5 w-5 text-gray-700"
                        includeHovering={false}
                    />
                )}
                text="Saved"
                callback={() => navigate(RoutesTypes.DASHBOARD + user.userId + "/" + ProfileRoutes.SAVED)}
            />
            <ProfileDropMenuElement
                image={<Settings styles="h-5 w-5 text-gray-700" />}
                text="Settings"
                callback={() => navigate(RoutesTypes.ACOUNTS + "/" + AccountsRoutes.EDIT_PROFILE)}
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
})

export default ProfileDropMenuContainer;