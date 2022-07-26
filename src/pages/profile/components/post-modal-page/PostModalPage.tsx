import React, { useCallback, useMemo, useRef, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import PostType from 'types/postType'
import PostsModalNavigation from 'pages/profile/components/post-modal-page/components/PostsModalNavigation'
import CommentForm from "components/post/CommentForm";
import LikesBar from 'components/post/LikesBar'
import usePosts from 'pages/profile/hooks/usePosts'
import ProfileRoutes from 'constants/profile-routes'
import UserHeader from './components/UserHeader'
import useWindowWidth from 'helpers/hooks/useWindowWidth'
import PostComments from './components/PostComments'
import Time from 'components/other/Time';
import useUIChanges from 'pages/profile/hooks/useUIChanges';
import useUserInfo from 'helpers/hooks/useUserInfo';

const PostModalPage: React.FC = React.memo(() => {
    const { posts, changePosts } = usePosts();

    const commentsRef = useRef<React.RefObject<HTMLInputElement>>(null);

    const { postId } = useParams();
    const location = useLocation();

    const currentPost = useMemo(() => posts.find(post => post?.postId === postId) as PostType, [posts, postId])
    const currentIndex = useMemo(() => posts.indexOf(currentPost as PostType), [posts, currentPost])

    const [wordEntering, setWordEntering] = useState<string>("");

    const innerWidth = useWindowWidth();
    const userInfo = useUserInfo(currentPost?.fromId as string)
    const { 
        addLikeToPost, 
        removeLikeFromPost, 
        addLikeToComment,
        removeLikeFromComment 
    } = useUIChanges(changePosts, postId as string)

    const routePart = useCallback(() => {
        const locationArray = location.pathname.split("/");
        return locationArray.slice(0, locationArray.indexOf(ProfileRoutes.POST) - 1).join("/")
    }, [location.pathname])

    return (
        !currentPost || !posts ?
            <div className="w-full h-full flex items-center justify-center">
                <img
                    src={process.env.PUBLIC_URL + "/images/loading-logo.jpg"}
                    className="h-28"
                />
            </div> :
            <div className="w-full h-full flex flex-col sm:flex-row relative">
                {
                    innerWidth < 641 ?
                        <UserHeader userInfo={userInfo} /> :
                        null
                }
                <div className={`
                    w-full sm:w-3/5 bg-black h-1/3 sm:h-full flex items-center justify-center overflow-hidden
                    ${innerWidth > 640 ? "rounded-l-xl" : ""}
                `}>
                    <img
                        src={currentPost.postImage}
                        className="h-full w-full object-contain"
                    />
                </div>
                <div className="w-full h-2/3 sm:h-full sm:w-2/5 flex flex-col justify-between">
                    {
                        innerWidth > 640 ? 
                        <UserHeader userInfo={userInfo} />:
                        null
                    }
                    <PostComments
                        currentPost={currentPost}
                        userInfo={userInfo}
                        changePostsAdd={addLikeToComment}
                        changePostsRemove={removeLikeFromComment}
                    />
                    <LikesBar
                        currentPost={currentPost}
                        commentsRef={commentsRef}
                        changePostsAdd={addLikeToPost}
                        changePostsRemove={removeLikeFromPost}
                    />
                    <Time createdAt={currentPost.createdAt}/>
                    <CommentForm
                        wordEntering={wordEntering}
                        setWordEntering={setWordEntering}
                        commentsRef={commentsRef}
                        currentPost={currentPost}
                        changePosts={changePosts}
                    />
                </div>
                <PostsModalNavigation
                    currentIndex={currentIndex}
                    posts={posts}
                    routePart={routePart}
                />
            </div>
    )
})

export default PostModalPage