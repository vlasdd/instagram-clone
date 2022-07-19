import { db, storage } from "firebase-setup/firebaseConfig";
import { doc, updateDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import MessageType from "types/messageType";
import { v4 } from "uuid";

type CreateMessageProps = {
    imageUpload: File | null;
    wordEntering: string,
    loggedUserId: string,
    chatId: string,
    messages: MessageType[],
}

const createMessage = async ({ imageUpload, wordEntering, loggedUserId, chatId, messages }: CreateMessageProps) => {
    let imageUrl = "";
    if(imageUpload){
        const imageRef = ref(storage, `Images/${imageUpload.name + v4()}`)
        await uploadBytes(imageRef, imageUpload)
        imageUrl = await getDownloadURL(imageRef);
    }

    const newMessage = {
        text: wordEntering,
        from: {
            userId: loggedUserId,
        },
        createdAt: (new Date()).getTime(),
        media: imageUrl
    }

    await updateDoc(doc(db, "chats", chatId as string), {
        messages: [...messages, newMessage],
        lastMessage: {
            text: newMessage.text,
            userId: loggedUserId
        },
        lastEdited: (new Date()).getTime()
    })
}

export default createMessage;