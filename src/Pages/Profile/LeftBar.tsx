import type { FC } from 'react';
import avatarM from '../../Assets/UserImage/avatarm.png'
import avatarF from '../../Assets/UserImage/avatarf.jpeg'
import { Link, useLocation } from 'react-router-dom';
import { BiUser } from 'react-icons/bi';
import { GoLocation } from 'react-icons/go';
import { MdOutlineDashboard, MdStore } from 'react-icons/md';
import { FaOpencart } from 'react-icons/fa';

interface LeftBarProps { }

const LeftBar: FC<LeftBarProps> = () => {
    const { pathname } = useLocation()
    let userDetails = JSON.parse(sessionStorage.getItem('userDetails') ?? '{}')
    return (
        <>
            <div className=''>
                <div className="w-full md:h-full flex flex-col">
                    <div className="w-full z-20 h-24 md:h-16 bg-gray-50 md:bg-white md:border flex flex-col md:flex-row items-center justify-center md:justify-start md:gap-3 md:px-4">
                        <div className="w-12 min-w-[48px] h-12 rounded-full border">
                            <img className='rounded-full' src={userDetails.gender === 'FEMALE' ? avatarF : avatarM} alt="" />
                        </div>
                        <div className="text-sm">
                            <span className='text-xs font-medium hidden md:block'>Hello</span>
                            <p className='text-xl md:text-base font-medium text-gray-600 truncate'>{userDetails.name}</p>
                        </div>
                    </div>
                    <div className=" hidden md:block pt-2 w-full h-full">
                        <div className="w-full bg-gray-50 h-full  flex flex-col gap-2">
                            <Link className='py-3 hover:text-blue-500 px-4 border-b font-medium flex items-center gap-2' to={'order'}>
                            <MdStore className='text-blue-500 text-xl' />Orders
                            </Link>
                            <div className='w-full py-2  border-b'>
                                <p className='font-medium px-4 w-full'>Personal Setting</p>
                                <div className="pl-5 py-1 w-full flex flex-col gap-2">
                                    <Link to={'personal'} className='text-sm w-full hover:text-blue-500 flex items-center gap-2'>
                                        <BiUser className='text-blue-500 text-lg' />Personal Information
                                    </Link>
                                    <Link to={'address'} className='flex gap-2 py-1 hover:text-blue-500 items-center text-sm'>
                                        <GoLocation className='text-blue-500 text-lg' />Saved Address
                                    </Link>
                                </div>

                            </div>
                        </div>
                    </div>

                </div>
            </div>
            {/* phone view */}
            {pathname === '/profile' && <div className="block md:hidden">
                <div className="flex gap-3 flex-col">
                    <div className="grid grid-cols-2 bg-gray-50 shadow-md py-3 px-2 gap-2 ">
                        <Link to={'order'} className="h-8 border rounded-md px-2 text-sm flex items-center gap-2">
                            <MdStore className='text-blue-500 text-lg' />Orders
                        </Link>
                        <Link to={'/cart'} className="h-8 border rounded-md px-2 text-sm flex items-center gap-2">
                            <FaOpencart className='text-blue-500 text-lg' />Cart
                        </Link>
                    </div>
                    <div className="w-full bg-gray-50 shadow-md px-2 py-3 flex flex-col gap-2">
                        <p>Personal settings</p>
                        <Link to={'personal'} className='flex gap-2 py-1 hover:text-blue-500 items-center text-sm'>
                            <BiUser className='text-blue-500 text-lg' />Edit Profile
                        </Link>
                        <Link to={'address'} className='flex gap-2 py-1 hover:text-blue-500 items-center text-sm'>
                            <GoLocation className='text-blue-500 text-lg' />Saved Address
                        </Link>
                    </div>
                    <div className="w-full bg-gray-50 shadow-md px-2 py-3 flex flex-col gap-2">
                        <p>Patner with hrs</p>
                        {userDetails?.role === 'SELLER' || userDetails?.role === 'ADMIN' ?
                            <Link to='/dashboard' className=' text-sm flex gap-2 items-center hover:to-blue-500'>
                                <MdOutlineDashboard className='text-blue-500 text-lg' />Dashboard</Link> :
                            <Link to={'/becomeseller'} className='flex gap-2 py-1 hover:text-blue-500 items-center text-sm'>
                                <BiUser className='text-blue-500 text-lg' />Sell On HRS
                            </Link>}
                    </div>
                </div>
            </div>}
        </>
    );
}

export default LeftBar;
