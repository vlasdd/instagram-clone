import React, { useState } from 'react'
import useLikes from 'helpers/hooks/usePostLikes'
import Comment from 'svgs/empty/Comment'
import Direct from 'svgs/empty/Direct'
import FilledHeart from 'svgs/filled/FilledHeart'
import Heart from 'svgs/empty/Heart'
import PostType from 'types/post-type'
import { motion } from "framer-motion"
import Saved from 'svgs/empty/Saved'
import useSavedPosts from 'pages/profile/hooks/useSavedPosts'
import { useAppSelector } from 'redux-setup/hooks'
import FilledSaved from 'svgs/filled/FilledSaved'
import usePosts from 'pages/profile/hooks/usePosts'
import Modal from 'components/modal/Modal'
import UsersListModal from 'pages/profile/components/users-list/UsersListModal'
import convertUnixTime from 'helpers/other/convertUnixTime'
import SharePostModal from './SharePostModal'

type LikesBarProps = {
    userId: string,
    likes: {userId: string}[],
    postId: string,
    posts: PostType[],
    commentsRef: any,
    createdAt: number
}

const LikesBar: React.FC<LikesBarProps> = ({ userId, likes, postId, posts, commentsRef, createdAt }) => {
    const loggedUser = useAppSelector(state => state.signedUser.user);
    const { changePosts } = usePosts();

    const { addLike, removeLike } = useLikes({ userId, postId, posts, changePosts });
    const { addToSaved, removeFromSaved } = useSavedPosts({ userId, postId });

    const [isListModalOpen, setIsListModalOpen] = useState<boolean>(false);
    const [isShareModalOpen, setIsShareModalOpen] = useState<boolean>(false);

    return (
        <>
            <div className="h-[95px] flex flex-col px-4">
                <div className="flex w-full justify-between">
                    <div className="flex items-center gap-3 ml-[-8px]">
                        {
                            likes.some(obj => obj.userId === loggedUser.userId) ?
                                <div className="flex items-center justify-center h-[40px] w-[40px] mr-[-12px]">
                                    <div
                                        className="h-[28px] w-[28px] cursor-pointer"
                                        onClick={removeLike}
                                    >
                                        <FilledHeart
                                            styles="h-full w-full text-red-500"
                                        />
                                    </div>
                                </div> :
                                <div className="flex items-center justify-center h-[40px] w-[40px] mr-[-12px]">
                                    <motion.div
                                        onClick={addLike}
                                        className="h-[28px] w-[28px] cursor-pointer"
                                        whileTap={{
                                            width: "40px",
                                            height: "40px",
                                            transition: { repeat: 1, repeatType: "reverse", duration: 0.16 },
                                        }}
                                    >
                                        <Heart
                                            styles="h-full w-full"
                                            includeHovering={true}
                                        />
                                    </motion.div>
                                </div>
                        }
                        <button
                            onClick={() => commentsRef.current.focus()}
                        >
                            <Comment
                                styles="h-[28px] w-[28px]"
                                includeHovering={true}
                            />
                        </button>
                        <button
                            className="pb-1 mr-[-3px]"
                            onClick={() => setIsShareModalOpen(true)}
                        >
                            <Direct
                                styles="h-[23px] w-[23px] rotate-[55deg]"
                                includeHovering={true}
                            />
                        </button>
                    </div>
                    {
                        loggedUser.savedPosts.some(post => post.postId === postId) ?
                            <button
                                onClick={removeFromSaved}
                            >
                                <FilledSaved
                                    styles="h-[25px] w-[25px]"
                                />
                            </button> :
                            <button
                                onClick={addToSaved}
                            >
                                <Saved
                                    styles="h-[25px] w-[25px]"
                                    includeHovering={true}
                                />
                            </button>
                    }
                </div>
                <button
                    onClick={() => setIsListModalOpen(true)}
                    className="flex flex-start"
                >
                    <p className="font-medium text-sm tracking-wide whitespace-nowrap">
                        {(() => {
                            const likesAmount = ((posts.find(post => post.postId === postId) as PostType)?.likes.length) || 0
                            return `${likesAmount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} like${likesAmount === 1 ? "" : "s"}`
                        })()}
                    </p>
                </button>
                <p className="text-[11px] text-gray-400 mt-1 tracking-wide">
                    {(() => {
                        let time = convertUnixTime(createdAt).toUpperCase();
                        if (time === "NOW") {
                            return time;
                        }
                        return time + " AGO"
                    })()}
                </p>
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
            {
                isShareModalOpen ?
                    <Modal
                        closeEvent={() => setIsShareModalOpen(false)}
                        styles="h-[450px] top-[20%]"
                    >
                        <SharePostModal
                            closeEvent={() => setIsShareModalOpen(false)}
                            currentPost={posts.find(post => post.postId === postId) as PostType}
                        />
                    </Modal> :
                    null
            }
        </>
    )
}

export default LikesBar