import UserLoader from 'components/other/UserLoader';
import ProfileRoutes from 'constants/profile-routes';
import RoutesTypes from 'constants/routes-types';
import { db } from 'firebase-setup/firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';
import React, { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import UserState from 'types/user-state-type';
import { IMessageProps } from './RoomMessages';

const PostMessage: React.FC<IMessageProps> = React.memo(({ text, from, loggedUserId, media, profileImage, post }) => {
    const navigate = useNavigate();
    const scrollRef = useRef<HTMLDivElement>(null);

    const [userInfo, setUserInfo] = useState<{
        username: string,
        profileImage: string,
        userId: string
    }>({
        username: "",
        profileImage: "",
        userId: ""
    })
    const [isImageModalOpen, setIsImageModalOpen] = useState<boolean>(false);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollIntoView({"behavior": "auto"})
        }

        if(post){
            const getUser = async () => {
                const user = (await getDoc(doc(db, "users", post.fromId))).data() as UserState;
                setUserInfo({ ...user })
            }
    
            setUserInfo({ username: "", profileImage: "", userId: "" })
            getUser();
        }
    }, [])

    return (
        <div
            className={`flex items-center gap-2 w-11/12 sm:w-5/6 xl:w-3/4 my-[6px] ${from.userId === loggedUserId ? "justify-end" : "justify-start"}`}
            ref={scrollRef}
        >
            {
                from.userId !== loggedUserId ?
                    <button
                        className="flex justify-center items-center gap-4 self-end"
                        onClick={() => navigate(RoutesTypes.DASHBOARD + from.userId)}
                    >
                        <img
                            src={profileImage.length ? profileImage : "../images/default-avatar-gray.jpg"}
                            className="h-8 w-8 rounded-full object-cover"
                        />
                    </button> :
                    null
            }
            <div className={`inline-block max-w-[200px] ${from.userId === loggedUserId ? "bg-gray-200" : "border"} rounded-[25px] pb-2 pt-1 w-[200px]`}>
                <div className="w-full flex justify-start border-b items-center">
                    {
                        userInfo.userId.length ?
                            <button
                                className="h-12 py-[0.5px] gap-2 flex items-center px-3"
                                onClick={() => navigate(RoutesTypes.DASHBOARD + userInfo.userId)}
                            >
                                <img
                                    src={
                                        userInfo.profileImage.length ?
                                            userInfo.profileImage :
                                            from.userId === loggedUserId ?
                                                "../images/default-avatar-gray.jpg" :
                                                "../images/default-avatar-image.jpg"
                                    }
                                    className="h-8 w-8 rounded-full object-cover"
                                />
                                <p className="text-[14px] tracking-wide whitespace-nowrap">{userInfo.username}</p>
                            </button> :
                            <UserLoader
                                imageStyles={{ width: 30, height: 30, borderRadius: "50%" }}
                                firstTextStyles={{ width: 100, height: 7, borderRadius: "10px" }}
                                secondTextStyles={{ width: 80, height: 7, borderRadius: "10px" }}
                                margin="my-1"
                            />
                    }
                </div>
                <Link to={RoutesTypes.DASHBOARD + post?.fromId + "/" + ProfileRoutes.POST + post?.postId} >
                    <img
                        src={media}
                        className="h-[190px] w-full mb-2 object-cover"
                    />
                </Link>
                <p className={`break-words mx-1 ${post ? "mx-4 mb-1" : ""}`}>

                    <button
                        onClick={() => navigate(RoutesTypes.DASHBOARD + from.userId)}
                        className="font-medium text-sm"
                    >
                        {userInfo.username}
                    </button>
                    <span className="text-sm">{" "}{text}</span>
                </p>
            </div>
        </div>
    )
})


export default PostMessage