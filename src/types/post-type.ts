import CommentsType from "./comments-type"

type PostType = {
    postId: string
    postImage: string,
    likes: string[],
    comments: CommentsType[],
}

export default PostType