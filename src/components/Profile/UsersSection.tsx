import { collection, getDocs, onSnapshot, query, where } from 'firebase/firestore';
import React, { useEffect, useMemo, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import RoutesTypes from '../../constants/routes-types';
import { db } from '../../firebase/firebaseConfig';
import { useAppSelector } from '../../redux/hooks'
import Text from '../../svgs/Text';
import ChatLink from '../direct/ChatLink';
import ChatState from '../../types/chat-state-type';

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
                
            setChats(querySnapshot.map(doc => {
                return ({
                    firstUserId: doc.firstUserId,
                    secondUserId: doc.secondUserId, 
                    messages: doc.messsages,
                    lastMessage: doc.lastMessage
                })
            }))
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

    return (
        <div className="w-[520px] h-full border-r flex flex-col">
            <div className="flex justify-end items-center h-16 border-b gap-[95px] pr-4">
                <button 
                    className="font-medium"
                    onClick={() => navigate(RoutesTypes.DIRECT)}
                >
                    <p>@{loggedUser.username}</p>
                </button>
                <button
                    onClick={openModal}
                >
                    <Text />
                </button>
            </div>
            <div className="flex flex-col w-full h-full overflow-hidden overflow-y-auto mt-2">
                {chats.map(chat => <ChatLink 
                    chatId={chat.firstUserId + "-" + chat.secondUserId}
                    userId={loggedUser.userId === chat.firstUserId ? chat.secondUserId : chat.firstUserId}
                    lastMessage={chat.lastMessage}
                    key={loggedUser.userId === chat.firstUserId ? chat.secondUserId : chat.firstUserId}
                />)}
            </div>
        </div>
    )
}

export default UsersSection