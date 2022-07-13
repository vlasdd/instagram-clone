import React, { useEffect, useRef, useState } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import RoutesTypes from 'constants/routes-types';
import MessageType from 'types/message-type';
import ProfileRoutes from 'constants/profile-routes';
import { doc, getDoc } from 'firebase/firestore';
import { db } from 'firebase-setup/firebaseConfig';
import UserState from 'types/user-state-type';
import UserLoader from 'components/other/UserLoader';

interface IMessageProps extends MessageType{
    loggedUserId: string,
    profileImage: string,
}

const Message: React.FC<IMessageProps> = ({ text, from, loggedUserId, media, profileImage, post }) => {
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
        <>
            <div
                className={`
                flex items-center gap-2 w-11/12 sm:w-5/6 xl:w-3/4 my-[6px]
                ${from.userId === loggedUserId ? "justify-end" : "justify-start"}
            `}
                ref={scrollRef}
            >
                {
                    from.userId !== loggedUserId ?
                        <button
                            className="flex gap-4"
                            onClick={() => navigate(RoutesTypes.DASHBOARD + from.userId)}
                        >
                            <img
                                src={profileImage.length ? profileImage : "../images/default-avatar-gray.jpg"}
                                className="h-8 w-8 rounded-full object-cover"
                            />
                        </button> :
                        null
                }
                <div className={`
                    inline-block max-w-[200px]
                    ${from.userId === loggedUserId ? "bg-gray-200" : "border"}
                    ${media && !post ? 
                        `rounded-[10px] ${text.length ? "pb-1" : ""}` : 
                        post ? 
                        "rounded-[25px] pb-2 pt-1":
                        "rounded-[25px] py-2 px-2"
                    } 
                `}>
                    {
                        post ?
                            <div className="w-full flex justify-start border-b items-center">
                                {
                                    userInfo.userId.length ?
                                        <button
                                            className="h-12 py-[0.5px] gap-2 flex items-center px-3"
                                            onClick={() => navigate(RoutesTypes.DASHBOARD + userInfo.userId)}
                                        >
                                            <img
                                                src={userInfo.profileImage.length ? userInfo.profileImage : "../images/default-avatar-image.jpg"}
                                                className="h-8 w-8 rounded-full object-cover"
                                            />
                                            <p className="text-[14px] tracking-wide whitespace-nowrap">{userInfo.username}</p>
                                        </button> :
                                        <UserLoader
                                            imageStyles={{ width: 36, height: 36, borderRadius: "50%" }}
                                            firstTextStyles={{ width: 100, height: 7, borderRadius: "10px" }}
                                            secondTextStyles={{ width: 80, height: 7, borderRadius: "10px" }}
                                            margin="my-1"
                                        />
                                }
                            </div> :
                            null
                    }
                    {
                        media.length ?
                            post ?
                                <Link to={RoutesTypes.DASHBOARD + post.fromId + "/" + ProfileRoutes.POST + post.postId} >
                                    <img
                                        src={media}
                                        className="w-[190px] mb-2"
                                    />
                                </Link> :
                                <img
                                    src={media}
                                    className="w-[190px] rounded rounded-t-[10px]"
                                /> :
                            null
                    }
                    {
                        text.length ?
                            <p className={`break-words mx-1 ${post ? "mx-4 mb-1" : ""}`}>
                                {userInfo.username.length ?
                                    <>
                                        <span className="font-medium text-sm">{userInfo.username}</span>
                                        <span className="text-sm">{" "}{text}</span>
                                    </>
                                    : 
                                    <span>{text}</span>}
                            </p> :
                            null
                    }
                </div>
            </div>
            <Outlet context={{ posts: [post] }} />
        </>
    )
}

export default Message