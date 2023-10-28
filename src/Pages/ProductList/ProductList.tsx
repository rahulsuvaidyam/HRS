import type { FC } from 'react';
import LeftBar from '../../Components/LeftBar';
import { Outlet } from 'react-router-dom';

interface ProductListProps {}

const ProductList: FC<ProductListProps> = () => {
    return (
        <>
        <div className="pt-12 md:pt-14 w-full h-full flex ">
            <LeftBar/>
            <div className="w-full h-full pt-2 pl-64">
                <Outlet/>
            </div>
        </div>
        </>
    );
}

export default ProductList;
