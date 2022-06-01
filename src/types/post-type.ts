import CommentsType from "./comments-type"

type PostType = {
    postImage: string[],
    likes: number,
    comments: CommentsType[],
    profileImage: string,
    username: string,
}

export default PostType