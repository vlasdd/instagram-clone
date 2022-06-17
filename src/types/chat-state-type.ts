import MessageType from "./message-type";

type ChatState = {
    firstUserId: string,
    secondUserId: string, 
    messages: MessageType[]
    lastMessage: {
        text: string,
        userId: string,
    },
}

export default ChatState;