import { db } from 'firebase-setup/firebaseConfig';
import { collection, getDocs, query, where } from 'firebase/firestore';
import useWindowWidth from 'helpers/hooks/useWindowWidth'
import React, { useEffect, useState } from 'react'
import { useAppSelector } from 'redux-setup/hooks';
import PostType from 'types/post-type';
import UserState from 'types/user-state-type';
import Post from './components/Post';

const POSTS_AMOUNT = 20;

const Timeline: React.FC = () => {
    const loggedUser = useAppSelector(state => state.signedUser.user);
    const width = useWindowWidth();

    const [postsToRender, setPostsToRender] = useState<PostType[]>([]);

    useEffect(() => {
        const getPosts = async () => {
            const usersRef = collection(db, "users");
            const q = query(usersRef, where("userId", "in", loggedUser.following.map(userObj => userObj.userId)));
            const querySnapshot = await getDocs(q);

            const users = querySnapshot.docs.map(doc => doc.data()) as UserState[]
            const allPosts = users.reduce((accum: PostType[], user: UserState) => {
                user.posts.forEach(post => accum.push(post));
                return accum
            }, [])

            const currentPosts = allPosts.sort((a, b) => b.createdAt - a.createdAt).slice(0, POSTS_AMOUNT);
            console.log(currentPosts)
            setPostsToRender(currentPosts)
        }

        getPosts();
    }, [])

    const postsComponenets = postsToRender.map(post => (
        <Post
            currentPost={post}
            changePosts={setPostsToRender}
            key={post.postId + post.fromId}
        />
    ))

    return (
        <div className={`flex flex-col items-center gap-4 ${width > 500 ? "w-[470px]": "w-full"}`}>
            {postsComponenets}
            <div className="w-full flex flex-col items-center mt-8 mb-14">
                <img
                   src="../images/done.jpg"
                   className="w-16"
                />
                <p className="text-lg">You're all caught up</p>
                <p className="text-sm text-gray-400">You've seen all new posts from the past days</p>
            </div>
        </div>
    )
}

export default Timeline