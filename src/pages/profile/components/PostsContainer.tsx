import React from 'react'
import { Outlet } from 'react-router-dom'
import PostType from '../../../types/post-type'
import PostImage from './PostImage'

const PostsContainer: React.FC<{ posts: PostType[] }> = ({ posts }) => {
    return (
        <>
            {posts.length === 0 ?
                <div className="w-full h-full flex items-center justify-center">
                    <div className="flex flex-col gap-8 items-center">
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
            <Outlet />
        </>
    )
}

export default PostsContainer