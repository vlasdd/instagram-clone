import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";
import { useAppDispatch, useAppSelector } from "../redux/hooks";

const useLikes = ({ userId }: { userId: string }) => {
    const loggedUser = useAppSelector(state => state.signedUser.user);
    const userOnPage = useAppSelector(state => state.userOnPage.user);
    const dispatch = useAppDispatch();

    const addLike = async () => {
        await updateDoc(doc(db, "users", userId), {
            //posts: filteredFollowing
        })
    } 
}

export default useLikes;