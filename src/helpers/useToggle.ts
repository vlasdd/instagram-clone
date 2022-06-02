import React, { useState } from 'react'

const useToggle = (initialState: boolean): readonly [boolean, () => void] => {
    const [value, setValue] = useState<boolean>(initialState);

    return [
        value,
        () => setValue(prevVal => !prevVal)
    ] as const
}

export default useToggle