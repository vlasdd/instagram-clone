import Modal from 'components/modal/Modal';
import UserLoader from 'components/other/UserLoader';
import RoutesTypes from 'constants/routes-types';
import React, { useCallback, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Additional from 'svgs/empty/Additional';
import PostType from 'types/postType';
import SettingsModal from './SettingsModal';

type PostHeaderProps = {
    userInfo: {
        username: string,
        profileImage: string,
        userId: string
    },
    post: PostType
}

const PostHeader: React.FC<PostHeaderProps> = React.memo(({ userInfo, post }) => {
    const navigate = useNavigate();
    const [isSettingsModalOpen, setIsSettingsModalOpen] = useState<boolean>(false);

    const navigateToProfile = useCallback(() => {
        navigate(RoutesTypes.DASHBOARD + userInfo.userId)
    }, [userInfo.userId])

    const openSettingsModal = useCallback(() => {
        setIsSettingsModalOpen(true)
    }, [])

    const closeSettingsModal = useCallback(() => {
        setIsSettingsModalOpen(false)
    }, [])

    return (
        <div className="w-full flex justify-between border-b items-center">
            {
                userInfo.userId.length ?
                    <button
                        className="h-14 py-[0.5px] gap-4 flex items-center px-3"
                        onClick={navigateToProfile}
                    >
                        <img
                            src={
                                userInfo.profileImage.length ?
                                    userInfo.profileImage :
                                    process.env.PUBLIC_URL + "/images/default-avatar-image.jpg"
                            }
                            className="h-9 w-9 rounded-full object-cover"
                        />
                        <p className="font-medium text-[14px] tracking-wide whitespace-nowrap">{userInfo.username}</p>
                    </button> :
                    <UserLoader
                        imageStyles={{ width: 36, height: 36, borderRadius: "50%" }}
                        firstTextStyles={{ width: 100, height: 7, borderRadius: "10px" }}
                        secondTextStyles={{ width: 80, height: 7, borderRadius: "10px" }}
                        margin="my-1"
                    />
            }
            <button
                className="mr-4"
                onClick={openSettingsModal}
            >
                <Additional styles="h-5 w-5" />
            </button>
            {
                isSettingsModalOpen ?
                    <Modal
                        closeEvent={closeSettingsModal}
                        styles="top-[35%] h-60"
                    >
                        <SettingsModal
                            closeEvent={closeSettingsModal}
                            post={post}
                        />
                    </Modal> :
                    null
            }
        </div>
    )
})

export default PostHeader