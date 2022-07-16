import React from 'react';
import Header from 'components/header/Header';
import Sidebar from 'pages/dashboard/components/sidebar/Sidebar';
import Timeline from 'pages/dashboard/components/timeline/Timeline';
import useWindowWidth from 'helpers/hooks/useWindowWidth';
import { useAppSelector } from 'redux-setup/hooks';
import Loading from 'pages/loading/Loading';

const Dashboard: React.FC = React.memo(() => {
    const loggedUser = useAppSelector(state => state.signedUser.user);
    const windowWidth = useWindowWidth();

    return (
        !loggedUser.userId.length ?
            <Loading /> :
            <div className="bg-[#f7f7f7] overflow-hidden overflow-y-auto flex flex-col items-center">
                <Header />
                <div className={`min-h-[calc(100vh-60px)] w-[100%] flex justify-center bg-[#f7f7f7] pt-6 gap-6`}>
                    <Timeline />
                    {
                        windowWidth > 950 ?
                            <Sidebar /> :
                            null
                    }
                </div>
            </div>
    )
})

export default Dashboard;
