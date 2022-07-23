import Modal from 'components/modal/Modal'
import PostModalPage from 'pages/profile/components/post-modal-page/PostModalPage'
import React, { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'

const PostModalPageRoute: React.FC = () => {
    const navigate = useNavigate();

    const navigateBack = useCallback(() => {
        navigate(-1)
    }, [])

    return (
        <Modal
            closeEvent={navigateBack}
            styles="w-[70%] sm:w-5/6 h-[70%] lg:h-[90%] top-[15%] lg:top-[5%]"
        >
            <PostModalPage />
        </Modal>
    )
}

export default PostModalPageRoute