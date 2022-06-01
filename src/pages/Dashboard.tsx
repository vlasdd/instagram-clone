import React from 'react';
import { Navigate } from 'react-router-dom';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import Timeline from '../components/Timeline';
import RoutesTypes from '../constants/routes-types';
import { useAppSelector } from '../redux/hooks';

const Dashboard: React.FC = () => {
    const user = useAppSelector(state => state.currentUser.user)
    
    if(!user.userId.length){
        return <Navigate to={RoutesTypes.LOGIN} /> 
    }
    
    return (
        <div className="back">
            <Header />
            <div>
                <Sidebar />
                <Timeline />
            </div>
        </div>
    )
};

export default Dashboard;
