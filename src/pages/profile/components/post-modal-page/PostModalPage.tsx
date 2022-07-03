import React, { useEffect, useRef, useState } from 'react'
import { Navigate, useLocation, useNavigate, useParams } from 'react-router-dom'
import RoutesTypes from 'constants/routes-types'
import PostType from 'types/post-type'
import PostsModalNavigation from 'pages/profile/components/post-modal-page/components/PostsModalNavigation'
import CommentForm from "pages/profile/components/post-modal-page/components/CommentForm";
import LikesBar from 'pages/profile/components/post-modal-page/components/LikesBar'
import { doc, getDoc } from 'firebase/firestore'
import { db } from 'firebase-setup/firebaseConfig'
import UserState from 'types/user-state-type'
import usePosts from 'helpers/usePosts'
import ProfileRoutes from 'constants/profile-routes'
import UserLoader from 'components/other/UserLoader'
import UserHeader from './components/UserHeader'
import useWindowWidth from 'helpers/useWindowWidth'

const PostModalPage: React.FC = () => {
    const { posts } = usePosts();

    const commentsRef = useRef<React.RefObject<HTMLInputElement>>(null);

    const navigate = useNavigate();
    const { postId } = useParams();
    const location = useLocation();

    const currentPost = posts.find(post => post.postId === postId)
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

        getUser();
    }, [postId])

    const innerWidth = useWindowWidth();

    return (
        !currentPost ?
            <Navigate to={RoutesTypes.NOT_FOUND} /> :
            <div className="w-full h-full flex flex-col sm:flex-row relative">
                <div className={`
                    w-full sm:w-3/5 bg-black max-h-1/2 sm: max-h-full flex items-center overflow-hidden
                    ${innerWidth > 640 ? "rounded-l-xl" : "rounded-t-xl"}
                `}>
                    <img
                        src={currentPost?.postImage}
                        className="w-full max-h-full object-cover"
                    />
                </div>
                <div className="w-full sm:w-2/5 flex flex-col justify-between">
                    <UserHeader userInfo={userInfo} />
                    <div className="w-full h-full sm:h-[calc(100%-180px)] px-3 flex items-start overflow-hidden overflow-y-auto no-bar">
                        {
                            userInfo.userId.length ?
                                <div className="">
                                    <div className="flex w-full gap-4">
                                        <button
                                            className="h-12 py-[0.5px] flex items-center"
                                            onClick={() => navigate(RoutesTypes.DASHBOARD + userInfo.userId)}
                                        >
                                            <img
                                                src={userInfo.profileImage.length ? userInfo.profileImage : "../images/default-avatar-image.jpg"}
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
                                                <span className="ml-2">{currentPost?.text}</span>
                                            </p>
                                        </div>
                                    </div>
                                </div> :
                                <UserLoader
                                    imageStyles={{ width: 36, height: 36, borderRadius: "50%" }}
                                    firstTextStyles={{ width: 100, height: 7, borderRadius: "10px" }}
                                    secondTextStyles={{ width: 80, height: 7, borderRadius: "10px" }}
                                    margin="my-1"
                                />
                        }
                    </div>
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