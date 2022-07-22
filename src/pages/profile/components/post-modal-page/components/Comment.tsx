import RoutesTypes from 'constants/routes-types';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useAppSelector } from 'redux-setup/hooks';
import Heart from 'svgs/empty/Heart';
import FilledHeart from 'svgs/filled/FilledHeart';
import CommentsType from 'types/commentsType';
import { motion } from "framer-motion";
import useCommentLikes from 'helpers/hooks/useCommentLikes';
import usePosts from 'pages/profile/hooks/usePosts';
import { doc, getDoc } from 'firebase/firestore';
import { db } from 'firebase-setup/firebaseConfig';
import UserState from 'types/userStateType';
import convertUnixTime from 'helpers/other/convert-unix-time/convertUnixTime';
import Modal from 'components/modal/Modal';
import UsersListModal from '../../users-list/UsersListModal';

interface ICommentsProps extends CommentsType {
    fromId: string,
    changePostsAdd: () => void,
    changePostsRemove: () => void,
}

const Comment: React.FC<ICommentsProps> = React.memo(({ 
    userId, 
    text, 
    likes, 
    commentId, 
    fromId, 
    createdAt, 
    changePostsAdd,
    changePostsRemove, 
}) => {
    const loggedUser = useAppSelector(state => state.signedUser.user); 

    const navigate = useNavigate();

    const { postId } = useParams();

    const [userInfo, setUserInfo] = useState<{
        username: string,
        profileImage: string,
        userId: string
    }>({
        username: "",
        profileImage: "",
        userId: ""
    })
    const [isListModalOpen, setIsListModalOpen] = useState<boolean>(false);

    useEffect(() => {
        const getUser = async () => {
            const user = (await getDoc(doc(db, "users", userId))).data() as UserState;
            setUserInfo({ ...user })
        }

        setUserInfo({ username: "", profileImage: "", userId: "" })
        getUser();
    }, [])

    const { addLike, removeLike } = useCommentLikes({ userId: fromId, postId: postId as string, commentId, changePostsAdd, changePostsRemove })

    const generateTime = () => {
        let time = convertUnixTime(createdAt)
        return time === "Now" ? time : time.split(" ")[0] + time.split(" ")[1][0]
    }

    const handleLikes = () => {
        likes.some(like => like.userId === loggedUser.userId) ? removeLike() : addLike()
    }

    return (
        !userInfo.userId.length ?
            <div className="h-12 w-full flex items-center justify-start gap-2">
                <div
                    style={{ "borderTopColor": "transparent" }}
                    className="w-[36px] h-[36px] border-[3px] border-gray-700 border-dashed rounded-full animate-spin"
                ></div>
            </div> :
            <>
                <div className="flex w-full justify-between items-start">
                    <div className="flex w-[calc(100%-30px)] gap-4">
                        <button
                            className="h-12 py-[0.5px] flex items-center"
                            onClick={() => navigate(RoutesTypes.DASHBOARD + userId)}
                        >
                            <img
                                src={userInfo.profileImage.length ? userInfo.profileImage : process.env.PUBLIC_URL + "/images/default-avatar-image.jpg"}
                                className="h-9 w-9 rounded-full object-cover"
                            />
                        </button>
                        <div className="flex flex-col w-[calc(100%-52px)]">
                            <div className="inline-block pt-3">
                                <p className="break-words text-[14px]">
                                    <span
                                        className="font-medium text-sm tracking-wide whitespace-nowrap cursor-pointer"
                                        onClick={() => navigate(RoutesTypes.DASHBOARD + userId)}
                                    >
                                        {userInfo.username}
                                    </span>
                                    <span className="ml-2">{text}</span>
                                </p>
                            </div>
                            <div className="flex gap-2 text-xs text-gray-400">
                                <p>
                                    {generateTime()}
                                </p>
                                <button onClick={() => setIsListModalOpen(true)}>
                                    <p className="font-medium">{`${likes.length} like${likes.length === 1 ? "" : "s"}`}</p>
                                </button>
                            </div>
                        </div>
                    </div>
                    {
                        <div className="flex items-center justify-center h-[42px] w-[20px]">
                            <motion.div
                                onClick={handleLikes}
                                className="h-[15px] w-[15px] cursor-pointer"
                                {...(
                                    likes.every(like => like.userId !== loggedUser.userId) ?
                                        {
                                            whileTap: {
                                                width: "50px",
                                                height: "50px",
                                                transition: { repeat: 1, repeatType: "reverse", duration: 0.5 },
                                            }
                                        } :
                                        {}
                                )}
                            >
                                {
                                    likes.some(like => like.userId === loggedUser.userId) ?
                                        <FilledHeart
                                            styles="h-full w-full text-red-500"
                                        /> :
                                        <Heart
                                            styles="h-full w-full"
                                            includeHovering={true}
                                        />
                                }
                            </motion.div>
                        </div>
                    }
                </div>
                {
                    isListModalOpen ?
                        <Modal
                            closeEvent={() => setIsListModalOpen(false)}
                            styles="h-96 top-[20%]"
                        >
                            <UsersListModal
                                descriptionLine="Likes"
                                usersList={likes}
                                closeEvent={() => setIsListModalOpen(false)}
                            />
                        </Modal> :
                        null
                }
            </>
    )
})

export default Comment