import React, { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import RoutesTypes from 'constants/routes-types'
import AreYouSureModal from 'components/modal/AreYouSureModal'
import Modal from 'components/modal/Modal'
import MessageType from 'types/messageType'
import useChatRoom from 'helpers/hooks/useChatRoom'
import UserState from 'types/userStateType'

type RoomInfoProps = {
  secondUser: UserState
  messages: MessageType[];
}

const RoomInfo: React.FC<RoomInfoProps> = React.memo(({ secondUser, messages }) => {
  const navigate = useNavigate();
  const { chatId } = useParams();

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const { deleteChatRoom } = useChatRoom();

  return (
    <div className="w-full flex flex-col justify-center py-4">
      <p className="font-medium text-sm tracking-wide whitespace-nowrap px-4">Members</p>
      <div className="flex w-full h-24 items-center gap-3 border-b px-4">
        <Link to={RoutesTypes.DASHBOARD + secondUser.userId}>
          <img
            src={secondUser.profileImage.length ? secondUser.profileImage : process.env.PUBLIC_URL + "/images/default-avatar-gray.jpg"}
            className="h-[60px] w-[60px] rounded-full object-cover"
          />
        </Link>
        <Link
          className="flex flex-col justify-center text-left"
          to={RoutesTypes.DASHBOARD + secondUser.userId}
        >
          <p className="font-medium text-sm tracking-wide whitespace-nowrap">{secondUser.username}</p>
          <p className="text-gray-400 text-sm">{secondUser.fullName}</p>
        </Link>
      </div>
      <div className="w-full flex flex-col items-start border-b gap-4 py-1">
        <button
          className="py-1 text-rose-600 font-medium text-sm px-4"
          onClick={() => setIsDeleteModalOpen(true)}
        >
          Delete chat
        </button>
        <button
          className="py-1 text-rose-600 font-medium text-sm px-4"
          onClick={() => null}
        >
          Report
        </button>
        <button
          className="py-1 text-rose-600 font-medium text-sm px-4"
          onClick={() => null}
        >
          Block
        </button>
      </div>
      {
        isDeleteModalOpen ?
          <Modal
            closeEvent={() => setIsDeleteModalOpen(false)}
            styles="h-72 top-[26.5%]"
          >
            <AreYouSureModal
              areYouSureEvent={() => {
                deleteChatRoom({ messages, chatId: chatId as string });
                navigate(RoutesTypes.DIRECT);
              }}
              profileImage={secondUser.profileImage}
              closeEvent={() => setIsDeleteModalOpen(false)}
              questionText="Delete Conversation"
              buttonText="Delete"
              additionalText="Deleting removes the conversation from everyone's inbox"
            />
          </Modal> :
          null
      }
    </div>
  )
})

export default RoomInfo