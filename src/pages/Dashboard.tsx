import React from 'react';
import Header from '../components/header/Header';
import Sidebar from '../components/Sidebar';
import Timeline from '../components/Timeline';

const Dashboard: React.FC = () => {
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
