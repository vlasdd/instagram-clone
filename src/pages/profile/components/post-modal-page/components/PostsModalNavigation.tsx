import React from 'react'
import { useNavigate } from 'react-router-dom'
import ProfileRoutes from 'constants/profile-routes'
import ArrowToLeft from 'svgs/empty/ArrowToLeft'
import ArrowToRight from 'svgs/empty/ArrowToRight'
import PostType from 'types/postType'

type PostsModalNavigationProps = {
    currentIndex: number, 
    posts: PostType[],
    routePart: () => string
}

const PostsModalNavigation: React.FC<PostsModalNavigationProps> = React.memo(({ currentIndex, posts, routePart }) => {
    const navigate = useNavigate();

    const handleNavigateForward = () => {
        navigate(`../${ProfileRoutes.POST}${posts[currentIndex - 1].postId}`, { replace: true })
    }

    const handleNavigateBack = () => {
        navigate(`../${ProfileRoutes.POST}${posts[currentIndex + 1].postId}`, { replace: true })
    }

    return (
        <>
            {
                currentIndex !== 0 ?
                    <button
                        className="w-8 h-8 rounded-full bg-white absolute flex justify-center items-center left-[calc(100%+15px)] top-[46%]"
                        onClick={handleNavigateForward}
                    >
                        <ArrowToRight />
                    </button> :
                    null
            }
            {
                currentIndex !== posts.length - 1 ?
                    <button
                        className="w-8 h-8 rounded-full bg-white absolute flex justify-center items-center right-[calc(100%+15px)] top-[46%]"
                        onClick={handleNavigateBack}
                    >
                        <ArrowToLeft />
                    </button> :
                    null
            }
        </>
    )
})

export default PostsModalNavigation