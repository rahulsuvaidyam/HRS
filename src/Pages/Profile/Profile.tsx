import { type FC } from 'react';
// import Details from '../Details/Details';

interface ProfileProps { }

const Profile: FC<ProfileProps> = () => {

    return (
        <>
            <div className="pt-12 md:pt-14 w-full h-full flex flex-col px-2 md:px-8">
                <div className="flex gap-3 h-full pt-4">
                    <div className="w-1/4 h-full bg-green-400 flex flex-col gap-3">
                        <div className="w-full h-16 bg-gray-300"></div>
                        <div className="w-full">dd</div>
                    </div>
                    <div className="w-[75%] bg-red-300 h-full"></div>
                </div>
                {/* <div className="order-2">
                    <Details />
                </div>
                <div className="order-1">
                    profile
                </div> */}
            </div>
        </>
    );
}

export default Profile;
