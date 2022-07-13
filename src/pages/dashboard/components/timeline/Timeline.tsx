import useWindowWidth from 'helpers/hooks/useWindowWidth'
import React, { useMemo } from 'react'
import { useAppSelector } from 'redux-setup/hooks';

const Timeline: React.FC = () => {
    const loggedUser = useAppSelector(state => state.signedUser.user);
    const posts = useMemo(() => {
        
    }, [])
    const width = useWindowWidth();
    return (
        <div className={`${width > 525 ? "w-[525px]": "w-full"}`}>Timeline</div>
    )
}

export default Timeline