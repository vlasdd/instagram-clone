import React from 'react'

const FilledSaved: React.FC<{ styles: string }> = ({ styles }) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" className={styles} viewBox="0 0 20 20" fill="currentColor">
            <path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z" />
        </svg>
    )
}

export default FilledSaved