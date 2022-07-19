import React from 'react'
import { useAppDispatch, useAppSelector } from 'redux-setup/hooks';
import { createNewProfileImage, deleteProfileImage, setSignedUser } from 'redux-setup/features/signedUser';

type ChangeImageModalProps = {
    closeEvent: () => void
}

const ChangeImageModal: React.FC<ChangeImageModalProps> = React.memo(({ closeEvent }) => {
    const currentUser = useAppSelector(state => state.signedUser.user);
    const dispatch = useAppDispatch();

    const uploadImage = async (event: React.ChangeEvent<HTMLInputElement>) => {
        if(!event.target.files){
            return;
        }

        await dispatch(createNewProfileImage({image: event.target.files[0]}))
        closeEvent();
    }

    const deleteImage = async () => {
        await dispatch(deleteProfileImage());
        closeEvent();
    }

    return (
        <div className="h-full w-full flex flex-col items-center">
            <div className="w-full h-[50px] flex mt-2 mb-1 items-start justify-center">
                <img
                    src={currentUser.profileImage.length ? currentUser.profileImage : process.env.PUBLIC_URL + "/images/default-avatar-image.jpg"}
                    className="rounded-full h-full w-[50px] object-cover"
                />
            </div>
            <p className="font-medium text-md">Synced Profile Photo</p>
            <p className="text-center text-gray-400 text-sm pb-2">Instagram</p>
            <label
                className="w-full h-12 border-t-2 flex items-center justify-center cursor-pointer"
            >
                <input
                    type="file"
                    accept="image/png, image/jpg, image/jpeg"
                    className="hidden"
                    onChange={(event) => uploadImage(event)}
                />
                <p className="text-teal-500 font-medium text-sm">Upload Photo</p>
            </label>
            <button
                className="w-full h-12 border-t-2 flex items-center justify-center text-sm"
            >
                Manage Sync Settings
            </button>
            {
                currentUser.profileImage.length ?
                    <button
                        className="w-full h-12 border-t-2 flex items-center justify-center text-rose-600 font-medium text-sm"
                        onClick={deleteImage}
                    >
                        Remove Current Photo
                    </button> :
                    undefined
            }
            <button
                className="w-full h-12 border-t-2 flex items-center justify-center text-sm"
                onClick={closeEvent}
            >
                Cancel
            </button>
        </div>
    )
})

export default ChangeImageModal