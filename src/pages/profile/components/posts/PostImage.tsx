import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import ProfileRoutes from 'constants/profile-routes';
import FilledComment from 'svgs/filled/FilledComment';
import FilledHeart from 'svgs/filled/FilledHeart';
import PostType from 'types/post-type'

const PostImage: React.FC<PostType> = ({ postImage, postId, likes, comments }) => {
    const [isHovered, setIsHovered] = useState<boolean>(false);
    const navigate = useNavigate();

    return (
        <div 
            className="relative z-10 w-full h-full aspect-square cursor-pointer rounded-sm"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={() => navigate(ProfileRoutes.POST + postId)}
        >
            <img
                src={postImage}
                className={`object-cover w-full h-full rounded-sm ${isHovered && "brightness-75"}`}
            />
            {
                isHovered ?
                    <div className="absolute top-[50%] left-[50%] translate-y-[-50%] translate-x-[-50%] flex gap-4">
                        <div className="flex gap-1 items-center">
                            <FilledHeart styles="h-6 w-6 text-white" />
                            <p className="text-lg font-medium text-white">{likes.length}</p>
                        </div>
                        <div className="flex gap-1 items-center">
                            <FilledComment styles="h-6 w-6 text-white" />
                            <p className="text-lg font-medium text-white">{comments.length}</p>
                        </div>
                    </div> :
                    null
            }
        </div>
    )
}

export default PostImage