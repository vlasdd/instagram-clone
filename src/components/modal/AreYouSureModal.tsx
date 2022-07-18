import React from 'react'

type AreYouSureModalProps = {
    areYouSureEvent: () => void
    profileImage: string
    closeEvent: () => void
    buttonText: string
    questionText: string
    additionalText?: string
}

const AreYouSureModal: React.FC<AreYouSureModalProps> = React.memo(({ 
    areYouSureEvent, 
    profileImage, 
    closeEvent, 
    buttonText, 
    questionText, 
    additionalText 
}) => {
    return (
        <div className="h-full w-full flex flex-col items-center z-50">
            <div className={`w-full h-[100px] flex items-start justify-center ${additionalText ? "mt-3 mb-2" : "mt-6 mb-4"}`}>
                <img
                    src={profileImage.length ? profileImage : process.env.PUBLIC_URL + "/images/default-avatar-image.jpg"}
                    className="rounded-full h-[100px] w-[100px] object-cover"
                />
            </div>
            <p className={`text-sm ${!additionalText && "mb-6"}`}>{questionText}?</p>
            {
                additionalText ?
                    <p className="text-gray-400 text-sm w-3/4 text-center mb-3 mt-1">{additionalText}</p> :
                    null
            }
            <button
                className="w-full h-12 border-t-2 flex items-center justify-center text-rose-600 font-bold text-sm"
                onClick={areYouSureEvent}
            >
                {buttonText}
            </button>
            <button
                className="w-full h-12 border-t-2 flex items-center justify-center text-sm"
                onClick={closeEvent}
            >
                Cancel
            </button>
        </div>
    )
})

export default AreYouSureModal