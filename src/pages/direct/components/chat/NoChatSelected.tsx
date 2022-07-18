import React from 'react'

const NoChatSelected: React.FC<{ openModal: () => void }> = React.memo(({ openModal }) => {
    return (
        <div className="w-full h-full flex flex-col justify-center items-center gap-1">
            <img
                src={process.env.PUBLIC_URL + "/images/direct.jpg"}
                className="w-[120px] h-[112px]"
                alt="direct"
            />
            <p className="text-2xl font-thin">Your Messages</p>
            <p className="text-gray-400 text-sm">Send private photos and messages to a friend or group.</p>
            <button
                className="h-[30px] w-[115px] mt-5 bg-blue-500 font-medium text-white rounded cursor-pointer text-sm tracking-wide flex items-center justify-center"
                onClick={openModal}
            >
                Send Message
            </button>
        </div>
    )
})

export default NoChatSelected