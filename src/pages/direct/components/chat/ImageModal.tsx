import React from 'react'

type ImageModalProps = {
    image: string;
}

const ImageModal: React.FC<ImageModalProps> = React.memo(({ image }) => {
    return (
        <div className="w-full bg-black h-full flex items-center overflow-hidden rounded-xl">
            <img
                src={image}
                className="h-full w-full object-contain"
            />
        </div>
    )
})

export default ImageModal