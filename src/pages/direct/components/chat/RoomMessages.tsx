import React, { useMemo, useRef } from 'react'
import { AutoSizer, CellMeasurer, CellMeasurerCache, List } from 'react-virtualized';
import MessageType from 'types/message-type'
import Message from './Message';

type RoomMessagesProps = {
    messages: MessageType[],
    loggedUserId: string,
    profileImage: string,
}

const RoomMessages: React.FC<RoomMessagesProps> = ({ messages, loggedUserId, profileImage }) => {
    // const cache = useRef(
    //     new CellMeasurerCache({
    //         fixedWidth: true,
    //         defaultHeight: 80,
    //     })
    // )

    const messagesToRender = useMemo(() => messages.map(message => <Message
        {...message}
        loggedUserId={loggedUserId}
        profileImage={profileImage}
        key={message.createdAt}
    />), [messages])

    // {messagesToRender}
    return (
        <div 
            className="max-h-[calc(100%-45px-18px)] overflow-hidden overflow-y-auto w-full no-bar flex flex-col items-center"
            //style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", gap: "12px"}}
        >
            {messagesToRender}
        </div>
    )
}

export default RoomMessages
            // <AutoSizer>
            //     {({ width, height }) => (
            //         <List
            //             width={width}
            //             height={height}
            //             rowHeight={cache.current.rowHeight}
            //             deferredMeasurementCache={cache.current}
            //             rowCount={messages.length}
            //             rowRenderer={({ key, index, style, parent }) => {
            //                 return (
            //                     <CellMeasurer 
            //                         key={key} 
            //                         cache={cache.current}
            //                         parent={parent}
            //                         rowIndex={index}
            //                         columnIndex={0}
            //                     >
            //                         <div style={style}>
            //                             {messagesToRender[index]}
            //                         </div>
            //                     </CellMeasurer>
            //                 )
            //             }}
            //         />
            //     )}
            // </AutoSizer>