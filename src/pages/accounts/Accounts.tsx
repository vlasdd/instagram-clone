import Header from 'components/header/Header'
import AccountsRoutes from 'constants/accounts-routes'
import React from 'react'
import { Outlet } from 'react-router-dom'
import NavigationBar from './components/NavigationBar'

const Links = [{
    line: "Edit profile",
   // link: Pr AccountsRoutes.EDIT_PROFILE 
}]

const Accounts: React.FC = () => {
    return (
        <div className="back w-screen h-screen flex flex-col items-center ">
            <Header />
            <div className="flex flex-col sm:flex-row gap-16 sm:gap-0 bg-white w-full md:w-11/12 lg:w-4/5 xl:w-2/3 h-[calc(100vh-90px)] border-x border-b border-t my-12">
                <NavigationBar />
                <Outlet />
            </div>
        </div>
    )
}

export default Accounts