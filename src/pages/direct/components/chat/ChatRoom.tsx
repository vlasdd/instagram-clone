import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppSelector } from 'redux-setup/hooks';
import Info from 'svgs/both/Info';
import MessageForm from './MessageForm';
import RoutesTypes from 'constants/routes-types';
import RoomMessages from './RoomMessages';
import RoomInfo from './RoomInfo';
import useUserAndMessages from 'pages/direct/hooks/useUserAndMessages';

const ChatRoom: React.FC = React.memo(() => {
    const loggedUser = useAppSelector(state => state.signedUser.user);

    const navigate = useNavigate();

    const [imageUpload, setImageUpload] = useState<File | null>(null);
    const [isInfoOpen, setIsInfoOpen] = useState<boolean>(false);

    const { secondUser, wordEntering, setWordEntering, messages } = useUserAndMessages();

    return (
        <div className="w-full h-full flex flex-col items-center">
            <div className="flex justify-between items-center border-b h-[60px] pl-8 pr-6 w-full">
                {
                    isInfoOpen ?
                        <p className="font-medium whitespace-nowrap ml-[45%]">Details</p> :
                        <button
                            className="flex gap-4"
                            onClick={() => navigate(RoutesTypes.DASHBOARD + secondUser.userId)}
                        >
                            <img
                                src={secondUser.profileImage.length ? secondUser.profileImage : process.env.PUBLIC_URL + "/images/default-avatar-gray.jpg"}
                                className="h-6 w-6 rounded-full object-cover"
                            />
                            <p className="font-medium text-sm tracking-wide whitespace-nowrap">{secondUser.username}</p>
                        </button>
                }
                <button onClick={() => setIsInfoOpen(prevVal => !prevVal)}>
                    <Info
                        isOpen={isInfoOpen}
                    />
                </button>
            </div>
            {
                isInfoOpen ?
                    <RoomInfo
                        secondUser={secondUser}
                        messages={messages}
                    /> :
                    <div className="flex h-[calc(100%-60px)] flex-col justify-end w-full items-center">
                        <RoomMessages
                            messages={messages}
                            loggedUserId={loggedUser.userId}
                            profileImage={secondUser.profileImage}
                        />
                        <MessageForm
                            wordEntering={wordEntering}
                            setWordEntering={setWordEntering}
                            messages={messages}
                            setImageUpload={setImageUpload}
                            imageUpload={imageUpload}
                        />
                    </div>
            }
        </div>
    )
})

export default ChatRoom