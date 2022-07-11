import React, { useRef, useState } from 'react'
import { Navigate, useLocation, useParams } from 'react-router-dom'
import RoutesTypes from 'constants/routes-types'
import PostType from 'types/post-type'
import PostsModalNavigation from 'pages/profile/components/post-modal-page/components/PostsModalNavigation'
import CommentForm from "pages/profile/components/post-modal-page/components/CommentForm";
import LikesBar from 'pages/profile/components/post-modal-page/components/LikesBar'
import usePosts from 'pages/profile/hooks/usePosts'
import ProfileRoutes from 'constants/profile-routes'
import UserHeader from './components/UserHeader'
import useWindowWidth from 'helpers/useWindowWidth'
import PostComments from './components/PostComments'
import useUserInfo from "pages/profile/hooks/useUserInfo";
import CommentType from 'types/comments-type'

const PostModalPage: React.FC = () => {
    const { posts } = usePosts();

    const commentsRef = useRef<React.RefObject<HTMLInputElement>>(null);

    const { postId } = useParams();
    const location = useLocation();

    const currentPost = posts.find(post => post.postId === postId)
    const currentIndex = posts.indexOf(currentPost as PostType);

    const [wordEntering, setWordEntering] = useState<string>("");

    const userInfo = useUserInfo(currentPost?.fromId as string, [currentPost?.fromId])
    const innerWidth = useWindowWidth();

    return (
            <div className="w-full h-full flex flex-col sm:flex-row relative">
                <div className={`
                    w-full sm:w-3/5 bg-black max-h-1/2 sm:max-h-full flex items-center overflow-hidden
                    ${innerWidth > 640 ? "rounded-l-xl" : "rounded-t-xl"}
                `}>
                    <img
                        src={currentPost?.postImage}
                        className="w-full max-h-full object-cover"
                    />
                </div>
                <div className="w-full h-full sm:w-2/5 flex flex-col justify-between">
                    <UserHeader userInfo={userInfo} />
                    <PostComments
                        comments={currentPost?.comments as CommentType[]}
                        currentPostText={currentPost?.text as string}
                        userInfo={userInfo}
                    />
                    <LikesBar
                        userId={(currentPost as PostType).fromId}
                        likes={(currentPost as PostType).likes}
                        postId={postId as string}
                        posts={posts}
                        commentsRef={commentsRef}
                    />
                    <CommentForm
                        wordEntering={wordEntering}
                        setWordEntering={setWordEntering}
                        commentsRef={commentsRef}
                        currentPostFromId={currentPost?.fromId as string}
                    />
                </div>
                <PostsModalNavigation
                    currentIndex={currentIndex}
                    posts={posts}
                    routePart={() => {
                        const locationArray = location.pathname.split("/");
                        return locationArray.slice(0, locationArray.indexOf(ProfileRoutes.POST) - 1).join("/")
                    }}
                />
            </div>
    )
}

export default PostModalPage