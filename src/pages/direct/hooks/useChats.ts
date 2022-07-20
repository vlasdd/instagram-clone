import { db } from "firebase-setup/firebaseConfig";
import { collection, getDocs, onSnapshot, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useAppSelector } from "redux-setup/hooks";
import ChatState from "types/chatStateType";

type UseChatsType = (chatId: string) => ChatState[]

const useChats: UseChatsType = (chatId) => {
    const loggedUser = useAppSelector(state => state.signedUser.user);
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
            await getChats();
        })

        onSnapshot(query(collection(db, "chats"), where("secondUserId", "==", loggedUser.userId)), async () => {
            await getChats();
        })
    }, [loggedUser.userId, chatId])

    return chats
}

export default useChats