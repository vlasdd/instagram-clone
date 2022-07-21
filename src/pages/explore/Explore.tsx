import Header from 'components/header/Header'
import React from 'react'
import useSuggestions from './hooks/useSuggestions'

const Explore: React.FC = () => {
    const postsSuggestions = useSuggestions();

    console.log(postsSuggestions)

    return (
        <div className="back flex flex-col items-center">
            <Header />
            <div className="w-full grid grid-cols-3 auto-rows-fr gap-1 sm:gap-6 sm:w-3/4 lg:w-2/3 mt-2">
                {/* {postsImageElements} */}
            </div>
        </div>
    )
}

export default Explore