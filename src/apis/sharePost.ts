import { db } from "firebase-setup/firebaseConfig";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import ChatState from "types/chatStateType";
import PostType from "types/postType";

type SharePostProps = {
    currentPost: PostType,
    signedUserId: string,
    chatId: string,
    messageEntering: string,
}

const sharePost = async ({ currentPost, signedUserId, chatId, messageEntering }: SharePostProps) => {
    const newMessage = {
        text: currentPost.text,
        from: {
            userId: signedUserId,
        },
        createdAt: (new Date()).getTime(),
        media: currentPost.postImage,
        post: currentPost
    }
    
    const currentChat = (await getDoc(doc(db, "chats", chatId))).data() as ChatState;
    
    if(messageEntering.length === 0){
        await updateDoc(doc(db, "chats", chatId), {
            messages: [...currentChat.messages, newMessage],
            lastMessage: {
                text: "You sent a post",
                userId: signedUserId
            },
            lastEdited: (new Date()).getTime()
        })
        return;
    }
    
    const userMessage = {
        text: messageEntering,
        from: {
            userId: signedUserId,
        },
        createdAt: (new Date()).getTime(),
        media: "",
    }
    
    await updateDoc(doc(db, "chats", chatId), {
        messages: [...currentChat.messages, newMessage, userMessage],
        lastMessage: {
            text: userMessage.text,
            userId: signedUserId
        },
        lastEdited: (new Date()).getTime()
    })
}

export default sharePost