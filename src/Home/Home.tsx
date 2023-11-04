import { type FC } from 'react';
import CategoryList from '../Pages/Category/CategoryList';
import Carousels from '../Pages/Carousel/Carousel';
import ProductGroupByEvent from '../Pages/ProductList/ProductGroupByEvent';

interface HomeProps { }

const Home: FC<HomeProps> = () => {

    return (
        <>
           <div className="pt-12 md:pt-14">
            <Carousels/>
            <CategoryList/>
            <ProductGroupByEvent/>
           </div>
        </>
    );
}

export default Home;
