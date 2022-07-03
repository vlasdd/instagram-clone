import React, { useEffect, useState } from 'react'
import UserState from 'types/user-state-type';
import NewPostModalOne from 'components/header/components/new-post-modal/components/NewPostModalOne';
import NewPostModalTwo from 'components/header/components/new-post-modal/components/NewPostModalTwo';

type NewPostModalProps = {
    user: UserState;
    closeEvent: () => void
}

const NewPostModal: React.FC<NewPostModalProps> = ({ user, closeEvent }) => {
    const [currentPageId, setCurrentPageId] = useState<number>(0);
    const [image, setImage] = useState<any>(null);

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
                                    user={user}
                                />
                            )
                        }
                        default: {
                            return null
                        }
                    }
                })()
            }
        </>
    )
}

export default NewPostModal
