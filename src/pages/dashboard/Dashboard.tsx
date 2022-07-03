import React from 'react';
import Header from 'components/header/Header';
import Sidebar from 'pages/dashboard/components/Sidebar';
import Timeline from 'pages/dashboard/components/Timeline';

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
