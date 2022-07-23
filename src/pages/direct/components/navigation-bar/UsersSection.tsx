import React, { useCallback, useMemo } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import RoutesTypes from 'constants/routes-types';
import { useAppSelector } from 'redux-setup/hooks'
import Text from 'svgs/empty/Text';
import ChatLink from './ChatLink';
import UserLoader from 'components/other/UserLoader';
import useChats from 'pages/direct/hooks/useChats';

const UsersSection: React.FC<{ openModal: () => void }> = React.memo(({ openModal }) => {
    const loggedUser = useAppSelector(state => state.signedUser.user);
    const navigate = useNavigate();
    const { chatId } = useParams();

    const chats = useChats(chatId as string)

    const generateSkeletons = useCallback(() => {
        const skeletons = [];
        for (let i = 0; i < 3; i++) {
            skeletons.push(
                <UserLoader
                    key={i}
                    imageStyles={{ width: 60, height: 60, borderRadius: "50%" }}
                    firstTextStyles={{ width: 180, height: 11, borderRadius: "10px" }}
                    secondTextStyles={{ width: 150, height: 11, borderRadius: "10px" }}
                    margin="my-1"
                />
            );
        }
        
        return skeletons
    }, [])

    const chatLinks = useMemo(() => chats.map(chat => <ChatLink
        chatId={chat.firstUserId + "-" + chat.secondUserId}
        userId={loggedUser.userId === chat.firstUserId ? chat.secondUserId : chat.firstUserId}
        lastMessage={chat.lastMessage}
        lastEdited={chat.lastEdited}
        key={loggedUser.userId === chat.firstUserId ? chat.secondUserId : chat.firstUserId}
    />), [chats, loggedUser.userId])

    const navigateToDirect = useCallback(() => {
        navigate(RoutesTypes.DIRECT)
    }, [])

    return (
        <aside className="w-full sm:w-[520px] h-full border-r flex flex-col">
            <div className="flex justify-end items-center h-[60px] border-b pr-4">
                <div
                    className="w-full flex justify-center pl-4"
                >
                    <button
                        className="font-medium"
                        onClick={navigateToDirect}
                    >
                        <p>@{loggedUser.username}</p>
                    </button>
                </div>
                <button
                    onClick={openModal}
                >
                    <Text />
                </button>
            </div>
            <nav className="flex flex-col w-full h-[calc(100%-60px)] overflow-hidden overflow-y-auto">
                {
                    chats.length ?
                        chatLinks :
                        generateSkeletons()
                }
            </nav>
        </aside>
    )
})

export default UsersSection