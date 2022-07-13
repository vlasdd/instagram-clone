type CommentType = {
    userId: string,
    text: string,
    likes: { userId: string }[],
    commentId: string,
    createdAt: number,
}

export default CommentType;