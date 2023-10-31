import { type FC } from 'react';
import CategoryList from '../Pages/Category/CategoryList';
import Carousel from '../Pages/Carousel/Carousel';

interface HomeProps { }

const Home: FC<HomeProps> = () => {

    return (
        <>
           <div className="pt-12 md:pt-14">
            <Carousel/>
            <CategoryList/>
           </div>
        </>
    );
}

export default Home;
