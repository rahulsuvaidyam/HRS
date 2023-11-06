import type { FC } from 'react';

interface CartLoaderProps {}

const CartLoader: FC<CartLoaderProps> = () => {
    return (
        <>
         <div className="w-full md:px-8 gap-2 grid grid-cols-1 lg:grid-cols-2 animate-pulse pt-14 md:pt-16">
            <div className="h-36 bg-gray-100"></div>
            <div className="h-36 bg-gray-100"></div>
            <div className="h-36 bg-gray-100"></div>
            <div className="h-36 bg-gray-100"></div>
         </div>
            <div className="h-14 px-2 md:px-16 fixed bottom-0 w-full bg-gray-100 flex items-center justify-between">
                <div className="h-6 md:h-8 bg-gray-200 w-32"></div>
                <div className="h-10 md:h-12 bg-gray-200 w-44"></div>
            </div>
        </>
    );
}

export default CartLoader;
