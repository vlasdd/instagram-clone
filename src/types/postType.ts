import CommentsType from "types/commentsType"

type PostType = {
    postId: string
    postImage: string,
    likes: { userId: string }[],
    comments: CommentsType[],
    text: string,
    fromId: string,
    createdAt: number,
}

export default PostType