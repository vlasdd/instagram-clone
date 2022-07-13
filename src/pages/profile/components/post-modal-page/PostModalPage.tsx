import React, { useEffect, useRef, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import PostType from 'types/post-type'
import PostsModalNavigation from 'pages/profile/components/post-modal-page/components/PostsModalNavigation'
import CommentForm from "pages/profile/components/post-modal-page/components/CommentForm";
import LikesBar from 'pages/profile/components/post-modal-page/components/LikesBar'
import usePosts from 'pages/profile/hooks/usePosts'
import ProfileRoutes from 'constants/profile-routes'
import UserHeader from './components/UserHeader'
import useWindowWidth from 'helpers/hooks/useWindowWidth'
import PostComments from './components/PostComments'
import CommentType from 'types/comments-type'
import { doc, getDoc } from 'firebase/firestore'
import { db } from 'firebase-setup/firebaseConfig'
import UserState from 'types/user-state-type'

const PostModalPage: React.FC = () => {
    const { posts } = usePosts();

    const commentsRef = useRef<React.RefObject<HTMLInputElement>>(null);

    const { postId } = useParams();
    console.log("postId", postId);
    console.log("posts", posts)
    const location = useLocation();

    const currentPost = posts.find(post => post?.postId === postId) as PostType
    const currentIndex = posts.indexOf(currentPost as PostType);

    const [wordEntering, setWordEntering] = useState<string>("");

    const [userInfo, setUserInfo] = useState<{
        username: string,
        profileImage: string,
        userId: string
    }>({
        username: "",
        profileImage: "",
        userId: ""
    })

    useEffect(() => {
        const getUser = async () => {
            const user = (await getDoc(doc(db, "users", currentPost?.fromId as string))).data() as UserState;
            setUserInfo({ ...user })
        }

        setUserInfo({ username: "", profileImage: "", userId: "" })
        getUser();
    }, [currentPost?.fromId])

    const innerWidth = useWindowWidth();

    return (
        !currentPost || !posts ?
            <div className="w-full h-full flex items-center justify-center">
                <img
                    src="../images/loading-logo.jpg"
                    className="h-28"
                />
            </div> :
            <div className="w-full h-full flex flex-col sm:flex-row relative">
                <div className={`
                    w-full sm:w-3/5 bg-black max-h-1/2 sm:max-h-full flex items-center overflow-hidden
                    ${innerWidth > 640 ? "rounded-l-xl" : "rounded-t-xl"}
                `}>
                    <img
                        src={currentPost.postImage}
                        className="w-full max-h-full object-cover"
                    />
                </div>
                <div className="w-full h-full sm:w-2/5 flex flex-col justify-between">
                    <UserHeader userInfo={userInfo} />
                    <PostComments
                        comments={currentPost.comments as CommentType[]}
                        currentPostText={currentPost.text as string}
                        userInfo={userInfo}
                    />
                    <LikesBar
                        userId={currentPost.fromId}
                        likes={currentPost.likes}
                        postId={postId as string}
                        posts={posts}
                        commentsRef={commentsRef}
                        createdAt={currentPost.createdAt}
                    />
                    <CommentForm
                        wordEntering={wordEntering}
                        setWordEntering={setWordEntering}
                        commentsRef={commentsRef}
                        currentPostFromId={currentPost.fromId as string}
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