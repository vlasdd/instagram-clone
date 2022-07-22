import Time from 'components/other/Time'
import CommentForm from 'components/post/CommentForm'
import LikesBar from 'components/post/LikesBar'
import ProfileRoutes from 'constants/profile-routes'
import RoutesTypes from 'constants/routes-types'
import { db } from 'firebase-setup/firebaseConfig'
import { doc, getDoc } from 'firebase/firestore'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAppSelector } from 'redux-setup/hooks'
import PostType from 'types/postType'
import UserState from 'types/userStateType'
import PostHeader from './PostHeader'

type PostProps = {
    currentPost: PostType
    changePosts: any
}

const Post: React.FC<PostProps> = React.memo(({ currentPost, changePosts }) => {
    const loggedUser = useAppSelector(state => state.signedUser.user);

    const commentsRef = useRef<React.RefObject<HTMLInputElement>>(null);

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

    const changePostsAdd = useCallback(() => changePosts((posts: PostType[]) => posts.map(post => {
        if (post.postId === currentPost.postId) {
            return { ...post, likes: [...post.likes, { userId: loggedUser.userId }] }
        }

        return post
    }) as PostType[]), [currentPost.postId, loggedUser.userId])

    const changePostsRemove = useCallback(() => changePosts((posts: PostType[]) => posts.map(post => {
        if (post.postId === currentPost.postId) {
            return { ...post, likes: post.likes.filter(obj => obj.userId !== loggedUser.userId) }
        }

        return post
    }) as PostType[]), [currentPost.postId, loggedUser.userId])

    const handleCommentsAmount = () => {
        const commentsAmount = currentPost.comments.length
        return `View all ${commentsAmount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} comment${commentsAmount === 1 ? "" : "s"}`
    }

    return (
        <article className="w-full h-full flex flex-col bg-white border rounded-xl">
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
                    to={RoutesTypes.DASHBOARD + ProfileRoutes.POST + currentPost.postId}
                >
                    <p className="text-sm text-gray-400 mt-1 tracking-wide">
                        {handleCommentsAmount()}
                    </p>
                </Link>
            </div>
            <Time createdAt={currentPost.createdAt} />
            <CommentForm
                wordEntering={wordEntering}
                setWordEntering={setWordEntering}
                commentsRef={commentsRef}
                currentPost={currentPost}
                changePosts={changePosts}
            />
        </article>
    )
})

export default Post