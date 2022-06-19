import { doc, getDoc, onSnapshot, Timestamp, updateDoc } from 'firebase/firestore';
import React, { useEffect, useMemo, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { db, storage } from '../../firebase/firebaseConfig';
import { useAppSelector } from '../../redux/hooks';
import ChatState from '../../types/chat-state-type';
import UserState from '../../types/user-state-type';
import { initialState as initialUser } from "../../redux/features/signedUser";
import Info from '../../svgs/Info';
import MessageType from '../../types/message-type';
import Message from './Message';
import { nanoid } from '@reduxjs/toolkit';
import MessageForm from './MessageForm';
import RoutesTypes from '../../constants/routes-types';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { v4 } from 'uuid';

const ChatRoom: React.FC = () => {
    const loggedUser = useAppSelector(state => state.signedUser.user);
    const { chatId } = useParams();
    const navigate = useNavigate();

    const [secondUser, setSecondUser] = useState<UserState>(initialUser.user)
    const [wordEntering, setWordEntering] = useState<string>("");
    const [imageUpload, setImageUpload] = useState<File | null>(null);
    const [messages, setMessages] = useState<MessageType[]>([]);

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
        let imageUrl = "";
        if(imageUpload){
            const imageRef = ref(storage, `Images/${imageUpload.name + v4()}`)
            await uploadBytes(imageRef, imageUpload)
            imageUrl = await getDownloadURL(imageRef);
        }

        const newMessage = {
            text: wordEntering,
            from: {
                userId: loggedUser.userId,
                profileImage: loggedUser.profileImage,
            },
            createdAt: Timestamp.fromDate(new Date()),
            media: imageUrl
        }

        await updateDoc(doc(db, "chats", chatId as string), {
            messages: [...messages, newMessage],
            lastMessage: {
                text: newMessage.text,
                userId: loggedUser.userId
            },
            lastEdited: new Date().getTime() / 1000
        })

        setImageUpload(null);
        setWordEntering("");
    }

    const messagesToRender = useMemo(() => messages.map(message => <Message
        {...message}
        loggedUserId={loggedUser.userId}
        key={nanoid()}
    />), [messages])

    return (
        <div className="w-full h-full flex flex-col justify-between items-center">
            <div className="flex justify-between items-center border-b h-[60px] pl-8 pr-6 w-full">
                <button
                    className="flex gap-4"
                    onClick={() => navigate(RoutesTypes.DASHBOARD + secondUser.userId)}
                >
                    <img
                        src={secondUser.profileImage.length ? secondUser.profileImage : "../images/default-avatar-gray.jpg"}
                        className="h-6 w-6 rounded-full object-cover"
                    />
                    <p className="font-medium text-sm tracking-wide whitespace-nowrap">{secondUser.username}</p>
                </button>
                <button>
                    <Info />
                </button>
            </div>
            <div className="flex h-[calc(100%-60px)] flex-col justify-end w-full items-center">
                <div className="max-h-[calc(100%-45px-25px)] py-3 overflow-hidden overflow-y-auto w-full no-bar flex flex-col items-center gap-3">
                    {messagesToRender}
                </div>
                <MessageForm
                    wordEntering={wordEntering}
                    setWordEntering={setWordEntering}
                    sendMessage={sendMessage}
                    setImageUpload={setImageUpload}
                    imageUpload={imageUpload}
                />
            </div>
        </div>
    )
}

export default ChatRoom