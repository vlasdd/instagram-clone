import CommentForm from 'components/post/CommentForm'
import LikesBar from 'components/post/LikesBar'
import { db } from 'firebase-setup/firebaseConfig'
import { doc, getDoc } from 'firebase/firestore'
import compareSize from 'helpers/other/compareSize'
import React, { useEffect, useRef, useState } from 'react'
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
    const imageRation = compareSize(currentPost.postImage);

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
            <div className="w-full bg-black h-[400px] flex items-center justify-center overflow-hidden">
                <img
                    src={currentPost.postImage}
                    className={`${imageRation ? "h-full" : "w-full"} object-cover`}
                />
            </div>
            <LikesBar
                currentPost={currentPost}
                commentsRef={commentsRef}
                changePostsAdd={changePostsAdd}
                changePostsRemove={changePostsRemove}
            />
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