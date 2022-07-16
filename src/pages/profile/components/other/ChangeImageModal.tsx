import React from 'react'
import { useAppDispatch, useAppSelector } from 'redux-setup/hooks';
import { deleteObject, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { updateDoc, doc } from "firebase/firestore";
import { db, storage } from 'firebase-setup/firebaseConfig';
import { v4 } from "uuid";
import { setSignedUser } from 'redux-setup/features/signedUser';
import UserState from 'types/user-state-type';
import { setIsBeingLoaded } from 'redux-setup/features/isBeingLoaded';

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
        dispatch(setIsBeingLoaded(true))

        const imageUpload = event.target.files[0];

        if (currentUser.profileImage !== "") {
            const deleteImageRef = ref(storage, currentUser.profileImage);
            await deleteObject(deleteImageRef);
        }

        const imageRef = ref(storage, `Images/${imageUpload.name + v4()}`)
        await uploadBytes(imageRef, imageUpload)

        const imageUrl = await getDownloadURL(imageRef);
        await updateDoc(doc(db, "users", currentUser.userId), {
            profileImage: imageUrl
        });

        dispatch(setSignedUser({...currentUser, profileImage: imageUrl}));
        closeEvent();

        dispatch(setIsBeingLoaded(false))
    }

    const deleteImage = async (currentUser: UserState) => {
        const imageRef = ref(storage, currentUser.profileImage);
        await deleteObject(imageRef);

        dispatch(setIsBeingLoaded(true))

        await updateDoc(doc(db, "users", currentUser.userId), {
            profileImage: ""
        });

        dispatch(setSignedUser({ ...currentUser, profileImage: "" }));
        closeEvent();

        dispatch(setIsBeingLoaded(false))
    }

    return (
        <div className="h-full w-full flex flex-col items-center">
            <div className="w-full h-[50px] flex mt-2 mb-1 items-start justify-center">
                <img
                    src={currentUser.profileImage.length ? currentUser.profileImage : "../images/default-avatar-image.jpg"}
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
                        onClick={() => deleteImage(currentUser)}
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