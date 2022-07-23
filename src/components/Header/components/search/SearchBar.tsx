import React, { useCallback, useRef } from 'react'
import Search from 'svgs/empty/Search';

type SearchBarProps = {
    wordEntering: string, 
    setWordEntering: React.Dispatch<React.SetStateAction<string>> 
}

const SearchBar: React.FC<SearchBarProps> = React.memo(({ wordEntering, setWordEntering }) => {
    const inputRef = useRef<any>();

    const handleChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        setWordEntering(event.target.value)
    }, [])

    return (
        <button
            className="bg-gray-200 rounded-lg flex px-4 items-center h-full w-full"
        >
            {
                document.activeElement !== inputRef.current ?
                    <Search /> :
                    null
            }
            <input
                className="w-full h-full bg-gray-200 rounded-lg placeholder:font-light placeholder:text-gray-400 relative"
                type="text"
                placeholder="Search"
                ref={inputRef}
                value={wordEntering}
                onChange={handleChange}
            />
        </button>
    )
})

export default SearchBar