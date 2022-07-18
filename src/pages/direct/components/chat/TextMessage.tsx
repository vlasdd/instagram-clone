import RoutesTypes from 'constants/routes-types';
import React, { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom';
import { IMessageProps } from './RoomMessages';

const TextMessage: React.FC<IMessageProps> = React.memo(({ text, from, loggedUserId, profileImage  }) => {
    const navigate = useNavigate();
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollIntoView({"behavior": "auto"})
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
                            src={profileImage.length ? profileImage : process.env.PUBLIC_URL + "/images/default-avatar-gray.jpg"}
                            className="h-8 w-8 rounded-full object-cover"
                        />
                    </button> :
                    null
            }
            <div className={`inline-block max-w-[200px] ${from.userId === loggedUserId ? "bg-gray-200" : "border"} rounded-[25px] py-2 px-2`}>
                <p className="break-words mx-1">
                    <span>{text}</span>
                </p>
            </div>
        </div>
    )
})

export default TextMessage