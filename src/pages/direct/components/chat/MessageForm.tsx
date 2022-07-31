import createMessage from 'apis/createMessage'
import DropMenu from 'components/other/DropMenu'
import Picker, { IEmojiData } from 'emoji-picker-react'
import React, { useCallback, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useAppSelector } from 'redux-setup/hooks'
import Heart from 'svgs/empty/Heart'
import Photograph from 'svgs/empty/Photograph'
import Smile from 'svgs/empty/Smile'
import MessageType from 'types/messageType'

type MessageFormProps = {
    wordEntering: string,
    setWordEntering: React.Dispatch<React.SetStateAction<string>>,
    setImageUpload:React.Dispatch<React.SetStateAction<File | null>>,
    imageUpload: File | null,
    messages: MessageType[]
}

const MessageForm: React.FC<MessageFormProps> = React.memo(({ 
    wordEntering, 
    setWordEntering, 
    setImageUpload, 
    imageUpload, 
    messages,
}) => {
    const loggedUser = useAppSelector(state => state.signedUser.user);

    const [areEmojiOpen, setAreEmojiOpen] = useState<boolean>(false);

    const { chatId } = useParams();

    const closeEvent = useCallback((event: any) => {
        event.stopPropagation();
        setAreEmojiOpen(false)
    }, [])

    const sendMessage = async () => {
        if(!wordEntering.length){
            return;
        }

        createMessage({ 
            imageUpload, 
            wordEntering, 
            loggedUserId: loggedUser.userId, 
            chatId: chatId as string, 
            messages 
        })

        setImageUpload(null);
        setWordEntering("");
    }

    const handleEmojiClick = useCallback((event: React.MouseEvent<Element, MouseEvent>, emojiObject: IEmojiData) => {
        setWordEntering(prevText => prevText + emojiObject.emoji);
    }, [])

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        console.log('here')
        if (event.key === "Enter") {
            sendMessage();
        }
    }

    const handleChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            setImageUpload(event.target.files[0])
        }
    }, [])

    const toggleEmojisOpen = useCallback(() => {
        setAreEmojiOpen(prevVal => !prevVal)
    }, [])

    const handleWordEntering = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        setWordEntering(event.target.value)
    }, [])

    const addHeart = useCallback(() => {
        setWordEntering(prevText => prevText + "❤️")
    }, [])

    return (
        <div className="flex justify-between items-center mb-[18px] rounded-full border h-[45px] w-3/4 sm:w-5/6 xl:w-3/4 px-4 gap-2">
            <div className="relative">
                <button
                    className="h-full flex items-center"
                    onClick={toggleEmojisOpen}
                >
                    <Smile styles="h-7 w-7"/>
                </button>
                {
                    areEmojiOpen ?
                        <DropMenu
                            closeEvent={closeEvent}
                            styles="w-[250px] bottom-12 h-64 z-20"
                            noAnimation={true}
                        >
                            <Picker
                                pickerStyle={{ width: "100%", height: "100%" }}
                                onEmojiClick={handleEmojiClick}
                            />
                        </DropMenu> :
                        null
                }
            </div>
            <input
                type="text"
                placeholder="Message..."
                className="w-full h-8 placeholder:text-sm"
                value={wordEntering}
                onChange={handleWordEntering}
                onKeyDown={handleKeyDown}
            />
            {
                ((wordEntering.length && wordEntering.split("").some(letter => letter !== " ")) || imageUpload) ?
                    <button
                        className="font-semibold text-blue-500"
                        onClick={sendMessage}
                    >
                        <p>Send</p>
                    </button> :
                    <>
                        <button onClick={addHeart}>
                            <Heart
                                styles="h-7 w-7"
                                includeHovering={false}
                            />
                        </button>
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
                                onChange={handleChange}
                            />
                        </div>
                    </>
            }
        </div>
    )
})

export default MessageForm