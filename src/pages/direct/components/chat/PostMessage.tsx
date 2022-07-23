import UserLoader from 'components/other/UserLoader';
import ProfileRoutes from 'constants/profile-routes';
import RoutesTypes from 'constants/routes-types';
import useUserInfo from 'helpers/hooks/useUserInfo';
import React, { useCallback, useEffect, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useAppSelector } from 'redux-setup/hooks';
import { IMessageProps } from './RoomMessages';

const PostMessage: React.FC<IMessageProps> = React.memo(({ text, from, media, profileImage, post }) => {
    const loggedUser = useAppSelector(state => state.signedUser.user)
    const navigate = useNavigate();
    const scrollRef = useRef<HTMLDivElement>(null);

    const userInfo = useUserInfo(post?.fromId as string)

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollIntoView({ "behavior": "auto" })
        }
    }, [])

    const navigateToUsersProfile = useCallback(() => {
        navigate(RoutesTypes.DASHBOARD + from.userId)
    }, [from.userId])

    const navigateToPostProfile = useCallback(() => {
        navigate(RoutesTypes.DASHBOARD + userInfo.userId)
    }, [userInfo.userId])

    return (
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
                        onClick={navigateToUsersProfile}
                    >
                        <img
                            src={
                                profileImage.length ?
                                    profileImage :
                                    process.env.PUBLIC_URL + "/images/default-avatar-gray.jpg"
                            }
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
                                onClick={navigateToPostProfile}
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
                <Link to={RoutesTypes.DASHBOARD + post?.fromId + "/" + ProfileRoutes.POST + post?.postId}>
                    <img
                        src={media}
                        className="h-[190px] w-full mb-2 object-cover"
                    />
                </Link>
                <p className="break-words mx-1 mx-4 mb-1">
                    <button
                        onClick={navigateToPostProfile}
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