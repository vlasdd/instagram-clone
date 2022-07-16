import convertUnixTime from 'helpers/other/convert-unix-time/convertUnixTime';
import React from 'react'

type TimeProps = {
    createdAt: number;
}

const Time: React.FC<TimeProps> = React.memo(({ createdAt }) => {
    const generateTime = () => {
        let time = convertUnixTime(createdAt).toUpperCase();
        if (time === "NOW") {
            return time;
        }
        return time + " AGO"
    }

    return (
        <div className="w-full px-4 pb-1">
            <p className="text-[11px] text-gray-400 mt-1 tracking-wide">
                {generateTime()}
            </p>
        </div>
    )
})

export default Time