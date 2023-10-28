import { FC, useContext, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from '../Home/Home';
import Profile from '../Pages/Profile/Profile';
import Navbar from '../Pages/Navbar';
import Protected from './Protected';
import Cart from '../Pages/Cart/Cart';
import Auth from '../Auth/Auth';
import ProductList from '../Pages/ProductList/ProductList';
import { DataContext } from '../Context/DataProvider';
import Category from '../Pages/Category/Category';

interface RouterProps { }

const Router: FC<RouterProps> = () => {
  const {isRender} = useContext(DataContext)
  let userDetails: any = JSON.parse(sessionStorage.getItem('userDetails') ?? '{}')
  useEffect(() => {
    userDetails = JSON.parse(sessionStorage.getItem('userDetails') ?? '{}')
}, [isRender])
  return (
    <>
      <div className="w-full h-screen">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Protected Component={Profile}/>} />
          <Route path="/cart" element={<Cart/>} />
          <Route path="/product" element={userDetails?.role === 'ADMIN'?<ProductList/>:''} >
           <Route path="category" element={<Category/>} />
          </Route>
        </Routes>
        <Auth/>
      </div>
    </>
  );
};

export default Router;
