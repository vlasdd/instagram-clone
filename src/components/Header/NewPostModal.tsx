import React, { useState } from 'react'
import NewPostModalOne from './NewPostModalOne';
import NewPostModalTwo from './NewPostModalTwo';

type Props = {}

const NewPostModal: React.FC = () => {
    const [currentPageId, setCurrentPageId] = useState<number>(0);
    const [image, setImage] = useState<any>(null);

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
                                />
                            )
                        }
                    }
                })()
            }
        </>
    )
}

export default NewPostModal