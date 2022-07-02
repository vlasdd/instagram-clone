import React, { useMemo } from 'react'
import useLikes from '../../../../../helpers/useLikes'
import Comment from '../../../../../svgs/empty/Comment'
import Direct from '../../../../../svgs/empty/Direct'
import FilledHeart from '../../../../../svgs/filled/FilledHeart'
import Heart from '../../../../../svgs/empty/Heart'
import PostType from '../../../../../types/post-type'
import { motion } from "framer-motion"
import { useRef } from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import Saved from '../../../../../svgs/empty/Saved'
import useSavedPosts from '../../../../../helpers/useSavedPosts'
import { useAppSelector } from '../../../../../redux/hooks'
import FilledSaved from '../../../../../svgs/filled/FilledSaved'

type LikesBarProps = {
    userId: string,
    likes: {userId: string}[],
    postId: string,
    posts: PostType[],
    commentsRef: any
}

const LikesBar: React.FC<LikesBarProps> = ({ userId, likes, postId, posts, commentsRef }) => {
    const loggedUser = useAppSelector(state => state.signedUser.user)

    const { addLike, removeLike } = useLikes({ userId, postId, posts });
    const { addToSaved, removeFromSaved } = useSavedPosts({ userId, postId });

    return (
        <div className="h-[70px] flex flex-col px-4">
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
            <p className="font-medium text-sm tracking-wide whitespace-nowrap">
                {
                    (() => {
                        const likesAmount = ((posts.find(post => post.postId === postId) as PostType)?.likes.length) || 0
                        return `${likesAmount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} like${likesAmount === 1 ? "" : "s"}`
                    })()
                }

            </p>
        </div>
    )
}

export default LikesBar