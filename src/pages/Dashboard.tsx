import React, { FC } from 'react';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import Timeline from '../components/Timeline';
import { useAppSelector } from "../redux/hooks";
import IUserStateInterface from "../interfaces/userStateInterface";

const Dashboard: FC = () => {
    const user = useAppSelector((user: IUserStateInterface) => user.currentUser)
    console.log(user);
    return (
        <div className="bg-[#FAFAFA]">
            <Header />
            <div>
                <Sidebar />
                <Timeline />
            </div>
        </div>
    )
};

export default Dashboard;
