import { doc, getDoc } from "firebase/firestore";
import { useParams } from "react-router-dom";
import { db } from "firebase-setup/firebaseConfig";
import updatePosts from "redux-setup/features/signed-user/thunks/updatePosts";
import { useAppDispatch, useAppSelector } from "redux-setup/hooks";
import PostType from "types/postType";
import UserState from "types/userStateType";

type UseCommentLikesProps = { 
    userId: string, 
    postId: string, 
    changePosts: any,
    commentId: string,
}

const useCommentLikes = ({ userId, postId, changePosts, commentId }: UseCommentLikesProps) => {
    const loggedUser = useAppSelector(state => state.signedUser.user);
    const dispatch = useAppDispatch();

    const { uid } = useParams();

    const addLike = async () => {
        const hotPosts = ((await getDoc(doc(db, "users", userId))).data() as UserState).posts

        const newPosts = hotPosts.map(post => {
            if(post.postId === postId){
                return { ...post, comments: post.comments.map(comment => {
                    if(comment.commentId === commentId){
                        return { ...comment, likes: [...comment.likes, { userId: loggedUser.userId }] }
                    }

                    return comment
                }) }
            }

            return post
        }) as PostType[]
        
        if(changePosts){
            changePosts(newPosts)
        }

        await dispatch(updatePosts({ userId, newPosts, uid: uid as string }))
    } 

    const removeLike = async () => {
        const hotPosts = ((await getDoc(doc(db, "users", userId))).data() as UserState).posts

        const newPosts = hotPosts.map(post => {
            if(post.postId === postId){
                return { ...post, comments: post.comments.map(comment => {
                    if(comment.commentId === commentId){
                        return { ...comment, likes: comment.likes.filter(like => like.userId !== loggedUser.userId) }
                    }

                    return comment
                }) }
            }

            return post
        }) as PostType[]

        if(changePosts){
            changePosts(newPosts)
        }
        
        await dispatch(updatePosts({ userId, newPosts, uid: uid as string }))
    } 

    return { addLike, removeLike }
}

export default useCommentLikes;