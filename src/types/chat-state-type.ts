import MessageType from "types/message-type";

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