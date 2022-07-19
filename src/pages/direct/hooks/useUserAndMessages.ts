import { useEffect, useState } from "react";
import UserState from "types/userStateType";
import { initialState as initialUser } from "redux-setup/features/signedUser";
import MessageType from "types/messageType";
import { useParams } from "react-router-dom";
import { useAppSelector } from "redux-setup/hooks";
import { doc, getDoc, onSnapshot } from "firebase/firestore";
import { db } from "firebase-setup/firebaseConfig";
import ChatState from "types/chatStateType";

type UseUserAndMessagesType = () => {
    secondUser: UserState, 
    wordEntering: string, 
    setWordEntering: React.Dispatch<React.SetStateAction<string>>
    messages: MessageType[], 
}

const useUserAndMessages: UseUserAndMessagesType = () => {
    const loggedUser = useAppSelector(state => state.signedUser.user);
    const { chatId } = useParams();

    const [secondUser, setSecondUser] = useState<UserState>(initialUser.user)
    const [wordEntering, setWordEntering] = useState<string>("");
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

    return { secondUser, wordEntering, setWordEntering, messages } 
}

export default useUserAndMessages