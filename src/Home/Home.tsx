import { useContext, type FC } from 'react';
import { DataContext } from '../Context/DataProvider';
import Auth from '../Auth/Auth';

interface HomeProps {}

const Home: FC<HomeProps> = () => {
    const {setLogInPage,logInPage} = useContext(DataContext)
    return (
        <>
        <div className="w-full h-screen">
        <button onClick={()=>setLogInPage(!logInPage)}>Login</button>
        <Auth/>
        </div>
        </>
    );
}

export default Home;
