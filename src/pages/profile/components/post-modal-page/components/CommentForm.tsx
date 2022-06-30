import React from 'react';
import Heart from '../../../../../svgs/Heart';

type CommentFormProps = {
    wordEntering: string,
    setWordEntering: React.Dispatch<React.SetStateAction<string>>,
    sendComment: () => void,
}

const CommentForm: React.FC<CommentFormProps> = ({ wordEntering, setWordEntering, sendComment }) => {
    return (
        <div className="flex justify-between items-center rounded-br-xl border h-[50px] w-full px-4 gap-4">
            <button
                onClick={() => {
                    setWordEntering(prevText => prevText + "❤️");
                }}
            >
                <Heart 
                    styles="h-7 w-7"
                />
            </button>
            <input
                type="text"
                placeholder="Message..."
                className="w-full h-8 placeholder:text-sm"
                value={wordEntering}
                onChange={event => setWordEntering(event.target.value)}
                onKeyDown={event => {
                    if (event.key === "Enter") {
                        sendComment();
                    }
                }}
            />
            <button
                className={`font-semibold ${wordEntering.length ? "text-blue-500": "text-blue-200"}`}
                onClick={sendComment}
                disabled={!wordEntering.length}
            >
                <p>Post</p>
            </button>
        </div>
    )
}

export default CommentForm