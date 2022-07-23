import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import getUsers from 'helpers/other/get-users/getUsers';
import { useAppSelector } from 'redux-setup/hooks';
import Close from 'svgs/empty/Close'
import UserState from 'types/userStateType';
import UserSuggestion from 'types/userSuggestionType';
import UserToWriteTo from 'pages/direct/components/navigation-bar/UserToWriteTo';
import useChatRoom from 'helpers/hooks/useChatRoom';
import PostType from 'types/postType';
import sharePost from 'apis/sharePost';

type SharePostModalProps = {
    closeEvent: () => void,
    currentPost: PostType
}

const SharePostModal: React.FC<SharePostModalProps> = React.memo(({ closeEvent, currentPost }) => {
    const signedUser = useAppSelector(state => state.signedUser.user);

    const [wordEntering, setWordEntering] = useState<string>("");
    const [messageEntering, setMessageEntering] = useState<string>("");
    const [chosenUsers, setChosenUsers] = useState<UserSuggestion[]>([]);
    const [filteredUsers, setFilteredUsers] = useState<UserState[]>([]);

    const { createChatRoom } = useChatRoom();

    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        const handler = setTimeout(async () => {
            await getUsers(wordEntering, setFilteredUsers);
            setFilteredUsers(prevUsers => prevUsers.filter(user => user.username !== signedUser.username));
        }, 300)

        return () => clearTimeout(handler);
    }, [wordEntering])

    const sendMessages = async (chatId: string) => {
        await sharePost({currentPost, signedUserId: signedUser.userId, chatId, messageEntering})
        closeEvent();
    }

    const handleChosenClick = useCallback((chosenUser: UserSuggestion) => {
        setChosenUsers(prevUsers => prevUsers.filter(user => user.username !== chosenUser.username))
        if (inputRef.current !== null) {
            inputRef.current.focus();
        }
    }, [inputRef.current])

    const chosenUsersElements = useMemo(() => chosenUsers.map(chosenUser => (
        <div
            className="bg-blue-100 flex rounded p-2"
            key={chosenUser.userId}
        >
            <button
                className="flex gap-1"
                onClick={() => handleChosenClick(chosenUser)}
            >
                <p className="text-cyan-500 text-sm ">{chosenUser.username}</p>
                <Close
                    styles="w-5 h-5 text-cyan-500"
                />
            </button>
        </div>
    )), [chosenUsers])

    const addUserToList = useCallback((doc: UserState) => {
        setChosenUsers(prevUsers => [...prevUsers, doc]);
        setWordEntering("");
        if (inputRef.current !== null) {
            inputRef.current.focus();
        }
    }, [inputRef.current])

    const removeUserFromList = useCallback((doc: UserState) => {
        setChosenUsers(prevUsers => prevUsers.filter(user => user.username !== doc.username))
        if (inputRef.current !== null) {
            inputRef.current.focus();
        }
    }, [inputRef.current])

    const filteredUsersElements = useMemo(() => filteredUsers.map(doc => <UserToWriteTo
        addUserToList={() => addUserToList(doc)}
        removeUserFromList={() => removeUserFromList(doc)}
        isUserInList={chosenUsers.some(user => user.username === doc.username)}
        {...doc}
        key={doc.userId}
    />), [filteredUsers, inputRef, chosenUsers])

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            createChatRoom({ chosenUserId: chosenUsers[0].userId, closeEvent: sendMessages });
        }
    }

    const handleWordEntering = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        setWordEntering(event.target.value)
    }, [])

    const handleMessageEntering = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        setMessageEntering(event.target.value)
    }, [])

    const createRoom = () => {
        createChatRoom({ chosenUserId: chosenUsers[0].userId, closeEvent: sendMessages })
    }

    return (
        <div className="w-full h-full flex flex-col justify-between">
            <div className="flex flex-col w-full">
                <div className="h-11 w-full flex justify-center items-center font-medium border-b relative ">
                    <p>Share</p>
                    <button
                        className="absolute right-2"
                        onClick={closeEvent}
                    >
                        <Close
                            styles="w-7 h-7"
                        />
                    </button>
                </div>
                <div className="w-full max-h-[175px] flex border-b p-3 items-start gap-5">
                    <p className="font-medium mt-[6px]">To:</p>
                    <div className="w-full h-full flex flex-col items-start gap-2 overflow-hidden overflow-y-auto">
                        {chosenUsersElements}
                        <input
                            className="w-full p-2 rounded-lg placeholder:font-light placeholder:text-gray-400 placeholder:text-sm relative text-sm"
                            type="text"
                            placeholder="Search..."
                            value={wordEntering}
                            onChange={handleWordEntering}
                            ref={inputRef}
                        />
                    </div>
                </div>
                <div className="flex flex-col overflow-hidden overflow-y-auto">
                    {
                        !filteredUsers.length ?
                            <p className="font-medium text-sm pl-3 mt-2">No Suggested</p> :
                            filteredUsersElements
                    }
                </div>
            </div>
            <div className="flex flex-col">
                <input
                    type="text"
                    value={messageEntering}
                    placeholder="Write a message..."
                    onChange={handleMessageEntering}
                    onKeyDown={handleKeyDown}
                    className="mx-[15px] my-[10px] placeholder:font-light placeholder:text-gray-400 placeholder:text-sm text-sm"
                />
                <button
                    className={`${chosenUsers.length === 0 ? "bg-blue-300" : "bg-blue-500"} h-10 mx-[15px] mb-[15px] mt-[10px] rounded flex justify-center items-center font-medium text-white`}
                    onClick={createRoom}
                    disabled={chosenUsers.length === 0}
                >
                    Send
                </button>
            </div>
        </div>
    )
})

export default SharePostModal