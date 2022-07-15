import Time from 'components/other/Time'
import CommentForm from 'components/post/CommentForm'
import LikesBar from 'components/post/LikesBar'
import ProfileRoutes from 'constants/profile-routes'
import RoutesTypes from 'constants/routes-types'
import { db } from 'firebase-setup/firebaseConfig'
import { doc, getDoc } from 'firebase/firestore'
import React, { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAppSelector } from 'redux-setup/hooks'
import PostType from 'types/post-type'
import UserState from 'types/user-state-type'
import PostHeader from './PostHeader'

type PostProps = {
    currentPost: PostType
    changePosts: any
}

const Post: React.FC<PostProps> = ({ currentPost, changePosts }) => {
    const loggedUser = useAppSelector(state => state.signedUser.user);

    const commentsRef = useRef<React.RefObject<HTMLInputElement>>(null);
    const navigate = useNavigate();

    const [userInfo, setUserInfo] = useState<{
        username: string,
        profileImage: string,
        userId: string
    }>({
        username: "",
        profileImage: "",
        userId: ""
    })
    const [wordEntering, setWordEntering] = useState<string>("");

    useEffect(() => {
        const getUser = async () => {
            const user = (await getDoc(doc(db, "users", currentPost.fromId))).data() as UserState;
            setUserInfo({ ...user })
        }

        getUser();
    }, [])

    const changePostsAdd = () => changePosts((posts: PostType[]) => posts.map(post => {
        if (post.postId === currentPost.postId) {
            return { ...post, likes: [...post.likes, { userId: loggedUser.userId }] }
        }

        return post
    }) as PostType[])

    const changePostsRemove = () => changePosts((posts: PostType[]) => posts.map(post => {
        if (post.postId === currentPost.postId) {
            return { ...post, likes: post.likes.filter(obj => obj.userId !== loggedUser.userId) }
        }

        return post
    }) as PostType[])

    return (
        <div className="w-full h-full flex flex-col bg-white border rounded-xl">
            <PostHeader
                userInfo={userInfo}
                post={currentPost}
            />
            <div className="w-full bg-black h-[400px] flex items-center justify-center">
                <img
                    src={currentPost.postImage}
                    className="h-full w-full object-contain"
                />
            </div>
            <LikesBar
                currentPost={currentPost}
                commentsRef={commentsRef}
                changePostsAdd={changePostsAdd}
                changePostsRemove={changePostsRemove}
            />
            <div className="w-full flex flex-col px-3 items-start">
                <p className="break-words mx-1">
                    <Link
                        className="font-medium text-sm"
                        to={RoutesTypes.DASHBOARD + userInfo.userId}
                    >
                        {userInfo.username}
                    </Link>
                    <span className="text-sm">{" "}{currentPost.text}</span>
                </p>
                <Link
                    className="pl-1"
                    to={RoutesTypes.DASHBOARD + currentPost.fromId + "/" + ProfileRoutes.POST + currentPost.postId}
                >
                    <p className="text-sm text-gray-400 mt-1 tracking-wide">
                        {(() => {
                            const commentsAmount = currentPost.comments.length
                            return `View all ${commentsAmount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} comment${commentsAmount === 1 ? "" : "s"}`
                        })()}
                    </p>
                </Link>
            </div>
            <Time createdAt={currentPost.createdAt} />
            <CommentForm
                postId={currentPost.postId}
                wordEntering={wordEntering}
                setWordEntering={setWordEntering}
                commentsRef={commentsRef}
                currentPostFromId={currentPost.fromId}
            />
        </div>
    )
}

export default Post