import { Timestamp } from "firebase/firestore";
import UserState from "./user-state-type";

type MessageType = {
    text: string,
    from: UserState,
    createdAt: Timestamp,
    media: string,
}

export default MessageType;