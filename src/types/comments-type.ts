type CommentType = {
    userId: string,
    text: string,
    likes: { userId: string }[],
    commentId: string,
}

export default CommentType;