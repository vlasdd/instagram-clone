import { useCallback } from "react";
import { useAppSelector } from "redux-setup/hooks"
import PostType from "types/postType"

const useUIChanges = (changePosts: any, postId: string) => {
    const loggedUser = useAppSelector(state => state.signedUser.user);

    const addLikeToPost = useCallback(() => {
        if(changePosts){
            changePosts((posts: PostType[]) => posts.map(post => {
                if (post.postId === postId) {
                    return { ...post, likes: [...post.likes, { userId: loggedUser.userId }] }
                }

                return post
            }) as PostType[])
        }
    }, [changePosts, postId])

    const removeLikeFromPost = useCallback(() => {
        if(changePosts){
            changePosts((posts: PostType[]) => posts.map(post => {
                if (post.postId === postId) {
                    return { ...post, likes: post.likes.filter(obj => obj.userId !== loggedUser.userId) }
                }

                return post
            }) as PostType[])
        }
    }, [changePosts, postId])

    const addLikeToComment = useCallback((commentId: string) => {
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
    }, [changePosts, postId])

    const removeLikeFromComment = useCallback((commentId: string) => {
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
    }, [changePosts, postId])

    return { addLikeToPost, removeLikeFromPost, addLikeToComment, removeLikeFromComment }
}

export default useUIChanges