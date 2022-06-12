import { doc, getDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { Link, Navigate, Outlet, useNavigate, useParams } from 'react-router-dom';
import AccountsRoutes from '../../constants/accounts-routes';
import ProfileRoutes from '../../constants/profile-routes';
import RoutesTypes from '../../constants/routes-types';
import { db } from '../../firebase/firebaseConfig';
import { setSignedUser } from '../../redux/features/signedUser';
import { setUserOnPage } from '../../redux/features/userOnPage';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import UserState from '../../types/user-state-type';
import Modal from '../Modal';
import ChangeImageModal from './ChangeImageModal';
import ProfileNavBar from './ProfileNavBar';

const LoggedUsersProfile: React.FC = () => {
    const signedUser = useAppSelector(state => state.signedUser.user);
    const dispatch = useAppDispatch();

    const { uid } = useParams();
    const navigate = useNavigate();

    const [shouldRedirect, setShouldRedirect] = useState<boolean>(false);
    const [isImageModalOpen, setIsImageModalOpen] = useState<boolean>(false);

    useEffect(() => {
        console.log("use effect logged user page")
        const getUser = async () => {
            const loggedUser = await getDoc(doc(db, "users", uid as string));

            if (!loggedUser.data()) {
                setShouldRedirect(true);
                return;
            }

            dispatch(setUserOnPage(loggedUser.data() as UserState))
            dispatch(setSignedUser(loggedUser.data() as UserState));
        }

        getUser();
    }, [uid])

    return (
        shouldRedirect ?
            <Navigate to={RoutesTypes.NOT_FOUND} /> :
            <div className="h-[calc(100vh-56px)] w-screen flex flex-col items-center back">
                <div className="flex items-center flex-col sm:flex-row w-full sm:w-3/4 lg:w-5/6 xl:w-4/5 justify-center gap-2 pt-4 pb-3 px-1">
                    <div className="w-full sm:w-2/5 sm:h-60 flex justify-center items-center">{/*w-2/5 max-w-xs h-full flex justify-center*/}
                        <img
                            src={signedUser.profileImage.length ? signedUser.profileImage : "../images/default-avatar-gray.jpg"}
                            className="rounded-full w-[170px] h-[170px] object-cover cursor-pointer"//w-full sm:w-4/5 max-w-[170px]
                            onClick={() => setIsImageModalOpen(true)}
                        />
                    </div>
                    <div className="flex flex-col w-5/6 sm:w-3/5 py-4 gap-6">
                        <div className="flex gap-4">
                            <p className="text-3xl font-extralight">{signedUser.username}</p>
                            <div className="flex items-center gap-4">
                                <Link
                                    to={RoutesTypes.ACOUNTS + "/" + AccountsRoutes.EDIT_PROFILE}
                                    className="p-1 border rounded font-medium text-sm tracking-wide"
                                >
                                    Edit Profile
                                </Link>
                                <button>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                        <div className="flex gap-2 sm:gap-8">
                            <div className="flex gap-1 items-center flex-col sm:flex-row">
                                <p className="font-medium">{signedUser.posts.length}</p>
                                <p>{`post${signedUser.posts.length === 1 ? "" : "s"}`}</p>
                            </div>
                            <button
                                onClick={(event) => {
                                    event.stopPropagation();
                                    navigate(ProfileRoutes.FOLLOWERS)
                                }}
                                className="flex gap-1 items-center flex-col sm:flex-row"
                            >
                                <p className="font-medium">{signedUser.followers.length}</p>
                                <p>{`follower${signedUser.followers.length === 1 ? "" : "s"}`}</p>
                            </button>
                            <button
                                onClick={(event) => {
                                    event.stopPropagation();
                                    navigate(ProfileRoutes.FOLLOWING)
                                }}
                                className="flex gap-1 items-center flex-col sm:flex-row"
                            >
                                <p className="font-medium">{signedUser.following.length}</p>
                                <p>following</p>
                            </button>
                        </div>
                        <p className="font-medium">{signedUser.fullName}</p>
                        <div className="flex"></div>
                    </div>
                </div>
                {isImageModalOpen &&
                    <Modal
                        closeEvent={() => setIsImageModalOpen(false)}
                        styles={`top-[35%] ${signedUser.profileImage.length ? "h-72" : "h-60"}`}
                    >
                        <ChangeImageModal
                            closeEvent={() => setIsImageModalOpen(false)}
                        />
                    </Modal>
                }
                <ProfileNavBar isUsersPage={true}/>
                <Outlet />
            </div>
    )
}

export default LoggedUsersProfile