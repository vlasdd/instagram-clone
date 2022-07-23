import Modal from 'components/modal/Modal'
import UsersListModal from 'pages/profile/components/users-list/UsersListModal'
import React, { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'

type ListModalRouteProps = {
    usersList: {userId: string}[],
    descriptionLine: string
}

const ListModalRoute: React.FC<ListModalRouteProps> = ({ usersList, descriptionLine }) => {
    const navigate = useNavigate();

    const navigateBack = useCallback(() => {
        navigate(-1)
    }, [])

    return (
        <Modal
            closeEvent={navigateBack}
            styles="h-96 top-[20%]"
        >
            <UsersListModal
                descriptionLine={descriptionLine}
                usersList={usersList}
                closeEvent={navigateBack}
            />
        </Modal>
    )
}

export default ListModalRoute