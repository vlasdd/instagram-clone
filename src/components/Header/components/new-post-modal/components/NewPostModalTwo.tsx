import React, { useState } from 'react';
import ReturnBack from '../../../../../svgs/empty/ReturnBack';
import { motion } from "framer-motion";
import useWindowWidth from "../../../../../helpers/useWindowWidth";
import Modal from '../../../../modal/Modal';
import AreYouSureModal from '../../../../modal/AreYouSureModal';
import UserState from '../../../../../types/user-state-type';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { db, storage } from '../../../../../firebase/firebaseConfig';
import { v4 } from 'uuid';
import { doc, updateDoc } from 'firebase/firestore';
import { useAppDispatch, useAppSelector } from '../../../../../redux/hooks';
import { setSignedUser } from '../../../../../redux/features/signedUser';
import { nanoid } from '@reduxjs/toolkit';
import { setUserOnPage } from '../../../../../redux/features/userOnPage';

type NewPostModalTwoProps = {
    setCurrentPageId: React.Dispatch<React.SetStateAction<number>>,
    image: any,
    user: UserState,
}

const NewPostModalTwo: React.FC<NewPostModalTwoProps> = ({ setCurrentPageId, image, user }) => {
    //const [isCloseModalOpen, setIsCloseModalOpen] = useState<boolean>(false);
    const userOnPage = useAppSelector(state => state.userOnPage.user);
    const innerWidth = useWindowWidth();
    const [text, setText] = useState<string>("");
    const dispatch = useAppDispatch();

    console.log("rerender")

    const createPost = async () => {
        console.log("post")
        const imageRef = ref(storage, `Images/${image.name + v4()}`)
        await uploadBytes(imageRef, image)

        const imageUrl = await getDownloadURL(imageRef);

        const newPost = {
            postId: nanoid(),
            postImage: imageUrl,
            likes: [],
            comments: [],
            text: text,
            fromId: user.userId
        }

        await updateDoc(doc(db, "users", user.userId), {
            posts: [...user.posts, newPost]
        })

        dispatch(setSignedUser({...user, posts: [...user.posts, newPost]}));

        if(user.userId === userOnPage.userId){
            dispatch(setUserOnPage({...user, posts: [...user.posts, newPost]}))
        }

        setCurrentPageId(prevVal => prevVal + 1)
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
                <img
                    src={URL.createObjectURL(image)}
                    className="h-[335px] sm:h-full w-[450px] object-cover sm:rounded-bl-xl"
                />
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
                            src={user.profileImage.length ? user.profileImage : "../images/default-avatar-image.jpg"}
                            className="h-9 w-9 rounded-full object-cover"
                        />
                        <p className="font-medium text-sm tracking-wide whitespace-nowrap">{user.username}</p>
                    </div>
                    <textarea 
                        className="resize-none h-36 overflow-hidden overflow-y-auto px-3 focus:outline-none text-sm text-sm"
                        onChange={(event) => setText(event.target.value)}
                        value={text}
                    />
                    <div className="w-full flex justify-end sm:border-b pr-2 pb-2">
                        <p className="text-gray-400 text-xs">{text.length}</p>
                    </div>
                </motion.div>
            </div>
        </motion.div>
    )
}

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