import UserLoader from 'components/other/UserLoader';
import RoutesTypes from 'constants/routes-types';
import useSuggestions from 'pages/dashboard/hooks/useSuggestions';
import React, { useMemo } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useAppSelector } from 'redux-setup/hooks';
import Suggestion from './components/Suggestion';

const SUGGESTIONS_LENGTH = 5;

const Sidebar: React.FC = React.memo(() => {
    const loggedUser = useAppSelector(state => state.signedUser.user);
    const navigate = useNavigate();

    const suggestionsInfo = useSuggestions(SUGGESTIONS_LENGTH)

    const generateSkeletons = () => {
        const skeletons = [];
        for (let i = 0; i < SUGGESTIONS_LENGTH; i++) {
            skeletons.push(
                <UserLoader
                    key={i}
                    imageStyles={{ width: 32, height: 32, borderRadius: "50%" }}
                    firstTextStyles={{ width: 120, height: 7, borderRadius: "10px" }}
                    secondTextStyles={{ width: 80, height: 7, borderRadius: "10px" }}
                    margin="ml-[-13px]"
                />
            );
        }

        return skeletons
    }

    const users = useMemo(() => suggestionsInfo.map(data => (
        <Suggestion
            {...data}
            key={data.userId + "suggestion"}
            isFollowing={data.following.some(user => user.userId === loggedUser.userId)}
        />
    )), [suggestionsInfo])

    return (
        <aside className="flex flex-col gap-4 w-[325px]">
            <div className="flex w-full h-13 mb-1 px-3 justify-between items-center my-[4px]">
                <button
                    className="w-full h-full py-[0.5px] gap-2 flex items-center"
                    onClick={() => navigate(RoutesTypes.DASHBOARD + loggedUser.userId)}
                >
                    <img
                        src={loggedUser.profileImage.length ? loggedUser.profileImage : process.env.PUBLIC_URL + "/images/default-avatar-gray.jpg"}
                        className="h-11 w-11 rounded-full object-cover"
                    />
                    <div className="flex flex-col items-start">
                        <p className="font-medium text-sm tracking-wide whitespace-nowrap">{loggedUser.username}</p>
                        <p className="text-gray-400 text-sm whitespace-nowrap">{loggedUser.fullName}</p>
                    </div>
                </button>
                <button
                    className="h-7 rounded text-cyan-500 text-sm font-medium cursor-pointer"
                >
                    Switch
                </button>
            </div>
            <div className="flex w-full justify-between px-3">
                <p className="text-gray-500 font-medium text-sm">Suggestions For You</p>
                <Link
                    className="text-sm font-medium"
                    to={RoutesTypes.PEOPLE}
                >
                    See All
                </Link>
            </div>
            <div className="flex flex-col gap-2 px-3">
                {
                    users.length !== 0 ?
                        users :
                        generateSkeletons()
                }
            </div>
            <div className="flex flex-col gap-4 text-xs text-gray-300 px-3">
                <div className="flex flex-wrap gap-2">
                    <p>About</p>
                    <p>Help</p>
                    <p>Press</p>
                    <p>API</p>
                    <p>Jobs</p>
                    <p>Privacy</p>
                    <p>Terms</p>
                    <p>Location</p>
                    <p>Language</p>
                </div>
                <p className="text-xs text-gray-300">© 2022 INSTAGRAM FROM META</p>
            </div>
        </aside>
    )
})

export default Sidebar