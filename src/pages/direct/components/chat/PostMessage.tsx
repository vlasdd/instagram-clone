import UserLoader from 'components/other/UserLoader';
import ProfileRoutes from 'constants/profile-routes';
import RoutesTypes from 'constants/routes-types';
import { db } from 'firebase-setup/firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';
import React, { useEffect, useRef, useState } from 'react'
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { useAppSelector } from 'redux-setup/hooks';
import PostType from 'types/postType';
import UserState from 'types/userStateType';
import { IMessageProps } from './RoomMessages';

const PostMessage: React.FC<IMessageProps> = React.memo(({ text, from, media, profileImage, post }) => {
    const loggedUser = useAppSelector(state => state.signedUser.user)
    const navigate = useNavigate();
    const scrollRef = useRef<HTMLDivElement>(null);
    
    const [currentPostArr, setCurrentPostArr] = useState<PostType[]>([post as PostType])
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
            scrollRef.current.scrollIntoView({ "behavior": "auto" })
        }

        const getUser = async () => {
            const user = (await getDoc(doc(db, "users", currentPostArr[0].fromId as string))).data() as UserState;
            setUserInfo({ ...user })
        }

        setUserInfo({ username: "", profileImage: "", userId: "" })
        getUser();
    }, [])

    return (
        <>
            <div
                className={`
                flex items-center gap-2 w-11/12 sm:w-5/6 xl:w-3/4 my-[6px] 
                ${from.userId === loggedUser.userId ? "justify-end" : "justify-start"}
            `}
                ref={scrollRef}
            >
                {
                    from.userId !== loggedUser.userId ?
                        <button
                            className="flex justify-center items-center gap-4 self-end"
                            onClick={() => navigate(RoutesTypes.DASHBOARD + from.userId)}
                        >
                            <img
                                src={profileImage.length ? profileImage : process.env.PUBLIC_URL + "/images/default-avatar-gray.jpg"}
                                className="h-8 w-8 rounded-full object-cover"
                            />
                        </button> :
                        null
                }
                <div className={`
                    inline-block max-w-[200px] rounded-[25px] pb-2 pt-1 w-[200px]
                    ${from.userId === loggedUser.userId ? "bg-gray-200" : "border"}
                `}>
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
                                                from.userId === loggedUser.userId ?
                                                    process.env.PUBLIC_URL + "/images/default-avatar-gray.jpg" :
                                                    process.env.PUBLIC_URL + "/images/default-avatar-image.jpg"
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
                    <Link to={ProfileRoutes.POST + currentPostArr[0].postId}>
                        <img
                            src={media}
                            className="h-[190px] w-full mb-2 object-cover"
                        />
                    </Link>
                    <p className="break-words mx-1 mx-4 mb-1">

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
            <Outlet context={{ posts: currentPostArr, changePosts: setCurrentPostArr }}/>
        </>
    )
})


export default PostMessage