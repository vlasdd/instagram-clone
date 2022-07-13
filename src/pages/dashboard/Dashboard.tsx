import React from 'react';
import Header from 'components/header/Header';
import Sidebar from 'pages/dashboard/components/sidebar/Sidebar';
import Timeline from 'pages/dashboard/components/timeline/Timeline';
import useWindowWidth from 'helpers/hooks/useWindowWidth';

const Dashboard: React.FC = () => {
    const windowWidth = useWindowWidth();

    return (
        <div className="back">
            <Header />
            <div className={`min-h-[calc(100vh-60px)] w-screen flex justify-center back pt-6`}>
                <Timeline />
                {
                    windowWidth > 1000 ?
                        <Sidebar /> :
                        null
                }
            </div>
        </div>
    )
};

export default Dashboard;
