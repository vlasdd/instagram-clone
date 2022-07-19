import MessageType from "types/messageType";

type ChatState = {
    firstUserId: string,
    secondUserId: string, 
    messages: MessageType[]
    lastMessage: {
        text: string,
        userId: string,
    },
    lastEdited: number,
}

export default ChatState;