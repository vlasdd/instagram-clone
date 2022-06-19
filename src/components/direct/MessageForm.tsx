import React from 'react'
import Heart from '../../svgs/Heart'
import Photograph from '../../svgs/Photograph'
import Smile from '../../svgs/Smile'

type MessageFormProps = {
    wordEntering: string,
    setWordEntering: React.Dispatch<React.SetStateAction<string>>,
    sendMessage: () => void,
    setImageUpload:React.Dispatch<React.SetStateAction<File | null>>,
    imageUpload: File | null
}

const MessageForm: React.FC<MessageFormProps> = ({ wordEntering, setWordEntering, sendMessage, setImageUpload, imageUpload }) => {
    return (
        <div className="flex justify-between items-center mb-[18px] rounded-full border h-[45px] w-3/4 sm:w-5/6 xl:w-3/4 px-4 gap-4">
            <button
                onClick={() => {
                    setWordEntering(prevText => prevText + "❤️");
                }}
            >
                <Heart />
            </button>
            <input
                type="text"
                placeholder="Message..."
                className="w-full h-8 placeholder:text-sm"
                value={wordEntering}
                onChange={event => setWordEntering(event.target.value)}
                onKeyDown={event => {
                    if (event.key === "Enter") {
                        sendMessage();
                    }
                }}
            />
            {
                (wordEntering.length && wordEntering.split("").some(letter => letter !== " ") || imageUpload) ?
                    <button
                        className="font-semibold text-blue-500"
                        onClick={sendMessage}
                    >
                        <p>Send</p>
                    </button> :
                    <div className="flex gap-2">
                        <label 
                            htmlFor='img'
                            className='cursor-pointer'
                        >
                            <Photograph />
                        </label>
                        <input
                            type="file"
                            id="img"
                            accept="image/*"
                            className="hidden "
                            onChange={(event) => {
                                if (event.target.files) {
                                    setImageUpload(event.target.files[0])
                                }
                            }}
                        />
                    </div>
            }
        </div>
    )
}

export default MessageForm