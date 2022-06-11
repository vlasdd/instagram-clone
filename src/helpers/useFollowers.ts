import React from 'react';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { useParams } from 'react-router-dom';
import { db } from '../firebase/firebaseConfig';
import { setSignedUser } from '../redux/features/signedUser';
import { setUserOnPage } from '../redux/features/userOnPage';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import UserState from '../types/user-state-type';
import UserSuggestionType from '../types/user-suggestion-type';

const useFollowers = ({ profileImage, username, fullName, userId }: UserSuggestionType) => {
    const loggedUser = useAppSelector(state => state.signedUser.user);
    const { uid } = useParams();
    const dispatch = useAppDispatch();

    const removeFromFollowing = async () => {
        const filteredFollowing = loggedUser.following.filter(data => data.username !== username)

        await updateDoc(doc(db, "users", loggedUser.userId), {
            following: filteredFollowing
        })

        dispatch(setSignedUser({ ...loggedUser, following: filteredFollowing }))

        if (uid === loggedUser.userId) {
            dispatch(setUserOnPage({ ...loggedUser, following: filteredFollowing }))
        }

        const userToUpdate = await getDoc(doc(db, "users", userId));

        const modifiedFollowers = (userToUpdate.data() as UserState).followers.filter(data => data.username !== loggedUser.username);
        await updateDoc(doc(db, "users", userId), {
            followers: modifiedFollowers
        })

        dispatch(setUserOnPage({ ...(userToUpdate.data() as UserState), followers: modifiedFollowers }))
    }

    const addToFollowing = async () => {
        const newUser = { profileImage, username, fullName, userId }

        await updateDoc(doc(db, "users", loggedUser.userId), {
            following: [...loggedUser.following, newUser]
        })

        dispatch(setSignedUser({ ...loggedUser, following: [...loggedUser.following, newUser] }))

        if (uid === loggedUser.userId) {
            dispatch(setUserOnPage({ ...loggedUser, following: [...loggedUser.following, newUser] }))
        }

        const userToUpdate = await getDoc(doc(db, "users", userId));

        const modifiedFollowers = [
            ...(userToUpdate.data() as UserState).followers,
            {
                profileImage: loggedUser.profileImage,
                username: loggedUser.username,
                fullName: loggedUser.fullName,
                userId: loggedUser.userId
            }
        ];
        await updateDoc(doc(db, "users", userId), {
            followers: modifiedFollowers
        })

        dispatch(setUserOnPage({ ...(userToUpdate.data() as UserState), followers: modifiedFollowers }))
    }

    return { addToFollowing, removeFromFollowing };
}

export default useFollowers