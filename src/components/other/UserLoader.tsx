import React from 'react';
import { RectShape } from 'react-placeholder/lib/placeholders';

type UserLoaderType = {
    imageStyles: object, 
    firstTextStyles: object,
    secondTextStyles: object,
    margin?: string,
}

const UserLoader: React.FC<UserLoaderType> = React.memo(({ imageStyles, firstTextStyles, secondTextStyles, margin }) => {
    return (
        <div className={`flex px-[2px] pr-6 items-center justify-center py-1 ${margin ? margin: ""}`}>
            <div className="w-full py-[0.5px] flex items-center px-3">
                <RectShape color="#E5E7EB" style={imageStyles} />
                <div className="w-[calc(100%-70px)] mt-1 gap-2 h-5/6 flex flex-col justify-center">
                    <RectShape color="#E5E7EB" style={firstTextStyles} />
                    <RectShape color="#E5E7EB" style={secondTextStyles} />
                </div>
            </div>
        </div>
    )
})

export default UserLoader