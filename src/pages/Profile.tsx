import React from 'react'
import { Navigate, Outlet, Link } from 'react-router-dom';
import Header from '../components/Header';
import ProfileNavBar from '../components/Profile/ProfileNavBar';
import AccountsRoutes from '../constants/accounts-routes';
import RoutesTypes from '../constants/routes-types';
import { useAppSelector } from '../redux/hooks';

const Profile: React.FC = () => {
    const user = useAppSelector(state => state.currentUser.user);

    if (!user.userId.length) {
        return <Navigate to={RoutesTypes.LOGIN} />
    }

    return (
        <div className=" h-screen w-screen flex flex-col items-center back ">
            <Header />
            <div className="flex w-full sm:w-3/4 lg:w-4/5 justify-center h-64 px-2 gap-4">
                <div className="w-2/5 max-w-xs h-full flex items-center justify-center">
                    <img 
                       src={user.profileImage.length ? user.profileImage : "../images/default-avatar-gray.jpg"}
                       className="rounded-full"
                    />
                </div>
                <div className="flex flex-col w-3/5 py-4">
                    <div className="flex items-center gap-4">
                        <p className="text-2xl font-light">{user.username}</p>
                        <Link
                            to={RoutesTypes.ACOUNTS + "/" + AccountsRoutes.EDIT_PROFILE}
                            className="p-1 border rounded font-medium text-sm tracking-wide"
                        >Edit Profile</Link>
                        <button>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                        </button>
                    </div>
                    <div className="flex">
                        <div className="flex"></div>
                    </div>
                    <div className="flex"></div>
                </div>
            </div>
            <ProfileNavBar/>
            <Outlet />
        </div>

    )
}

export default Profile