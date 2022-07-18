import React from 'react'

const Loading: React.FC = React.memo(() => {
  return (
        <div className="w-[100vw] h-[100vh] py-8 flex flex-col items-center justify-between">
            <div className="h-12"></div>
            <div>
                <img 
                    src={process.env.PUBLIC_URL + "/images/loading-logo.jpg"}
                    className="h-28"
                />
            </div>
            <div>
                <img
                    src={process.env.PUBLIC_URL + "/images/from-meta.jpg"}
                    className="h-16"
                />
            </div>
        </div>
    )
})

export default Loading