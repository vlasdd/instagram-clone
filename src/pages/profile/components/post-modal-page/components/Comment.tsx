import RoutesTypes from 'constants/routes-types';
import useUserInfo from 'pages/profile/hooks/useUserInfo';
import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useAppSelector } from 'redux-setup/hooks';
import Heart from 'svgs/empty/Heart';
import FilledHeart from 'svgs/filled/FilledHeart';
import CommentsType from 'types/comments-type';
import { motion } from "framer-motion";
import useCommentLikes from 'helpers/useCommentLikes';
import usePosts from 'pages/profile/hooks/usePosts';

const Comment: React.FC<CommentsType> = ({ userId, text, likes, commentId }) => {
    const loggedUser = useAppSelector(state => state.signedUser.user); 

    const navigate = useNavigate();

    const { postId } = useParams();
    const { posts, changePosts } = usePosts();

    const userInfo = useUserInfo(userId, []);
    const [state, setState] = useState(false);

    const { addLike, removeLike } = useCommentLikes({ userId, postId: postId as string, posts, changePosts, commentId })

    return (
        <div className="flex w-full justify-between items-start">
            <div className="flex w-[calc(100%-30px)] gap-4">
                <button
                    className="h-12 py-[0.5px] flex items-center"
                    onClick={() => navigate(RoutesTypes.DASHBOARD + userId)}
                >
                    <img
                        src={userInfo.profileImage.length ? userInfo.profileImage : "../images/default-avatar-image.jpg"}
                        className="h-9 w-9 rounded-full object-cover"
                    />
                </button>
                <div className="inline-block w-[calc(100%-52px)] pt-3">
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
            </div>
            {
                <div className="flex items-center justify-center h-[42px] w-[20px]">
                    <motion.div
                        onClick={() => likes.some(like => like.userId === loggedUser.userId) ? removeLike() : addLike()}
                        className="h-[15px] w-[15px] cursor-pointer"
                        {...(
                            state ?
                                {
                                    whileTap: {
                                        width: "70px",
                                        height: "70px",
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
    )
}

export default Comment