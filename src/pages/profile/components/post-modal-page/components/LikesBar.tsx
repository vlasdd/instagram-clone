import React from 'react'
import Heart from '../../../../../svgs/Heart'

type LikesBarProps = {
    userId: string,
    likes: string[],
    loggedUserId: string
}

const LikesBar: React.FC<LikesBarProps> = ({ userId, likes, loggedUserId }) => {
    return (
        <div className="h-[100px] flex flex-col px-4">
            <div>
                {
                    likes.some(id => id === loggedUserId) ?
                        <button
                        >
                            <Heart
                                styles="h-7 w-7 text-red-600"
                            />
                        </button> :
                        <button>
                            <Heart
                                styles="h-7 w-7"
                            />
                        </button>
                }
            </div>
        </div>
    )
}

export default LikesBar