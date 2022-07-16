import { nanoid } from '@reduxjs/toolkit';
import DropMenu from 'components/other/DropMenu';
import { db } from 'firebase-setup/firebaseConfig';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import usePosts from 'pages/profile/hooks/usePosts';
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { setSignedUser } from 'redux-setup/features/signedUser';
import { setUserOnPage } from 'redux-setup/features/userOnPage';
import { useAppDispatch, useAppSelector } from 'redux-setup/hooks';
import Smile from 'svgs/empty/Smile';
import PostType from 'types/post-type';
import UserState from 'types/user-state-type';
import Picker, { IEmojiData } from "emoji-picker-react";

type CommentFormProps = {
    wordEntering: string,
    setWordEntering: React.Dispatch<React.SetStateAction<string>>,
    commentsRef: any,
    currentPostFromId: string,
    postId: string
}

const CommentForm: React.FC<CommentFormProps> = React.memo(({ wordEntering, setWordEntering, commentsRef, currentPostFromId, postId }) => {
    const loggedUser = useAppSelector(state => state.signedUser.user);
    const userOnPage = useAppSelector(state => state.userOnPage.user);

    const dispatch = useAppDispatch();

    const { uid } = useParams();
    const usePostsObj = usePosts();

    const [areEmojiOpen, setAreEmojiOpen] = useState<boolean>(false);

    const sendComment = async () => {
        const text = wordEntering;
        setWordEntering("");

        const hotPosts = ((await getDoc(doc(db, "users", currentPostFromId))).data() as UserState).posts

        const hotPost = hotPosts.find(post => post.postId === postId) as PostType

        const newComment = {
            userId: loggedUser.userId,
            text: text,
            likes: [],
            commentId: nanoid(),
            createdAt: (new Date()).getTime()
        } 
        
        const newPosts = hotPosts.map(post => {
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

        if(usePostsObj?.changePosts){
            usePostsObj.changePosts(newPosts)
        }
        console.log("here")
    }

    const handleEmojiClick = (event: React.MouseEvent<Element, MouseEvent>, emojiObject: IEmojiData) => {
        setWordEntering(prevText => prevText + emojiObject.emoji);
    }

    const handleKey = (event: React.KeyboardEvent<HTMLInputElement> | React.KeyboardEvent<HTMLButtonElement>) => {
        if (event.key === "Enter") {
            sendComment();
        }
    }

    return (
        <div className="flex justify-between items-center rounded-b-xl border h-[50px] w-full px-4 gap-4">
            <div className="relative">
                <button
                    className="h-full flex items-center"
                    onClick={() => setAreEmojiOpen(prevVal => !prevVal)}
                >
                    <Smile styles="h-7 w-7"/>
                </button>
                {
                    areEmojiOpen ?
                        <DropMenu
                            closeEvent={event => {
                                event.stopPropagation();
                                setAreEmojiOpen(false)
                            }}
                            styles="w-[200px] left-[-12px] bottom-[45px] h-64 z-20"
                            noAnimation={true}
                        >
                            <Picker
                                pickerStyle={{ width: "100%", height: "100%" }}
                                onEmojiClick={handleEmojiClick}
                            />
                        </DropMenu> :
                        null
                }
            </div>
            <input
                type="text"
                placeholder="Send a comment..."
                className="w-full h-8 placeholder:text-sm"
                ref={commentsRef}
                value={wordEntering}
                onChange={event => setWordEntering(event.target.value)}
                onKeyDown={event => handleKey(event)}
            />
            <button
                className={`font-semibold ${wordEntering.length ? "text-blue-500": "text-blue-200"}`}
                onClick={sendComment}
                disabled={!wordEntering.length}
                onKeyDown={event => handleKey(event)}
            >
                <p>Post</p>
            </button>
        </div>
    )
})

export default CommentForm