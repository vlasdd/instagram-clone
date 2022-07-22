import { useAppSelector } from "redux-setup/hooks"
import PostType from "types/postType"

const useUIChanges = (changePosts: any, postId: string) => {
    const loggedUser = useAppSelector(state => state.signedUser.user);

    const addLikeToPost = () => {
        if(changePosts){
            changePosts((posts: PostType[]) => posts.map(post => {
                if (post.postId === postId) {
                    return { ...post, likes: [...post.likes, { userId: loggedUser.userId }] }
                }

                return post
            }) as PostType[])
        }
    }

    const removeLikeFromPost = () => {
        if(changePosts){
            changePosts((posts: PostType[]) => posts.map(post => {
                if (post.postId === postId) {
                    return { ...post, likes: post.likes.filter(obj => obj.userId !== loggedUser.userId) }
                }

                return post
            }) as PostType[])
        }
    }

    const addLikeToComment = (commentId: string) => {
        if(changePosts){
            changePosts((posts: PostType[]) => posts.map(post => {
                if(post.postId === postId){
                    return { ...post, comments: post.comments.map(comment => {
                        if(comment.commentId === commentId){
                            return { ...comment, likes: [...comment.likes, { userId: loggedUser.userId }] }
                        }
    
                        return comment
                    }) }
                }
    
                return post
            }) as PostType[])
        }
    }

    const removeLikeFromComment = (commentId: string) => {
        if(changePosts){
            changePosts((posts: PostType[]) => posts.map(post => {
                if(post.postId === postId){
                    return { ...post, comments: post.comments.map(comment => {
                        if(comment.commentId === commentId){
                            return { ...comment, likes: comment.likes.filter(like => like.userId !== loggedUser.userId) }
                        }
    
                        return comment
                    }) }
                }
    
                return post
            }) as PostType[])
        }
    }

    return { addLikeToPost, removeLikeFromPost, addLikeToComment, removeLikeFromComment }
}

export default useUIChanges