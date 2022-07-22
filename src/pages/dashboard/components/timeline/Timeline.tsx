import useWindowWidth from 'helpers/hooks/useWindowWidth'
import usePostsToRender from 'pages/dashboard/hooks/usePostsToRender';
import React, { useMemo } from 'react'
import { Outlet } from 'react-router-dom';
import Post from './components/Post';

const POSTS_AMOUNT = 20;

const Timeline: React.FC = React.memo(() => {
    const width = useWindowWidth();

    const { postsToRender, setPostsToRender } = usePostsToRender(POSTS_AMOUNT)
    
    const postsComponents = useMemo(() => postsToRender?.map(post => (
        <Post
            currentPost={post}
            changePosts={setPostsToRender}
            key={post.postId + post.fromId}
        />
    )), [postsToRender])

    return (
        <div className={`flex ${postsToRender !== null && postsToRender.length === 0 ? "hidden" : ""}`}>
            {
                !postsToRender ?
                    <div className={`h-32 ${width > 500 ? "w-[470px]" : "w-full"} flex items-center justify-center`}>
                        <div
                            style={{ "borderTopColor": "transparent" }}
                            className="w-16 h-16 border-4 border-gray-700 border-dashed rounded-full animate-spin"
                        ></div>
                    </div> :
                    <>
                        <div>
                            <div className={`flex flex-col items-center gap-4 ${width > 500 ? "w-[470px]" : "w-full"}`}>
                                {postsComponents}
                                <div className="w-full flex flex-col items-center mt-8 mb-14">
                                    <img
                                        src={process.env.PUBLIC_URL + "/images/done.jpg"}
                                        className="w-16"
                                    />
                                    <p className="text-lg">You're all caught up</p>
                                    <p className="text-sm text-gray-400">You've seen all new posts from the past days</p>
                                </div>
                            </div>
                        </div>
                        <Outlet context={{ posts: [...postsToRender].reverse(), changePosts: setPostsToRender }}/>
                    </>
            }
        </div>
    )
})

export default Timeline