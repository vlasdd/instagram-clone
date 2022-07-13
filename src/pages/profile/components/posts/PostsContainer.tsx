import React from 'react'
import { Outlet } from 'react-router-dom'
import PostType from 'types/post-type'
import PostImage from './PostImage'

const PostsContainer: React.FC<{ posts: PostType[], changePosts?: any }> = React.memo(({ posts, changePosts }) => {
    return (
        <>
            {posts.length === 0 ?
                <div className="w-full h-full flex items-center justify-center mt-8">
                    <div className="flex flex-col gap-4 items-center">
                        <img
                            src="../images/camera.jpg"
                            className="w-8"
                        />
                        <p className="text-3xl font-extralight">No Posts Yet</p>
                    </div>
                </div> :
                <div className="w-full grid grid-cols-3 auto-rows-fr gap-1 sm:gap-6 sm:w-3/4 lg:w-2/3 mt-2">
                    {posts.map(post => (
                        <PostImage {...post} key={post.postId} />
                    ))}
                </div>}
            <Outlet context={{ posts, changePosts }}/>
        </>
    )
})

export default PostsContainer