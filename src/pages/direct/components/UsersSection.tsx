import { collection, getDocs, onSnapshot, query, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import RoutesTypes from '../../../constants/routes-types';
import { db } from '../../../firebase/firebaseConfig';
import { useAppSelector } from '../../../redux/hooks'
import Text from '../../../svgs/empty/Text';
import ChatLink from './ChatLink';
import ChatState from '../../../types/chat-state-type';
import UserLoader from '../../../components/other/UserLoader';
import { nanoid } from '@reduxjs/toolkit';

const UsersSection: React.FC<{ openModal: () => void }> = ({ openModal }) => {
    const loggedUser = useAppSelector(state => state.signedUser.user);
    const navigate = useNavigate();
    const { chatId } = useParams();

    const [chats, setChats] = useState<ChatState[]>([]);

    useEffect(() => {
        const getChats = async () => {
            const chatsRef = collection(db, "chats");
            const q1 = query(chatsRef, where("firstUserId", "==", loggedUser.userId));
            const q2 = query(chatsRef, where("secondUserId", "==", loggedUser.userId));

            const querySnapshot1 = await getDocs(q1);
            const querySnapshot2 = await getDocs(q2);
            const querySnapshot = querySnapshot1.docs
                .map(doc => doc.data())
                .concat(querySnapshot2.docs.map(doc => doc.data()))
                
            const chatsObjs = querySnapshot.map(doc => {
                return ({
                    firstUserId: doc.firstUserId,
                    secondUserId: doc.secondUserId, 
                    messages: doc.messsages,
                    lastMessage: doc.lastMessage,
                    lastEdited: doc.lastEdited
                })
            })

            setChats(chatsObjs.sort((a, b) => b.lastEdited - a.lastEdited))
        }

        onSnapshot(query(collection(db, "chats"), where("firstUserId", "==", loggedUser.userId)), async () => {
            console.log("section snapshot")
            await getChats();
        })

        onSnapshot(query(collection(db, "chats"), where("secondUserId", "==", loggedUser.userId)), async () => {
            console.log("section snapshot")
            await getChats();
        })
    }, [loggedUser.userId, chatId])

    const generateSkeletons = () => {
        const skeletons = [];
        for (let i = 0; i < 3; i++) {
            skeletons.push(
                <UserLoader
                    key={nanoid()}
                    imageStyles={{ width: 60, height: 60, borderRadius: "50%" }}
                    firstTextStyles={{ width: 180, height: 11, borderRadius: "10px" }}
                    secondTextStyles={{ width: 150, height: 11, borderRadius: "10px" }}
                    margin="my-1"
                />
            );
        }

        return skeletons
    }

    return (
        <div className="w-full sm:w-[520px] h-full border-r flex flex-col">
            <div className="flex justify-end items-center h-[60px] border-b pr-4">
                <div
                    className="w-full flex justify-center pl-4"
                >
                    <button
                        className="font-medium"
                        onClick={() => navigate(RoutesTypes.DIRECT)}
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
            <div className="flex flex-col w-full h-[calc(100%-60px)] overflow-hidden overflow-y-auto">
                {
                    chats.length ?
                        chats.map(chat => <ChatLink
                            chatId={chat.firstUserId + "-" + chat.secondUserId}
                            userId={loggedUser.userId === chat.firstUserId ? chat.secondUserId : chat.firstUserId}
                            lastMessage={chat.lastMessage}
                            key={loggedUser.userId === chat.firstUserId ? chat.secondUserId : chat.firstUserId}
                        />) :
                        generateSkeletons()
                }
            </div>
        </div>
    )
}

export default UsersSection