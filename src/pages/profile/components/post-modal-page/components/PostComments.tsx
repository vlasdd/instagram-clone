import { nanoid } from '@reduxjs/toolkit'
import React, { useMemo } from 'react'
import CommentType from 'types/comments-type'
import Comment from './Comment'

const RoomMessages: React.FC<{ comments: CommentType[] }> = ({ comments }) => {
    const commentsToRender = useMemo(() => comments.map(comment => <Comment
        {...comment}
        key={nanoid()}
    />), [comments])

    return (
        <div className="max-h-[calc(100%-45px-18px)] py-3 overflow-hidden overflow-y-auto w-full no-bar flex flex-col items-center gap-3">
            {commentsToRender}
        </div>
    )
}

export default RoomMessages