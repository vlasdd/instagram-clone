import React from 'react'
import { useNavigate } from 'react-router-dom'
import ProfileRoutes from '../../../../../constants/profile-routes'
import RoutesTypes from '../../../../../constants/routes-types'
import ArrowToLeft from '../../../../../svgs/ArrowToLeft'
import ArrowToRight from '../../../../../svgs/ArrowToRight'
import PostType from '../../../../../types/post-type'

type PostsModalNavigationProps = {
    currentIndex: number, 
    userId: string, 
    posts: PostType[],
}

const PostsModalNavigation: React.FC<PostsModalNavigationProps> = ({ currentIndex, userId, posts }) => {
    const navigate = useNavigate();
    return (
        <>
            {
                currentIndex !== posts.length - 1 ?
                    <button
                        className="w-8 h-8 rounded-full bg-white absolute flex justify-center items-center left-[calc(100%+15px)] top-[46%]"
                        onClick={() => navigate(
                            RoutesTypes.DASHBOARD +
                            userId +
                            "/" +
                            ProfileRoutes.POST +
                            posts[currentIndex + 1].postId)
                        }
                    >
                        <ArrowToRight />
                    </button> :
                    null
            }
            {
                currentIndex !== 0 ?
                    <button
                        className="w-8 h-8 rounded-full bg-white absolute flex justify-center items-center right-[calc(100%+15px)] top-[46%]"
                        onClick={() => navigate(
                            RoutesTypes.DASHBOARD +
                            userId +
                            "/" +
                            ProfileRoutes.POST +
                            posts[currentIndex - 1].postId)
                        }
                    >
                        <ArrowToLeft />
                    </button> :
                    null
            }
        </>
    )
}

export default PostsModalNavigation