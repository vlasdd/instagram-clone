import UserLoader from 'components/other/UserLoader'
import RoutesTypes from 'constants/routes-types'
import React, { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import CommentType from 'types/commentsType'
import PostType from 'types/postType'
import Comment from './Comment'

type PostCommentProps = { 
    currentPost: PostType, 
    userInfo: {
        username: string,
        profileImage: string,
        userId: string
    },
    changePostsAdd: (commentId: string) => void,
    changePostsRemove: (commentId: string) => void,
}

const PostComments: React.FC<PostCommentProps> = React.memo(({ currentPost, userInfo, changePostsAdd, changePostsRemove }) => {
    const navigate = useNavigate();

    const commentsToRender = useMemo(() => currentPost.comments.map((comment, index) => <Comment
        changePostsAdd={() => changePostsAdd(comment.commentId)}
        changePostsRemove={() => changePostsRemove(comment.commentId)}
        {...comment}
        fromId={userInfo.userId}
        key={index}
    />), [currentPost.comments, userInfo.userId])

    return (
        <div className="w-full h-[calc(100%-180px)] sm:h-[calc(100%-180px)] px-3 flex flex-col items-start overflow-hidden overflow-y-auto no-bar">
            {
                userInfo.userId.length ?
                    <>
                        <div className="flex w-full gap-4">
                            <button
                                className="h-12 py-[0.5px] flex items-center"
                                onClick={() => navigate(RoutesTypes.DASHBOARD + userInfo.userId)}
                            >
                                <img
                                    src={userInfo.profileImage.length ? userInfo.profileImage : process.env.PUBLIC_URL + "/images/default-avatar-image.jpg"}
                                    className="h-9 w-9 rounded-full object-cover"
                                />
                            </button>
                            <div className="inline-block w-[calc(100%-52px)] pt-3">
                                <p className="break-words text-[14px]">
                                    <span
                                        className="font-medium text-sm tracking-wide whitespace-nowrap cursor-pointer"
                                        onClick={() => navigate(RoutesTypes.DASHBOARD + userInfo.userId)}
                                    >
                                        {userInfo.username}
                                    </span>
                                    <span className="ml-2">{currentPost.text}</span>
                                </p>
                            </div>
                        </div>
                        {commentsToRender}
                    </> :
                    <UserLoader
                        imageStyles={{ width: 36, height: 36, borderRadius: "50%" }}
                        firstTextStyles={{ width: 100, height: 7, borderRadius: "10px" }}
                        secondTextStyles={{ width: 80, height: 7, borderRadius: "10px" }}
                        margin="my-1 ml-[-12px]"
                    />
            }
        </div>
    )
})

export default PostComments