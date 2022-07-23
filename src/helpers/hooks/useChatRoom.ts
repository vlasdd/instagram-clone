import RoutesTypes from "constants/routes-types";
import { db, storage } from "firebase-setup/firebaseConfig";
import { collection, deleteDoc, doc, getDocs, setDoc } from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "redux-setup/hooks";
import MessageType from "types/messageType";

type CreateChatRoomProps = {
    chosenUserId: string; 
    closeEvent?: (chatId: string) => void;
} 

type DeleteChatRoomProps = {
    messages: MessageType[],
    chatId: string,
}

const useChatRoom = () => {
    const signedUser = useAppSelector(state => state.signedUser.user);
    const navigate = useNavigate();

    const createChatRoom = async ({ chosenUserId, closeEvent }: CreateChatRoomProps) => {
        const chatId = signedUser.userId + "-" + chosenUserId;
        const reversedChatId = chosenUserId + "-" + signedUser.userId;

        const allChats = await getDocs(collection(db, "chats"));

        let chatToNavigateTo: string = "";
        allChats.forEach(doc => {
            const docResult = doc.data().firstUserId + "-" + doc.data().secondUserId;
            if (docResult === chatId) {
                chatToNavigateTo = chatId;
                return
            }

            if (docResult === reversedChatId) {
                chatToNavigateTo = reversedChatId;
                return;
            }
        })

        if (chatToNavigateTo.length !== 0) {
            if(closeEvent){
                closeEvent(chatToNavigateTo);
            }
            navigate(RoutesTypes.DIRECT + "/" + chatToNavigateTo);
            return;
        }

        await setDoc(doc(db, "chats", chatId), {
            firstUserId: signedUser.userId,
            secondUserId: chosenUserId,
            messages: [],
            lastMessage: {
                text: "",
                userId: "",
            },
            lastEdited: new Date().getTime()
        });

        if(closeEvent){
            closeEvent(chatId);
        }
        navigate(RoutesTypes.DIRECT + "/" + chatId)
    }

    const deleteChatRoom = async ({ messages, chatId }: DeleteChatRoomProps) => {
        deleteDoc(doc(db, "chats", chatId));

        for (const message of messages) {
          if (message.media.length) {
            const imageRef = ref(storage, message.media);
            await deleteObject(imageRef);
          }
        }
      }

    return { createChatRoom, deleteChatRoom }
}

export default useChatRoom;