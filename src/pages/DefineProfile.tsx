import React from 'react'
import { useParams } from 'react-router-dom'
import { useAppSelector } from '../redux/hooks';
import Header from '../components/Header/Header';
import LoggedUsersProfile from '../components/Profile/LoggedUsersProfile';
import UserOnPageProfile from '../components/Profile/UserOnPageProfile';

const DefineProfile: React.FC = () => {
    const { uid } = useParams();
    const signedUser = useAppSelector(state => state.signedUser.user);

    return (
        <>
            <Header />
            {signedUser.userId === uid ?
                <LoggedUsersProfile /> :
                <UserOnPageProfile />}
        </>
    )
}

export default DefineProfile;