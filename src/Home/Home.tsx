import { type FC } from 'react';
import CategoryList from '../Pages/Category/CategoryList';
import ProductGroupByEvent from '../Pages/ProductList/ProductGroupByEvent';
import UnderPrice from '../Pages/UnderPrice/Underprice';
import ShowCarousel from '../Pages/ShowCarousel/ShowCarousel';
import Footer from '../Pages/Footer/Footer';

interface HomeProps { }

const Home: FC<HomeProps> = () => {

    return (
        <>
            <div className="pt-12 md:pt-14 pb-3 bg-[#FEF6F7] max-w-[1600px] mx-auto">
                <ShowCarousel />
                <CategoryList />
                <ProductGroupByEvent />
                <UnderPrice />
                <Footer />
            </div>
        </>
    );
}

export default Home;
