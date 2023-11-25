import type { FC } from 'react';
import { Link } from 'react-router-dom';

interface CartAlertProps {}

const CartAlert: FC<CartAlertProps> = () => {
    return (
        <>
        <div className="pt-12 md:pt-16 pb-2 w-full h-full px-0 md:px-10 flex justify-center">
           <div className="w-full md:w-4/5 border-0 md:border bg-gray-50 shadow-md h-full flex flex-col gap-3 items-center justify-center">
            <p className='font-medium'>Your cart is empty!</p>
            <p className='text-xs'>Add items to it now.</p>
            <Link to='/' className='px-14 py-2 bg-primary text-white'>Shop now</Link>
           </div>
        </div>
        </>
    );
}

export default CartAlert;
