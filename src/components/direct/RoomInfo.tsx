import { deleteDoc, doc } from 'firebase/firestore'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import RoutesTypes from '../../constants/routes-types'
import { db } from '../../firebase/firebaseConfig'
import AreYouSureModal from '../AreYouSureModal'
import Modal from '../Modal'

type RoomInfoProps = {
  userId: string,
  username: string,
  fullName: string,
  profileImage: string,
  chatId: string,
}

const RoomInfo: React.FC<RoomInfoProps> = ({ userId, username, fullName, profileImage, chatId }) => {
  const navigate = useNavigate();

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);

  return (
    <div className="w-full flex flex-col justify-center py-4">
      <p className="font-medium text-sm tracking-wide whitespace-nowrap px-4">Members</p>
      <div className="flex w-full h-24 items-center gap-3 border-b px-4">
        <Link to={RoutesTypes.DASHBOARD + userId}>
          <img
            src={profileImage.length ? profileImage : "../images/default-avatar-gray.jpg"}
            className="h-[60px] w-[60px] rounded-full object-cover"
          />
        </Link>
        <Link
          className="flex flex-col justify-center text-left"
          to={RoutesTypes.DASHBOARD + userId}
        >
          <p className="font-medium text-sm tracking-wide whitespace-nowrap">{username}</p>
          <p className="text-gray-400 text-sm">{fullName}</p>
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
                deleteDoc(doc(db, "chats", chatId));
                navigate(RoutesTypes.DIRECT);
              }}
              profileImage={profileImage}
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
}

export default RoomInfo