import { doc, getDoc, onSnapshot, updateDoc } from 'firebase/firestore';
import React, { useCallback, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { db, storage } from 'firebase-setup/firebaseConfig';
import { useAppDispatch, useAppSelector } from 'redux-setup/hooks';
import ChatState from 'types/chatStateType';
import UserState from 'types/userStateType';
import { initialState as initialUser } from "redux-setup/features/signedUser";
import Info from 'svgs/both/Info';
import MessageType from 'types/messageType';
import MessageForm from './MessageForm';
import RoutesTypes from 'constants/routes-types';
import RoomMessages from './RoomMessages';
import RoomInfo from './RoomInfo';
import createMessage from 'apis/createMessage';

const ChatRoom: React.FC = React.memo(() => {
    const loggedUser = useAppSelector(state => state.signedUser.user);

    const { chatId } = useParams();
    const navigate = useNavigate();

    const [secondUser, setSecondUser] = useState<UserState>(initialUser.user)
    const [wordEntering, setWordEntering] = useState<string>("");
    const [imageUpload, setImageUpload] = useState<File | null>(null);
    const [messages, setMessages] = useState<MessageType[]>([]);
    const [isInfoOpen, setIsInfoOpen] = useState<boolean>(false);

    useEffect(() => {
        const getUserAndMessages = async () => {
            if (chatId) {
                const uids = chatId.split("-");
                const secondUserId = uids[1] === loggedUser.userId ? uids[0] : uids[1];

                const dataBaseUser = await getDoc(doc(db, "users", secondUserId));
                setSecondUser(dataBaseUser.data() as UserState);

                onSnapshot(doc(db, "chats", chatId as string), (doc) => {
                    const chatData = doc.data() as ChatState;
                    setMessages(chatData.messages);
                    setWordEntering("");
                })
            }
        }

        getUserAndMessages();
    }, [chatId, loggedUser])

    const sendMessage = async () => {
        if(!wordEntering.length){
            return;
        }

        createMessage({ 
            imageUpload, 
            wordEntering, 
            loggedUserId: loggedUser.userId, 
            chatId: chatId as string, 
            messages 
        })

        setImageUpload(null);
        setWordEntering("");
    }

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
                <button
                    onClick={() => setIsInfoOpen(prevVal => !prevVal)}
                >
                    <Info
                        isOpen={isInfoOpen}
                    />
                </button>
            </div>
            {
                isInfoOpen ?
                    <RoomInfo
                        userId={secondUser.userId}
                        username={secondUser.username}
                        fullName={secondUser.fullName}
                        profileImage={secondUser.profileImage}
                        chatId={chatId as string}
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
                            sendMessage={sendMessage}
                            setImageUpload={setImageUpload}
                            imageUpload={imageUpload}
                        />
                    </div>
            }
        </div>
    )
})

export default ChatRoom