import { doc, updateDoc } from "firebase/firestore";
import { useParams } from "react-router-dom";
import { db } from "../firebase/firebaseConfig";
import { setSignedUser } from "../redux/features/signedUser";
import { setUserOnPage } from "../redux/features/userOnPage";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import PostType from "../types/post-type";

const useLikes = ({ userId, postId, posts }: { userId: string, postId: string, posts: PostType[] }) => {
    const loggedUser = useAppSelector(state => state.signedUser.user);
    const userOnPage = useAppSelector(state => state.userOnPage.user);
    const dispatch = useAppDispatch();

    const { uid } = useParams();

    console.log(userId, "|||",  postId, "|||",  loggedUser.userId)

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

        if (uid) {
            dispatch(setUserOnPage({ ...userOnPage, posts: newPosts }))
        }

        if (userOnPage.userId === loggedUser.userId) {
            dispatch(setSignedUser({ ...loggedUser, posts: newPosts }))
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

        if (uid) {
            dispatch(setUserOnPage({ ...userOnPage, posts: newPosts }))
        }

        if (userOnPage.userId === loggedUser.userId) {
            dispatch(setSignedUser({ ...loggedUser, posts: newPosts }))
        }
    } 

    return { addLike, removeLike }
}

export default useLikes;