import React, { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import ProfileRoutes from 'constants/profile-routes'
import ArrowToLeft from 'svgs/empty/ArrowToLeft'
import ArrowToRight from 'svgs/empty/ArrowToRight'
import PostType from 'types/postType'
import useWindowWidth from 'helpers/hooks/useWindowWidth'

type PostsModalNavigationProps = {
    currentIndex: number, 
    posts: PostType[],
    routePart: () => string
}

const PostsModalNavigation: React.FC<PostsModalNavigationProps> = React.memo(({ currentIndex, posts, routePart }) => {
    const navigate = useNavigate();
    const width = useWindowWidth();

    const handleNavigateForward = useCallback(() => {
        navigate(`../${ProfileRoutes.POST}${posts[currentIndex - 1].postId}`, { replace: true })
    }, [currentIndex])

    const handleNavigateBack = useCallback(() => {
        navigate(`../${ProfileRoutes.POST}${posts[currentIndex + 1].postId}`, { replace: true })
    }, [currentIndex])

    return (
        <>
            {
                currentIndex !== 0 ?
                    <button
                        className={`
                            w-8 h-8 rounded-full bg-white absolute flex justify-center items-center top-[46%] 
                            ${width < 640 ? "left-[calc(100%+8px)]": "left-[calc(100%+15px)]"} 
                        `}
                        onClick={handleNavigateForward}
                    >
                        <ArrowToRight />
                    </button> :
                    null
            }
            {
                currentIndex !== posts.length - 1 ?
                    <button
                        className={`
                            w-8 h-8 rounded-full bg-white absolute flex justify-center items-center top-[46%] 
                            ${width < 640 ? "right-[calc(100%+8px)]": "right-[calc(100%+15px)]"} 
                        `}
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