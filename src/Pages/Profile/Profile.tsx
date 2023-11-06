import { type FC } from 'react';
import LeftBar from './LeftBar';
import { Outlet, useLocation } from 'react-router-dom';

interface ProfileProps { }




const Profile: FC<ProfileProps> = () => {
   const {pathname} = useLocation()
    return (
        <>
            <div className="pt-12 md:pt-14 w-full h-full flex flex-col md:px-8 max-w-[1600px] mx-auto">
                <div className="flex flex-col md:flex-row gap-3 h-full md:pt-4">
                <div className="w-full md:w-1/3 lg:w-1/4 md:h-full flex flex-col md:gap-3 relative">
                   <LeftBar/>
                 </div>
                    <div className={`${pathname !=='/profile'?'block':'hidden'} w-full md:w-2/3 lg:w-[75%] md:border sm:h-full px-4`}>
                        <Outlet/>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Profile;
