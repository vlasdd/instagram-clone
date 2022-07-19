import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { useParams } from 'react-router-dom';
import { db } from 'firebase-setup/firebaseConfig';
import { setSignedUser } from 'redux-setup/features/signedUser';
import { setUserOnPage } from 'redux-setup/features/userOnPage';
import { useAppDispatch, useAppSelector } from 'redux-setup/hooks';
import UserState from 'types/userStateType';

const useFollowers = ({ userId }: { userId: string }) => {
    const loggedUser = useAppSelector(state => state.signedUser.user);
    const userOnPage = useAppSelector(state => state.userOnPage.user);
    const dispatch = useAppDispatch();
    const { uid } = useParams();

    const removeFromFollowing = async () => {
        const filteredFollowing = loggedUser.following.filter(data => data.userId !== userId);

        await updateDoc(doc(db, "users", loggedUser.userId), {
            following: filteredFollowing
        })

        dispatch(setSignedUser({ ...loggedUser, following: filteredFollowing }))

        if (uid === loggedUser.userId) {
            dispatch(setUserOnPage({ ...loggedUser, following: filteredFollowing }))
        }

        const userToUpdate = await getDoc(doc(db, "users", userId));

        const modifiedFollowers = (userToUpdate.data() as UserState).followers.filter(data => data.userId !== loggedUser.userId);
        await updateDoc(doc(db, "users", userId), {
            followers: modifiedFollowers
        })

        if (userId === userOnPage.userId) {
            dispatch(setUserOnPage({ ...(userToUpdate.data() as UserState), followers: modifiedFollowers }))
        }
    }

    const addToFollowing = async () => {
        const newUser = { userId }

        await updateDoc(doc(db, "users", loggedUser.userId), {
            following: [...loggedUser.following, newUser]
        })

        dispatch(setSignedUser({ ...loggedUser, following: [...loggedUser.following, newUser] }))

        if (uid === loggedUser.userId) {
            dispatch(setUserOnPage({ ...loggedUser, following: [...loggedUser.following, newUser] }))
        }

        const userToUpdate = await getDoc(doc(db, "users", userId));

        const modifiedFollowers = [ ...(userToUpdate.data() as UserState).followers, { userId: loggedUser.userId } ];
        await updateDoc(doc(db, "users", userId), {
            followers: modifiedFollowers
        })

        if (userId === userOnPage.userId) {
            dispatch(setUserOnPage({ ...(userToUpdate.data() as UserState), followers: modifiedFollowers }))
        }
    }

    return { addToFollowing, removeFromFollowing };
}

export default useFollowers