import React from "react";
import { Link, Navigate } from "react-router-dom";
import Header from "../components/Header/Header";
import RoutesTypes from "../constants/routes-types";
import { useAppSelector } from "../redux/hooks";

const NotFound: React.FC = () => {
    /*const user = useAppSelector(state => state.currentUser.user);
    if(!user.userId.length){
        return <Navigate to={RoutesTypes.LOGIN}/>
    }*/

    return (
        <div className="h-screen w-screen back flex flex-col items-center">
            <Header />
            <div className="w-3/4 flex flex-col">
                <h1 className="text-center text-2xl font-medium mt-8">Sorry, this page isn't available.</h1>
                <div className="flex justify-center mt-8">
                    <p className="text-gray-700 text-base mr-2">The link you followed may be broken, or the page may have been removed.                 <Link to={RoutesTypes.DASHBOARD} className="text-blue-900 text-base">Go back to Instagram.</Link></p>
                </div>
            </div>
        </div>
    )
}

export default NotFound;