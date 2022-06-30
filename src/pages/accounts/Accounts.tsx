import React from 'react'
import { Outlet } from 'react-router-dom'

const Accounts: React.FC = () => {
    return (
        <div className="flex">
            <div>Accounts</div>
            <Outlet/>
        </div>
    )
}

export default Accounts