import React from 'react'

type UnfollowModalProps = {
    unfollowEvent: () => void
    username: string
    profileImage: string
    closeEvent: () => void
}

const UnfollowModal: React.FC<UnfollowModalProps> = ({ unfollowEvent, username, profileImage, closeEvent }) => {
    return (
        <div className="h-full w-full flex flex-col items-center">
            <div className="w-full h-[100px] flex mt-6 mb-4 items-start justify-center">
                <img
                    src={profileImage.length ? profileImage : "../images/default-avatar-image.jpg"}
                    className="rounded-full h-full w-[100px] object-cover"
                />
            </div>
            <p className="text-sm mb-7">Unfollow @{username}?</p>
            <button
                className="w-full h-12 border-t-2 flex items-center justify-center text-rose-600 font-bold text-sm"
                onClick={unfollowEvent}
            >
                Unfollow
            </button>
            <button
                className="w-full h-12 border-t-2 flex items-center justify-center text-sm"
                onClick={closeEvent}
            >
                Cancel
            </button>
        </div>
    )
}

export default UnfollowModal