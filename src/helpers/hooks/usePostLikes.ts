import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useParams } from "react-router-dom";
import { db } from "firebase-setup/firebaseConfig";
import { setSignedUser, updatePosts } from "redux-setup/features/signedUser";
import { setUserOnPage } from "redux-setup/features/userOnPage";
import { useAppDispatch, useAppSelector } from "redux-setup/hooks";
import PostType from "types/postType";
import UserState from "types/userStateType";

type UsePostLikesProps = { 
    userId: string, 
    postId: string,
    changePostsAdd: any, 
    changePostsRemove: any 
}

const usePostLikes = ({ userId, postId, changePostsAdd, changePostsRemove }: UsePostLikesProps) => {
    const loggedUser = useAppSelector(state => state.signedUser.user);
    const userOnPage = useAppSelector(state => state.userOnPage.user);
    const dispatch = useAppDispatch();

    const { uid } = useParams();

    const addLike = async () => {
        const hotPosts = ((await getDoc(doc(db, "users", userId))).data() as UserState).posts

        const newPosts = hotPosts.map(post => {
            if(post.postId === postId){
                return { ...post, likes: [...post.likes, { userId: loggedUser.userId }] }
            }

            return post
        }) as PostType[];

        if (changePostsAdd) {
            changePostsAdd()
        }

        await dispatch(updatePosts({ userId, newPosts, uid: uid as string }))
    }

    const removeLike = async () => {
        const hotPosts = ((await getDoc(doc(db, "users", userId))).data() as UserState).posts

        const newPosts = hotPosts.map(post => {
            if (post.postId === postId) {
                return { ...post, likes: post.likes.filter(obj => obj.userId !== loggedUser.userId) }
            }

            return post
        }) as PostType[]

        if (changePostsRemove) {
            changePostsRemove()
        }
        
        await dispatch(updatePosts({ userId, newPosts, uid: uid as string }))
    }

    return { addLike, removeLike }
}

export default usePostLikes;