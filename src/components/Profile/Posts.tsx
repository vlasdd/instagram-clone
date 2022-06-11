import React from 'react'
import PostType from '../../types/post-type'

const Posts: React.FC<{ posts: PostType[] }> = ({ posts }) => {
    return (
        posts.length === 0 ?
            <div className="w-full h-full flex items-center justify-center">
                <div className="flex flex-col gap-8 items-center">
                    <img 
                        src="../images/camera.jpg"
                        className="w-8"
                    />
                    <p className="text-3xl font-extralight">No Posts Yet</p>
                </div>
            </div> :
            <div>Posts</div>

    )
}

export default Posts