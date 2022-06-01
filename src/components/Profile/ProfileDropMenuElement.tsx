import React from 'react';

type DropMenuElementProps = {
    image?: JSX.Element|JSX.Element[],
    text: string,
    callback: () => void,
}

const ProfileDropMenuElement: React.FC<DropMenuElementProps> = ({ image, text, callback }) => {
    return (
        <button
            className="flex w-full h-9 items-center justify-center "
            onClick={callback}
        >
            <div className="flex w-5/6 gap-3">
                {image && image}
                <p className="text-gray-700 text-sm">{text}</p>
            </div>
        </button>
    )
}

export default ProfileDropMenuElement;