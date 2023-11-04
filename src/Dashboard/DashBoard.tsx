import { useContext, type FC } from 'react';
import LeftBar from '../Components/LeftBar';
import { Outlet, useLocation } from 'react-router-dom';
import { DataContext } from '../Context/DataProvider';

interface DashboardProps {}

const Dashboard: FC<DashboardProps> = () => {
    const {openSideBar} = useContext(DataContext)
    const {pathname} = useLocation();
    return (
        <>
        <div className="pt-12 md:pt-14 w-full h-full flex ">
            <LeftBar/>
            <div className={`${openSideBar?'md:pl-48':'md:pl-16'} transition-all duration-500 w-full h-full pt-2 `}>
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
