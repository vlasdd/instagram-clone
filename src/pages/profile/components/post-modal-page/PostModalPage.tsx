import React, { useEffect, useMemo, useRef, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import PostType from 'types/post-type'
import PostsModalNavigation from 'pages/profile/components/post-modal-page/components/PostsModalNavigation'
import CommentForm from "components/post/CommentForm";
import LikesBar from 'components/post/LikesBar'
import usePosts from 'pages/profile/hooks/usePosts'
import ProfileRoutes from 'constants/profile-routes'
import UserHeader from './components/UserHeader'
import useWindowWidth from 'helpers/hooks/useWindowWidth'
import PostComments from './components/PostComments'
import CommentType from 'types/comments-type'
import { doc, getDoc } from 'firebase/firestore'
import { db } from 'firebase-setup/firebaseConfig'
import UserState from 'types/user-state-type'
import { useAppSelector } from 'redux-setup/hooks';
import Time from 'components/other/Time';

const PostModalPage: React.FC = React.memo(() => {
    const { posts, changePosts } = usePosts();

    const loggedUser = useAppSelector(state => state.signedUser.user);
    const commentsRef = useRef<React.RefObject<HTMLInputElement>>(null);

    const { postId } = useParams();
    const location = useLocation();

    const currentPost = useMemo(() => posts.find(post => post?.postId === postId) as PostType, [posts, postId])
    const currentIndex = useMemo(() => posts.indexOf(currentPost as PostType), [posts, currentPost])

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

    const innerWidth = useWindowWidth();

    useEffect(() => {
        const getUser = async () => {
            const user = (await getDoc(doc(db, "users", currentPost?.fromId as string))).data() as UserState;
            setUserInfo({ ...user })
        }

        setUserInfo({ username: "", profileImage: "", userId: "" })
        getUser();
    }, [currentPost?.fromId])

    const changePostsAdd = () => {
        if(changePosts){
            changePosts(posts.map(post => {
                if (post.postId === postId) {
                    return { ...post, likes: [...post.likes, { userId: loggedUser.userId }] }
                }

                return post
            }) as PostType[])
        }
    }

    const changePostsRemove = () => {
        if(changePosts){
            changePosts(posts.map(post => {
                if (post.postId === postId) {
                    return { ...post, likes: post.likes.filter(obj => obj.userId !== loggedUser.userId) }
                }

                return post
            }) as PostType[])
        }
    }

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
                    w-full sm:w-3/5 bg-black h-1/3 sm:h-full flex items-center justify-center overflow-hidden
                    ${innerWidth > 640 ? "rounded-l-xl" : "rounded-t-xl"}
                `}>
                    <img
                        src={currentPost.postImage}
                        className="h-full w-full object-contain"
                    />
                </div>
                <div className="w-full h-2/3 sm:h-full sm:w-2/5 flex flex-col justify-between">
                    <UserHeader userInfo={userInfo} />
                    <PostComments
                        comments={currentPost.comments as CommentType[]}
                        currentPostText={currentPost.text as string}
                        userInfo={userInfo}
                    />
                    <LikesBar
                        currentPost={currentPost}
                        commentsRef={commentsRef}
                        changePostsAdd={changePostsAdd}
                        changePostsRemove={changePostsRemove}
                    />
                    <Time createdAt={currentPost.createdAt}/>
                    <CommentForm
                        postId={postId as string}
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
})

export default PostModalPage