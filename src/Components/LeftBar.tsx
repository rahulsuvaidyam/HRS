import { type FC, useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {MdDashboardCustomize,MdCategory} from 'react-icons/md'
import {TbBrandProducthunt} from 'react-icons/tb'
import { DataContext } from '../Context/DataProvider';
import {BsArrowBarLeft} from 'react-icons/bs'
import {CgEventbrite} from 'react-icons/cg'

interface LeftBarProps { }

const LeftBar: FC<LeftBarProps> = () => {
    const {openSideBar,setopenSideBar} = useContext(DataContext)
    const {pathname} = useLocation()
    return (
        <>
              <aside className={`${openSideBar?'w-16 md:w-48 -translate-x-full md:translate-x-0':'w-16  sm:translate-x-0'} duration-500 fixed pt-12 md:pt-14 top-0 left-0 z-40  h-screen transition-all`} aria-label="Sidebar">
                <BsArrowBarLeft className='absolute -right-3 md:-right-2 top-20 text-xl cursor-pointer text-gray-600 hover:to-gray-900'
                 onClick={()=>setopenSideBar(!openSideBar)}/>
                    <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
                        <ul className="space-y-2 font-medium">
                            <li>
                                <Link to='/dashboard' className={`${pathname === '/dashboard'?'bg-gray-100':''} flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-200 group`}>
                                   <MdDashboardCustomize  className="w-5 h-5 text-gray-500 transition duration-75 "/>
                                    <span className={`${openSideBar?'block':'hidden'} ml-3 truncate transition-all duration-500`}>Dashboard</span>
                                </Link>
                            </li> 
                            <li>
                                <Link to='event' className={`${pathname === '/dashboard/event'?'bg-gray-100':''} flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-200 group`}>
                                   <CgEventbrite className="w-5 h-5 text-gray-500 transition duration-75 "/>
                                    <span className={`${openSideBar?'block':'hidden'} ml-3 truncate transition-all duration-500`}>Event</span>
                                </Link>
                            </li> 
                            <li>
                                <Link to='category' className={`${pathname === '/dashboard/category'?'bg-gray-100':''} flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-200 group`}>
                                   <MdCategory className="w-5 h-5 text-gray-500 transition duration-75 "/>
                                    <span className={`${openSideBar?'block':'hidden'} ml-3 truncate transition-all duration-500`}>Category</span>
                                </Link>
                            </li> 
                            <li>
                                <Link to='product' className={`${pathname === '/dashboard/product'?'bg-gray-100':''} flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-200 group`}>
                                   <TbBrandProducthunt className="w-5 h-5 text-gray-500 transition duration-75 "/>
                                    <span className={`${openSideBar?'block':'hidden'} ml-3 truncate transition-all duration-500`}>Products</span>
                                </Link>
                            </li> 
                        </ul>
                    </div>
                </aside> 
        </>
    );
}

export default LeftBar;
