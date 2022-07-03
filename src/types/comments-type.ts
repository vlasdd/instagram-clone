type CommentType = {
    userId: string,
    text: string,
    likes: { userId: string }[],
}

export default CommentType;