import CommentsType from "./comments-type"

type PostType = {
    postId: string
    postImage: string,
    likes: { userId: string }[],
    comments: CommentsType[],
    text: string,
    fromId: string
}

export default PostType