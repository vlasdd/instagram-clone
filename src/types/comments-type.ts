type CommentsType = {
    userId: string,
    text: string,
    likes: { userId: string },
}

export default CommentsType;