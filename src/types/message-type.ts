import { Timestamp } from "firebase/firestore";

type MessageType = {
    text: string,
    from: {
        userId: string,
        profileImage: string
    }
    createdAt: Timestamp,
    media: string,
}

export default MessageType;