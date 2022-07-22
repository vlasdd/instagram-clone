import Header from 'components/header/Header';
import PostImage from 'components/post/PostImage';
import RoutesTypes from 'constants/routes-types';
import { auth } from 'firebase-setup/firebaseConfig';
import Loading from 'pages/loading/Loading';
import React, { useMemo } from 'react'
import { Navigate, Outlet } from 'react-router-dom';
import { useAppSelector } from 'redux-setup/hooks';
import useSuggestions from './hooks/useSuggestions'

const Explore: React.FC = () => {
    const loggedUser = useAppSelector(state => state.signedUser.user);

    const { postsSuggestions, setPostsSuggestions }  = useSuggestions();
    const postsImageElements = useMemo(() => [...postsSuggestions].reverse().map(post => (
        <PostImage {...post} key={post.postId}/>
    )), [postsSuggestions])

    return (
        !auth.currentUser ?
            <Navigate to={RoutesTypes.LOGIN} /> :
            !loggedUser.userId.length ?
                <Loading /> :
                <>
                    <div className="back flex flex-col items-center min-h-[100vh]">
                        <Header />
                        <div className="w-full grid grid-cols-3 auto-rows-fr gap-1 sm:gap-6 sm:w-3/4 lg:w-2/3 mt-2 max-w-[1000px]">
                            {postsImageElements}
                        </div>
                    </div>
                    <Outlet context={{ posts: postsSuggestions, changePosts: setPostsSuggestions }}/>
                </>
    )
}

export default Explore