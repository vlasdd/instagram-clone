import PostType from "./post-type";

type MessageType = {
    text: string,
    from: {
        userId: string
    }
    createdAt: number,
    media: string,
    post?: PostType
}

export default MessageType;