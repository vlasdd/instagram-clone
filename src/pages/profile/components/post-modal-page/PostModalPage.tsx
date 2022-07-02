import React, { useMemo, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import AreYouSureModal from '../../../../components/modal/AreYouSureModal'
import Modal from '../../../../components/modal/Modal'
import RoutesTypes from '../../../../constants/routes-types'
import useFollowers from '../../../../helpers/useFollowers'
import { useAppSelector } from '../../../../redux/hooks'
import PostType from '../../../../types/post-type'
import PostsModalNavigation from './components/PostsModalNavigation'
import CommentForm from "./components/CommentForm";
import LikesBar from './components/LikesBar'

type PostModalPageProps = {
    posts: PostType[],
    username: string,
    profileImage: string,
    userId: string,
}

const PostModalPage: React.FC<PostModalPageProps> = ({ posts, username, profileImage, userId }) => {
    const loggedUser = useAppSelector(state => state.signedUser.user);
    const navigate = useNavigate();
    const commentsRef = useRef<React.RefObject<HTMLInputElement>>(null); 

    const { postId } = useParams();
    const currentPost = useMemo(() => posts.find(post => post.postId === postId), [postId, posts]);
    const currentIndex = useMemo(() => posts.indexOf(currentPost as PostType), [currentPost]);

    const [isUnfollowModalOpen, setIsUnfollowModalOpen] = useState<boolean>(false);
    const { addToFollowing, removeFromFollowing } = useFollowers({ userId });

    const [wordEntering, setWordEntering] = useState<string>("");

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
                        onClick={() => navigate(RoutesTypes.DASHBOARD + userId)}
                    >
                        <img
                            src={profileImage.length ? profileImage : "../images/default-avatar-image.jpg"}
                            className="h-9 w-9 rounded-full object-cover"
                        />
                        <p className="font-medium text-sm tracking-wide whitespace-nowrap">{username}</p>
                    </button>
                    {
                        loggedUser.userId !== userId ?
                            <div className="flex gap-1">
                                <p>•</p>
                                {
                                    loggedUser.following.some(data => data.userId === userId) ?
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
                        onClick={() => navigate(RoutesTypes.DASHBOARD + userId)}
                    >
                        <img
                            src={profileImage.length ? profileImage : "../images/default-avatar-image.jpg"}
                            className="h-9 w-9 rounded-full object-cover"
                        />
                    </button>
                    <div className="inline-block w-[calc(100%-52px)] pt-3">
                        <p className="break-words">
                            <span
                                className="font-medium text-sm tracking-wide whitespace-nowrap cursor-pointer"
                                onClick={() => navigate(RoutesTypes.DASHBOARD + userId)}
                            >
                                {username}
                            </span>
                            <span className="ml-2">{currentPost?.text}</span>
                        </p>
                    </div>
                </div>
                <LikesBar
                    userId={userId}
                    likes={currentPost?.likes || []}
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
                            profileImage={profileImage}
                            closeEvent={() => setIsUnfollowModalOpen(false)}
                            questionText={`Unfollow @${username}`}
                            buttonText="Unfollow"
                        />
                    </Modal> :
                    null
            }
            <PostsModalNavigation
                currentIndex={currentIndex}
                posts={posts}
                userId={userId}
            />
        </div>
    )
}

export default PostModalPage