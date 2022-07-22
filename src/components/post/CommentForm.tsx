import DropMenu from 'components/other/DropMenu';
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import createNewComment from 'redux-setup/features/signed-user/thunks/createNewComment';
import { useAppDispatch } from 'redux-setup/hooks';
import Smile from 'svgs/empty/Smile';
import Picker, { IEmojiData } from "emoji-picker-react";
import PostType from 'types/postType';

type CommentFormProps = {
    wordEntering: string,
    setWordEntering: React.Dispatch<React.SetStateAction<string>>,
    commentsRef: any,
    currentPost: PostType,
    changePosts: any,
}

const CommentForm: React.FC<CommentFormProps> = React.memo(({ 
    wordEntering, 
    setWordEntering, 
    commentsRef, 
    currentPost,
    changePosts 
}) => {

    const dispatch = useAppDispatch();

    const { uid } = useParams();

    const [areEmojiOpen, setAreEmojiOpen] = useState<boolean>(false);

    const sendComment = async () => {
        const text = wordEntering;
        dispatch(createNewComment({ 
            text, 
            fromId: currentPost.fromId, 
            postId: currentPost.postId, 
            uid: uid as string, 
            changePosts 
        }))
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

    const closeEvent = (event: any) => {
        event.stopPropagation();
        setAreEmojiOpen(false)
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
                            closeEvent={event => closeEvent(event)}
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