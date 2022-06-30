import { useEffect, useState } from 'react'

const useWindowWidth = () => {
    const [innerWidth, setInnerWidth] = useState(window.innerWidth)

    useEffect(() => {
        function handleResize() {
            setInnerWidth(window.innerWidth)
        }

        window.addEventListener('resize', handleResize)
    }, [])

    return innerWidth;
}

export default useWindowWidth