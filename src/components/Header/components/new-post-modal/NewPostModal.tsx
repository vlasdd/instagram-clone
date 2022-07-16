import React, { useEffect, useState } from 'react'
import NewPostModalOne from 'components/header/components/new-post-modal/components/NewPostModalOne';
import NewPostModalTwo from 'components/header/components/new-post-modal/components/NewPostModalTwo';

type NewPostModalProps = {
    closeEvent: () => void
}

const NewPostModal: React.FC<NewPostModalProps> = React.memo(({ closeEvent }) => {
    const [currentPageId, setCurrentPageId] = useState<number>(0);
    const [image, setImage] = useState<any[]>([]);
    const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
   // const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    useEffect(() => {
        if(currentPageId === 2){
            closeEvent();
        }
    }, [currentPageId])

    return (
        <>
            {
                (() => {
                    switch (currentPageId) {
                        case 0: {
                            return (
                                <NewPostModalOne
                                    image={image}
                                    currentImageIndex={currentImageIndex}
                                    setCurrentImageIndex={setCurrentImageIndex}
                                    setImage={setImage}
                                    setCurrentPageId={setCurrentPageId}
                                />
                            )
                        }
                        case 1: {
                            return (
                                <NewPostModalTwo 
                                    setCurrentPageId={setCurrentPageId}
                                    image={image}
                                />
                            )
                        }
                        default: {
                            return null
                        }
                    }
                })()
            }
            {/* {
                isModalOpen ?
                    <Modal
                        closeEvent={() => setIsModalOpen(false)}
                        styles="h-72 top-[26.5%]"
                    >
                        <AreYouSureModal
                            areYouSureEvent={() => {
                                setIsModalOpen(false)
                            }}
                            profileImage={""}
                            closeEvent={() => setIsModalOpen(false)}
                            questionText={`Unfollow ${"111"}`}
                            buttonText="Unfollow"
                        />
                    </Modal> :
                    null
            } */}
        </>
    )
})

export default NewPostModal
