import React, { useEffect, useRef, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import AreYouSureModal from '../../../../components/modal/AreYouSureModal'
import Modal from '../../../../components/modal/Modal'
import RoutesTypes from '../../../../constants/routes-types'
import useFollowers from '../../../../helpers/useFollowers'
import { useAppSelector } from '../../../../redux/hooks'
import PostType from '../../../../types/post-type'
import PostsModalNavigation from './components/PostsModalNavigation'
import CommentForm from "./components/CommentForm";
import LikesBar from './components/LikesBar'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '../../../../firebase/firebaseConfig'
import UserState from '../../../../types/user-state-type'
import usePosts from '../../../../helpers/usePosts'
import ProfileRoutes from '../../../../constants/profile-routes'

const PostModalPage: React.FC = () => {
    const { posts } = usePosts();

    const loggedUser = useAppSelector(state => state.signedUser.user);
    const commentsRef = useRef<React.RefObject<HTMLInputElement>>(null);

    const navigate = useNavigate();
    const { postId } = useParams();
    const location = useLocation();

    const currentPost = posts.find(post => post.postId === postId)
    const currentIndex = posts.indexOf(currentPost as PostType);

    const [wordEntering, setWordEntering] = useState<string>("");
    const [isUnfollowModalOpen, setIsUnfollowModalOpen] = useState<boolean>(false);
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

    const { addToFollowing, removeFromFollowing } = useFollowers({ userId: userInfo.userId });

    return (
        <div className="w-full h-full flex relative">
            <div className="w-3/5 bg-black flex items-center overflow-hidden rounded-l-xl">
                <img
                    src={currentPost?.postImage}
                    className="w-full max-h-full object-cover"
                />
            </div>
            <div className="w-2/5 flex flex-col justify-between">
                <div className="w-full flex justify-start border-b items-center">
                    <button
                        className="h-14 py-[0.5px] gap-4 flex items-center px-3"
                        onClick={() => navigate(RoutesTypes.DASHBOARD + userInfo.userId)}
                    >
                        <img
                            src={userInfo.profileImage.length ? userInfo.profileImage : "../images/default-avatar-image.jpg"}
                            className="h-9 w-9 rounded-full object-cover"
                        />
                        <p className="font-medium text-sm tracking-wide whitespace-nowrap">{userInfo.username}</p>
                    </button>
                    {
                        loggedUser.userId !== userInfo.userId ?
                            <div className="flex gap-1">
                                <p>•</p>
                                {
                                    loggedUser.following.some(data => data.userId === userInfo.userId) ?
                                        <button
                                            className="rounded text-gray-800 text-sm font-medium cursor-pointer"
                                            onClick={(event) => {
                                                event.stopPropagation();
                                                setIsUnfollowModalOpen(true);
                                            }}
                                        >
                                            Following
                                        </button> :
                                        <button
                                            className="font-medium text-cyan-500 rounded cursor-pointer text-sm tracking-wide"
                                            onClick={(event) => {
                                                event.stopPropagation();
                                                addToFollowing();
                                            }}
                                        >
                                            Follow
                                        </button>
                                }
                            </div> :
                            null
                    }
                </div>
                <div className="w-full h-[calc(100%-180px)] px-3 gap-4 flex items-start overflow-hidden overflow-y-auto no-bar">
                    <button
                        className="h-14 py-[0.5px] flex items-center"
                        onClick={() => navigate(RoutesTypes.DASHBOARD + userInfo.userId)}
                    >
                        <img
                            src={userInfo.profileImage.length ? userInfo.profileImage : "../images/default-avatar-image.jpg"}
                            className="h-9 w-9 rounded-full object-cover"
                        />
                    </button>
                    <div className="inline-block w-[calc(100%-52px)] pt-3">
                        <p className="break-words">
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
                    sendComment={() => null}
                    commentsRef={commentsRef}
                />
            </div>
            {
                isUnfollowModalOpen ?
                    <Modal
                        closeEvent={() => setIsUnfollowModalOpen(false)}
                        styles="h-72 top-[26.5%]"
                    >
                        <AreYouSureModal
                            areYouSureEvent={() => {
                                setIsUnfollowModalOpen(false)
                                removeFromFollowing()
                            }}
                            profileImage={userInfo.profileImage}
                            closeEvent={() => setIsUnfollowModalOpen(false)}
                            questionText={`Unfollow @${userInfo.username}`}
                            buttonText="Unfollow"
                        />
                    </Modal> :
                    null
            }
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