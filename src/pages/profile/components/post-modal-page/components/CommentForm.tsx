import { nanoid } from '@reduxjs/toolkit';
import { db } from 'firebase-setup/firebaseConfig';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import usePosts from 'pages/profile/hooks/usePosts';
import React from 'react';
import { useParams } from 'react-router-dom';
import { setSignedUser } from 'redux-setup/features/signedUser';
import { setUserOnPage } from 'redux-setup/features/userOnPage';
import { useAppDispatch, useAppSelector } from 'redux-setup/hooks';
import PostType from 'types/post-type';
import UserState from 'types/user-state-type';

type CommentFormProps = {
    wordEntering: string,
    setWordEntering: React.Dispatch<React.SetStateAction<string>>,
    commentsRef: any,
    currentPostFromId: string,
}

const CommentForm: React.FC<CommentFormProps> = ({ wordEntering, setWordEntering, commentsRef, currentPostFromId }) => {
    const loggedUser = useAppSelector(state => state.signedUser.user);
    const userOnPage = useAppSelector(state => state.userOnPage.user);

    const dispatch = useAppDispatch();

    const { postId, uid } = useParams();
    const { posts, changePosts } = usePosts();

    const sendComment = async () => {
        const hotPost = ((await getDoc(doc(db, "users", currentPostFromId)))
            .data() as UserState)
            .posts.find(post => post.postId === postId) as PostType

        const newComment = {
            userId: loggedUser.userId,
            text: wordEntering,
            likes: [],
            commentId: nanoid(),
        } 
        
        const newPosts = posts.map(post => {
            if(post.postId === postId){
                return { ...post, comments: [...hotPost.comments, newComment] }
            }

            return post
        }) as PostType[]

        await updateDoc(doc(db, "users", currentPostFromId), {
            posts: newPosts
        })

        if (uid === currentPostFromId) {
            dispatch(setUserOnPage({ ...userOnPage, posts: newPosts }))
        }

        if (userOnPage.userId === loggedUser.userId) {
            dispatch(setSignedUser({ ...loggedUser, posts: newPosts }))
        }

        if(changePosts){
            changePosts(newPosts)
        }

        setWordEntering("");
    }

    return (
        <div className="flex justify-between items-center rounded-b-xl border h-[50px] w-full px-4 gap-4">
            <input
                type="text"
                placeholder="Message..."
                className="w-full h-8 placeholder:text-sm"
                ref={commentsRef}
                value={wordEntering}
                onChange={event => setWordEntering(event.target.value)}
                onKeyDown={event => {
                    if (event.key === "Enter") {
                        sendComment();
                    }
                }}
            />
            <button
                className={`font-semibold ${wordEntering.length ? "text-blue-500": "text-blue-200"}`}
                onClick={sendComment}
                disabled={!wordEntering.length}
                onKeyDown={event => {
                    if (event.key === "Enter") {
                        sendComment();
                    }
                }}
            >
                <p>Post</p>
            </button>
        </div>
    )
}

export default CommentForm