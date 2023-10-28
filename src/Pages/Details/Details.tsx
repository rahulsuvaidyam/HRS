import type { FC } from 'react';
import {BiStore} from 'react-icons/bi'
import {AiOutlineHeart} from 'react-icons/ai'

interface DetailsProps {}

const Details: FC<DetailsProps> = () => {
    return (
        <>
         <div className="w-full">
            <div className="flex bg-slate-50 sm:bg-white shadow-sm w-full flex-row sm:flex-col items-center sm:items-start p-3 gap-2">
                <div className="h-8 w-1/2 sm:w-full border rounded-md px-2 flex  gap-2 items-center text-sm cursor-pointer">
                   <BiStore className='text-lg'/> Orders</div>
                <div className="h-8 w-1/2 sm:w-full border rounded-md px-2 flex gap-2 items-center text-sm cursor-pointer">
                <AiOutlineHeart className='text-lg'/>Wishlist</div>
            </div>
         </div>
        </>
    );
}

export default Details;
