import React, { useState } from 'react';
import ReturnBack from 'svgs/empty/ReturnBack';
import { motion } from "framer-motion";
import useWindowWidth from "helpers/hooks/useWindowWidth";
import { useAppDispatch, useAppSelector } from 'redux-setup/hooks';
import Smile from 'svgs/empty/Smile';
import DropMenu from 'components/other/DropMenu';
import Picker, { IEmojiData } from 'emoji-picker-react'
import { addNewPost } from "redux-setup/features/signedUser";

type NewPostModalTwoProps = {
    setCurrentPageId: React.Dispatch<React.SetStateAction<number>>,
    image: any[],
}

const NewPostModalTwo: React.FC<NewPostModalTwoProps> = React.memo(({ setCurrentPageId, image }) => {
    const user = useAppSelector(state => state.signedUser.user);
    const dispatch = useAppDispatch();

    const innerWidth = useWindowWidth();
    const [text, setText] = useState<string>("");

    const [areEmojiOpen, setAreEmojiOpen] = useState<boolean>(false);

    const createPost = () => {
        dispatch(addNewPost({ image, text }))
        setCurrentPageId(prevVal => prevVal + 1);
    }

    const handleEmojiClick = (event: React.MouseEvent<Element, MouseEvent>, emojiObject: IEmojiData) => {
        setText(prevText => prevText + emojiObject.emoji);
    }

    return (
        <motion.div
            className="flex flex-col h-full w-[300px] sm:w-[640px]"
            {...(
                innerWidth > 640 ?
                    {
                        initial: { width: "450px" },
                        animate: { width: "640px" },
                        exit: {width: "450px"},
                        transition: { duration: 0.3 },
                    } :
                    {}
            )}
        >
            <div className="h-10 w-full flex justify-center items-center font-medium border-b relative">
                <div className="w-full h-12 flex justify-between items-center px-4">
                    <button onClick={() => setCurrentPageId(prevVal => prevVal - 1)}>
                        <ReturnBack />
                    </button>
                    <p>Create new post</p>
                    <button
                        className="font-bold text-blue-500"
                        onClick={createPost}
                    >
                        <p>Share</p>
                    </button>
                </div>
            </div>
            <div className="w-full h-full flex flex-col sm:flex-row">
                <div className="relative">
                    <img
                        src={URL.createObjectURL(image[0])}
                        className="h-[225px] sm:h-[460px] w-[450px] object-cover sm:rounded-bl-xl"
                    />
                    {
                        areEmojiOpen ?
                                <DropMenu
                                    closeEvent={event => {
                                        event.stopPropagation();
                                        setAreEmojiOpen(false)
                                    }}
                                    styles="w-[calc(100%-10px)] sm:w-[250px] bottom-[calc(100%-221px)] right-[5px] sm:right-[2px] sm:bottom-[225px] h-[217px] sm:h-[233px] z-20 "
                                    noAnimation={true}
                                >
                                    <Picker
                                        pickerStyle={{ width: "100%", height: "100%" }}
                                        onEmojiClick={handleEmojiClick}
                                    />
                                </DropMenu>:
                            null
                    }
                </div>
                <motion.div 
                    className="flex flex-col w-full h-[calc(100%-40px)] sm:border-l overflow-hidden"
                    {...(
                        innerWidth > 640 ?
                            {
                                initial: { width: "0px" },
                                animate: { width: "190px" },
                                transition: { duration: 0.3 },
                            } :
                            {}
                    )}
                >
                    <div
                        className="w-full h-14 py-[0.5px] gap-2 flex items-center px-3"
                    >
                        <img
                            src={user.profileImage.length ? user.profileImage : process.env.PUBLIC_URL + "/images/default-avatar-image.jpg"}
                            className="h-9 w-9 rounded-full object-cover"
                        />
                        <p className="font-medium text-sm tracking-wide whitespace-nowrap">{user.username}</p>
                    </div>
                    <textarea 
                        className="resize-none h-36 overflow-hidden overflow-y-auto px-3 focus:outline-none text-sm text-sm"
                        placeholder='Write a caption...'
                        onChange={(event) => setText(event.target.value)}
                        value={text}
                    />
                    <div className="w-full flex justify-between sm:border-b px-2 pb-2">
                        <button
                            className="h-full flex items-center"
                            onClick={() => setAreEmojiOpen(prevVal => !prevVal)}
                        >
                            <Smile styles="w-6 h-6 text-gray-400"/>
                        </button>
                        <p className="text-gray-400 text-sm">{text.length}\200</p>
                    </div>
                </motion.div>
            </div>
        </motion.div>
    )
})

export default NewPostModalTwo
{/* {
    isCloseModalOpen ?
        <Modal
            closeEvent={() => setIsCloseModalOpen(false)}
            styles="h-32 top-[26.5%]"
        >
            <AreYouSureModal
                areYouSureEvent={() => null}
                closeEvent={() => setIsCloseModalOpen(false)}
                questionText="Discard post"
                profileImage='adsd'
                additionalText="If you leave, your edits won't be saved."
                buttonText="Discard"
            />
        </Modal> :
        null
} */}