import React, { useState } from 'react'
import useFollowers from 'helpers/hooks/useFollowers';
import PostType from 'types/post-type';
import { useNavigate } from 'react-router-dom';
import RoutesTypes from 'constants/routes-types';
import ProfileRoutes from 'constants/profile-routes';
import Modal from 'components/modal/Modal';
import SharePostModal from 'components/modal/SharePostModal';

type SettingsModalProps = {
    closeEvent: () => void;
    post: PostType
}

const SettingsModal: React.FC<SettingsModalProps> = React.memo(({ closeEvent, post }) => {
    const navigate = useNavigate();
    
    const { removeFromFollowing } = useFollowers({ userId: post.fromId })

    const [isShareModalOpen, setIsShareModalOpen] = useState<boolean>(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(
            window.location.origin +
            RoutesTypes.DASHBOARD +
            post.fromId + "/" +
            ProfileRoutes.POST +
            post.postId
        );
        closeEvent();
    }

    return (
        <>
            <div className="h-full w-full flex flex-col items-center">
                <button
                    className="w-full active:bg-gray-300 h-12 flex items-center justify-center text-rose-600 font-medium text-sm rounded-t-xl"
                    onClick={() => {
                        removeFromFollowing()
                        closeEvent()
                    }}
                >
                    Unfollow
                </button>
                <button
                    className="w-full active:bg-gray-300 h-12 border-t-2 flex items-center justify-center text-sm"
                    onClick={() => navigate(RoutesTypes.DASHBOARD + post.fromId + "/" + ProfileRoutes.POST + post.postId)}
                >
                    Go to post
                </button>
                <button
                    className="w-full active:bg-gray-300 h-12 border-t-2 flex items-center justify-center text-sm"
                    onClick={() => setIsShareModalOpen(true)}
                >
                    Share to
                </button>
                <button
                    className="w-full active:bg-gray-300 h-12 border-t-2 flex items-center justify-center text-sm"
                    onClick={handleCopy}
                >
                    Copy link
                </button>
                <button
                    className="w-full active:bg-gray-300 h-12 border-t-2 flex items-center justify-center text-sm rounded-b-xl"
                    onClick={closeEvent}
                >
                    Cancel
                </button>
            </div>
            {
                isShareModalOpen ?
                    <Modal
                        closeEvent={() => setIsShareModalOpen(false)}
                        styles="h-[450px] top-[20%]"
                    >
                        <SharePostModal
                            closeEvent={() => setIsShareModalOpen(false)}
                            currentPost={post}
                        />
                    </Modal> :
                    null
            }
        </>
    )
})


export default SettingsModal
