import Modal from 'components/modal/Modal';
import RoutesTypes from 'constants/routes-types';
import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from 'redux-setup/hooks';
import ImageModal from './ImageModal';
import { IMessageProps } from './RoomMessages'

const ImageMessage: React.FC<IMessageProps> = React.memo(({ text, from, media, profileImage }) => {
    const loggedUser = useAppSelector(state => state.signedUser.user)
    const navigate = useNavigate();
    const scrollRef = useRef<HTMLDivElement>(null);

    const [isImageModalOpen, setIsImageModalOpen] = useState<boolean>(false);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollIntoView({"behavior": "auto"})
        }
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
                    inline-block rounded-[10px] 
                    ${from.userId === loggedUser.userId ? "bg-gray-200" : "border"} 
                    ${text.length ? "pb-1" : ""} w-[200px]
                `}>
                    <button onClick={() => setIsImageModalOpen(true)}>
                        <img
                            src={media}
                            className="h-[190px] w-full rounded rounded-t-[10px] object-cover mb-[-5px]"
                        />
                    </button>
                    {
                        text.length ?
                            <p className="break-words mx-1">
                                <span>{text}</span>
                            </p> :
                            null
                    }
                </div>
            </div>
            {
                isImageModalOpen ?
                    <Modal
                        closeEvent={() => setIsImageModalOpen(false)}
                        styles="w-[70%] sm:w-5/6 h-[60%] lg:h-[90%] top-[20%] lg:top-[5%]"
                    >
                        <ImageModal image={media} />
                    </Modal> :
                    null
            }
        </>
    )
})


export default ImageMessage