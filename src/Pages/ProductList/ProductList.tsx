import type { FC } from 'react';
import { useParams } from 'react-router-dom';

interface ProductListProps {}

const ProductList: FC<ProductListProps> = () => {
    const {category} = useParams()
    return (
        <>
        <div className="pt-14">
        {category}
        </div>
        </>
    );
}

export default ProductList;
