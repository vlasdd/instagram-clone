import compareSize from 'helpers/other/compareSize';
import React from 'react'

type ImageModalProps = {
    image: string;
}

const ImageModal: React.FC<ImageModalProps> = ({ image }) => {
    return (
        <div className="w-full bg-black h-full flex items-center overflow-hidden rounded-xl">
            <img
                src={image}
                className={`${compareSize(image) ? "h-full" : "w-full"} object-cover`}
            />
        </div>
    )
}

export default ImageModal