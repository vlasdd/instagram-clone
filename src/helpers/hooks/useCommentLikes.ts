import { doc, getDoc } from "firebase/firestore";
import { useParams } from "react-router-dom";
import { db } from "firebase-setup/firebaseConfig";
import updatePosts from "redux-setup/features/user-on-page/thunks/updatePosts";
import { useAppDispatch, useAppSelector } from "redux-setup/hooks";
import PostType from "types/postType";
import UserState from "types/userStateType";

type UseCommentLikesProps = { 
    userId: string, 
    postId: string, 
    commentId: string,
    changePostsAdd: any,
    changePostsRemove: any,
}

const useCommentLikes = ({ userId, postId, commentId, changePostsAdd, changePostsRemove }: UseCommentLikesProps) => {
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
        
        if(changePostsAdd){
            changePostsAdd()
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

        if(changePostsRemove){
            changePostsRemove();
        }
        
        await dispatch(updatePosts({ userId, newPosts, uid: uid as string }))
    } 

    return { addLike, removeLike }
}

export default useCommentLikes;