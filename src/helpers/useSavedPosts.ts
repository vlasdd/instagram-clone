import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";
import { setSignedUser } from "../redux/features/signedUser";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import SavedPostType from "../types/save-post-type";

const useSavedPosts = ({ userId, postId }: { userId: string, postId: string }) => {
    const loggedUser = useAppSelector(state => state.signedUser.user);
    const dispatch = useAppDispatch();

    console.log(userId, "|||",  postId, "|||",  loggedUser.userId)

    const addToSaved = async () => {
        const newPosts = [...loggedUser.savedPosts, { fromId: userId, postId: postId }] as SavedPostType[]

        await updateDoc(doc(db, "users", loggedUser.userId), {
            savedPosts: newPosts
        })

        dispatch(setSignedUser({ ...loggedUser, savedPosts: newPosts }))
    } 

    const removeFromSaved = async () => {
        const newPosts = loggedUser.savedPosts.filter(post => post.postId !== postId)

        await updateDoc(doc(db, "users", loggedUser.userId), {
            savedPosts: newPosts
        })

        dispatch(setSignedUser({ ...loggedUser, savedPosts: newPosts }))
    } 

    return { addToSaved, removeFromSaved }
}

export default useSavedPosts;