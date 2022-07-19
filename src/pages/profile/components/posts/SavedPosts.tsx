import React from 'react'
import SavedPostType from 'types/savePostType'
import PostsContainer from './PostsContainer';
import useSavedPostsData from 'pages/profile/hooks/useSavedPostsData';

const SavedPosts: React.FC<{ savedPosts: SavedPostType[] }> = React.memo(({ savedPosts }) => {
    const { savedPostsData, setSavedPostsData } = useSavedPostsData(savedPosts)

    return (
        savedPostsData.length ?
            <PostsContainer posts={savedPostsData} changePosts={setSavedPostsData}/> :
            <div className="w-[300px] sm:w-[350px] h-full flex items-center justify-center mt-8 text-center">
                <div className="flex flex-col items-center">
                    <img
                        src={process.env.PUBLIC_URL + "/images/saved.jpg"}
                        className="w-20"
                    />
                    <p className="text-3xl font-extralight">Save</p>
                    <p className="text-sm mt-3">
                        Save photos and videos that you want to see again. No one is notified, and only you can see what you've saved.
                    </p>
                </div>
            </div>
    )
})

export default SavedPosts