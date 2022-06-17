import React, { useState } from 'react'
import { Outlet, useParams } from 'react-router-dom'
import NewMessageModal from '../components/direct/NewMessageModal'
import NoChatSelected from '../components/direct/NoChatSelected'
import UsersSection from '../components/direct/UsersSection'
import Header from '../components/header/Header'
import Modal from '../components/Modal'

const Direct: React.FC = () => {
    const { chatId } = useParams();
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    return (
        <div className="back w-screen h-screen flex flex-col items-center">
            <Header />
            <div className="flex flex-col sm:flex-row gap-16 sm:gap-0 bg-white w-full md:w-11/12 lg:w-4/5 xl:w-3/4 h-[calc(100vh-68px)] border-x border-b md:border-t md:my-3">
                <UsersSection openModal={() => setIsModalOpen(true)}/>
                {chatId ?
                    <Outlet /> :
                    <NoChatSelected openModal={() => setIsModalOpen(true)}/>
                }
                {isModalOpen ?
                    <Modal
                        closeEvent={() => setIsModalOpen(false)}
                        styles="h-[450px] top-[20%]"
                    >
                        <NewMessageModal 
                            closeEvent={() => setIsModalOpen(false)}
                        />
                    </Modal>:
                    null
                }
            </div>
        </div>
    )
}

export default Direct