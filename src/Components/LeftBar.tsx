import { type FC, useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { MdDashboardCustomize, MdCategory, MdKeyboardDoubleArrowRight } from 'react-icons/md'
import { TbBrandProducthunt } from 'react-icons/tb'
import { DataContext } from '../Context/DataProvider';
import { BiCarousel } from 'react-icons/bi'
import { CgEventbrite } from 'react-icons/cg'

interface LeftBarProps { }

const LeftBar: FC<LeftBarProps> = () => {
    const { openSideBar, setopenSideBar } = useContext(DataContext)
    const { pathname } = useLocation()
    return (
        <>
            <aside className={`${openSideBar ? 'w-16 md:w-48 -translate-x-full md:translate-x-0' : 'w-16  sm:translate-x-0'} duration-500 fixed pt-12 md:pt-14 top-0 left-0 z-30  h-screen transition-all`} aria-label="Sidebar">
                <div className="h-full flex flex-col justify-between overflow-y-auto bg-gray-50 dark:bg-gray-800">
                    <div className="space-y-2 font-medium px-3 py-3 ">
                        <div>
                            <Link to='/dashboard' className={`${pathname === '/dashboard' ? 'bg-gray-100' : ''} flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-200 group`}>
                                <MdDashboardCustomize className="w-5 h-5 text-gray-500 transition duration-75 " />
                                <span className={`${openSideBar ? 'block' : 'hidden'} ml-3 truncate transition-all duration-500`}>Dashboard</span>
                            </Link>
                        </div>
                        <div>
                            <Link to='event' className={`${pathname === '/dashboard/event' ? 'bg-gray-100' : ''} flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-200 group`}>
                                <CgEventbrite className="w-5 h-5 text-gray-500 transition duration-75 " />
                                <span className={`${openSideBar ? 'block' : 'hidden'} ml-3 truncate transition-all duration-500`}>Event</span>
                            </Link>
                        </div>
                        <div>
                            <Link to='category' className={`${pathname === '/dashboard/category' ? 'bg-gray-100' : ''} flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-200 group`}>
                                <MdCategory className="w-5 h-5 text-gray-500 transition duration-75 " />
                                <span className={`${openSideBar ? 'block' : 'hidden'} ml-3 truncate transition-all duration-500`}>Category</span>
                            </Link>
                        </div>
                        <div>
                            <Link to='product' className={`${pathname === '/dashboard/product' ? 'bg-gray-100' : ''} flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-200 group`}>
                                <TbBrandProducthunt className="w-5 h-5 text-gray-500 transition duration-75 " />
                                <span className={`${openSideBar ? 'block' : 'hidden'} ml-3 truncate transition-all duration-500`}>Products</span>
                            </Link>
                        </div>
                        <div>
                            <Link to='carousel' className={`${pathname === '/dashboard/carousel' ? 'bg-gray-100' : ''} flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-200 group`}>
                                <BiCarousel className="w-5 h-5 text-gray-500 transition duration-75 " />
                                <span className={`${openSideBar ? 'block' : 'hidden'} ml-3 truncate transition-all duration-500`}>Carousel</span>
                            </Link>
                        </div>
                    </div>
                    <div className="px-4 h-8 flex gap-1 items-center w-full cursor-pointer border-t" onClick={() => setopenSideBar(!openSideBar)}>
                        <p className='text-sm truncate'>{openSideBar ? 'Sidebar Close' : ''}</p>
                        <MdKeyboardDoubleArrowRight className=' text-xl text-gray-700 bg-transparent hover:text-gray-900'
                        />
                    </div>

                </div>
            </aside>
        </>
    );
}

export default LeftBar;
