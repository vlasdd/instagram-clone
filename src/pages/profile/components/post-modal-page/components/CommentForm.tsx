import React from 'react';

type CommentFormProps = {
    wordEntering: string,
    setWordEntering: React.Dispatch<React.SetStateAction<string>>,
    sendComment: () => void,
    commentsRef: any
}

const CommentForm: React.FC<CommentFormProps> = ({ wordEntering, setWordEntering, sendComment, commentsRef }) => {
    return (
        <div className="flex justify-between items-center rounded-br-xl border h-[50px] w-full px-4 gap-4">
            <input
                type="text"
                placeholder="Message..."
                className="w-full h-8 placeholder:text-sm"
                ref={commentsRef}
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