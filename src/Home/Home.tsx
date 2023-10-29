import { type FC } from 'react';
import CategoryList from '../Pages/Category/CategoryList';

interface HomeProps { }

const Home: FC<HomeProps> = () => {

    return (
        <>
           <div className="pt-12 md:pt-14">
            <CategoryList/>
           </div>
        </>
    );
}

export default Home;
