import RoutesTypes from 'constants/routes-types';
import React, { useCallback, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from 'redux-setup/hooks';
import { IMessageProps } from './RoomMessages';

const TextMessage: React.FC<IMessageProps> = React.memo(({ text, from, profileImage  }) => {
    const loggedUser = useAppSelector(state => state.signedUser.user)
    const navigate = useNavigate();
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollIntoView({"behavior": "auto"})
        }
    }, [])

    const navigateToProfile = useCallback(() => {
        navigate(RoutesTypes.DASHBOARD + from.userId)
    }, [from.userId])

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
                        onClick={navigateToProfile}
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
                inline-block max-w-[200px] rounded-[25px] py-2 px-2
                ${from.userId === loggedUser.userId ? "bg-gray-200" : "border"} 
            `}>
                <p className="break-words mx-1">
                    <span>{text}</span>
                </p>
            </div>
        </div>
    )
})

export default TextMessage