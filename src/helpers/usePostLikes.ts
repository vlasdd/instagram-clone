import { doc, updateDoc } from "firebase/firestore";
import { useParams } from "react-router-dom";
import { db } from "firebase-setup/firebaseConfig";
import { setSignedUser } from "redux-setup/features/signedUser";
import { setUserOnPage } from "redux-setup/features/userOnPage";
import { useAppDispatch, useAppSelector } from "redux-setup/hooks";
import PostType from "types/post-type";

const usePostLikes = ({ userId, postId, posts, changePosts }: { userId: string, postId: string, posts: PostType[], changePosts: any }) => {
    const loggedUser = useAppSelector(state => state.signedUser.user);
    const userOnPage = useAppSelector(state => state.userOnPage.user);
    const dispatch = useAppDispatch();

  //  console.log(userId, "|||", postId, "|||", posts)

    const { uid } = useParams();

    const addLike = async () => {
        const newPosts = posts.map(post => {
            if(post.postId === postId){
                return { ...post, likes: [...post.likes, { userId: loggedUser.userId }] }
            }

            return post
        }) as PostType[]

        await updateDoc(doc(db, "users", userId), {
            posts: newPosts
        })

        if (uid === userId) {
            dispatch(setUserOnPage({ ...userOnPage, posts: newPosts }))
        }

        if (userOnPage.userId === loggedUser.userId) {
            dispatch(setSignedUser({ ...loggedUser, posts: newPosts }))
        }

        if(changePosts){
            changePosts(newPosts)
        }
    } 

    const removeLike = async () => {
        const newPosts = posts.map(post => {
            if(post.postId === postId){
                return {...post, likes: post.likes.filter(obj => obj.userId !== loggedUser.userId)}
            }

            return post
        }) as PostType[]

        await updateDoc(doc(db, "users", userId), {
            posts: newPosts
        })

        if (uid === userId) {
            dispatch(setUserOnPage({ ...userOnPage, posts: newPosts }))
        }

        if (userOnPage.userId === loggedUser.userId) {
            dispatch(setSignedUser({ ...loggedUser, posts: newPosts }))
        }

        if(changePosts){
            changePosts(newPosts)
        }
    } 

    return { addLike, removeLike }
}

export default usePostLikes;