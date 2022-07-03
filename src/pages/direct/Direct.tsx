import React, { useEffect, useState } from 'react'
import { Outlet, useParams } from 'react-router-dom'
import NewMessageModal from './components/NewMessageModal'
import NoChatSelected from './components/NoChatSelected'
import UsersSection from './components/UsersSection'
import Header from '../../components/header/Header'
import Modal from '../../components/modal/Modal'
import useWindowWidth from '../../helpers/useWindowWidth'

const Direct: React.FC = () => {
    const { chatId } = useParams();
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    const innerWidth = useWindowWidth();

    return (
        <div className="back w-screen h-screen flex flex-col items-center ">
            <Header />
            <div className="flex flex-col sm:flex-row gap-16 sm:gap-0 bg-white w-full md:w-11/12 lg:w-4/5 xl:w-2/3 h-[calc(100vh-90px)] border-x border-b border-t my-3">
                {
                    innerWidth > 640 ?
                        <>
                            <UsersSection openModal={() => setIsModalOpen(true)} />
                            {
                                chatId ?
                                    <Outlet /> :
                                    <NoChatSelected openModal={() => setIsModalOpen(true)} />
                            }
                        </> :
                        chatId ?
                            <Outlet /> :
                            <UsersSection openModal={() => setIsModalOpen(true)} />
                }

                {
                    isModalOpen ?
                        <Modal
                            closeEvent={() => setIsModalOpen(false)}
                            styles="h-[450px] top-[20%]"
                        >
                            <NewMessageModal
                                closeEvent={() => setIsModalOpen(false)}
                            />
                        </Modal> :
                        null
                }
            </div>
        </div>
    )
}

export default Direct