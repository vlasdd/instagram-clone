import React, { useRef } from 'react'
import Search from '../../../svgs/Search';

type SearchBarProps = {
    wordEntering: string, 
    setWordEntering: React.Dispatch<React.SetStateAction<string>> 
}

const SearchBar: React.FC<SearchBarProps> = ({ wordEntering, setWordEntering }) => {
    const inputRef = useRef<any>();

    return (
        <button
            className="bg-gray-200 rounded-lg flex px-4 items-center h-full w-full"
            onClick={() => console.log("div clicked")}
        >
            {
                document.activeElement !== inputRef.current ?
                    <Search /> :
                    undefined
            }
            <input
                className="w-full h-full bg-gray-200 rounded-lg placeholder:font-light placeholder:text-gray-400 relative"
                type="text"
                placeholder="Search"
                ref={inputRef}
                value={wordEntering}
                onChange={(event) => setWordEntering(event.target.value)}
                onClick={() => console.log("input cliked")}
            />
        </button>
    )
}

export default SearchBar