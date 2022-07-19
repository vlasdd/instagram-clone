import DropMenu from 'components/other/DropMenu';
import usePosts from 'pages/profile/hooks/usePosts';
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { createNewComment } from 'redux-setup/features/signedUser';
import { useAppDispatch } from 'redux-setup/hooks';
import Smile from 'svgs/empty/Smile';
import Picker, { IEmojiData } from "emoji-picker-react";

type CommentFormProps = {
    wordEntering: string,
    setWordEntering: React.Dispatch<React.SetStateAction<string>>,
    commentsRef: any,
    currentPostFromId: string,
    postId: string
}

const CommentForm: React.FC<CommentFormProps> = React.memo(({ 
    wordEntering, 
    setWordEntering, 
    commentsRef, 
    currentPostFromId, 
    postId 
}) => {

    const dispatch = useAppDispatch();

    const { uid } = useParams();
    const usePostsObj = usePosts();

    const [areEmojiOpen, setAreEmojiOpen] = useState<boolean>(false);

    const sendComment = async () => {
        const text = wordEntering;
        dispatch(createNewComment({ text, currentPostFromId, postId, uid: uid as string, usePostsObj }))
        setWordEntering("");
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