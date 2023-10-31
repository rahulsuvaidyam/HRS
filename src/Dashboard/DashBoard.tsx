import type { FC } from 'react';
import LeftBar from '../Components/LeftBar';
import { Outlet, useLocation } from 'react-router-dom';

interface DashboardProps {}

const Dashboard: FC<DashboardProps> = () => {
    const {pathname} = useLocation();
    return (
        <>
        <div className="pt-12 md:pt-14 w-full h-full flex ">
            <LeftBar/>
            <div className="w-full h-full pt-2 md:pl-64">
                {pathname === '/dashboard' ? 
                <>
                Dashboard Page
                </> 
                :<Outlet/>}
            </div>
        </div>
        </>
    );
}

export default Dashboard;
