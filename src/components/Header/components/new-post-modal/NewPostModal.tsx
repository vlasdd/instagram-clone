import React, { useEffect, useState } from 'react'
import NewPostModalOne from 'components/header/components/new-post-modal/NewPostModalOne';
import NewPostModalTwo from 'components/header/components/new-post-modal/NewPostModalTwo';

type NewPostModalProps = {
    closeEvent: () => void
}

const NewPostModal: React.FC<NewPostModalProps> = React.memo(({ closeEvent }) => {
    const [currentPageId, setCurrentPageId] = useState<number>(0);
    const [image, setImage] = useState<any[]>([]);
    const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);

    useEffect(() => {
        if(currentPageId === 2){
            closeEvent();
        }
    }, [currentPageId])

    const generatePages = () => {
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
    }

    return (
        <>
            {generatePages()}
        </>
    )
})

export default NewPostModal
