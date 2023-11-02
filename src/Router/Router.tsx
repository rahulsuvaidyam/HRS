import { FC } from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from '../Home/Home';
import Profile from '../Pages/Profile/Profile';
import Navbar from '../Pages/Navbar';
import Protected from './Protected';
import Cart from '../Pages/Cart/Cart';
import Auth from '../Auth/Auth';
import ProductList from '../Pages/ProductList/ProductList';
import Categories from '../Dashboard/Categories/Categories';
import Dashboard from '../Dashboard/DashBoard';
import Product from '../Dashboard/Products/Products';
import ProductDetails from '../Pages/ProductList/ProductDetails';
import UserProtected from './UserProtected';
import SellerRegister from '../Auth/SellerRegister/SellerRegister';

interface RouterProps { }

const Router: FC<RouterProps> = () => {

  return (
    <>
      <div className="w-full h-screen">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Protected Component={Profile} />} />
          <Route path="/cart" element={<Protected Component={Cart} />} />
          <Route path="/productlist/:category" element={<ProductList />} />
          <Route path="/productdetails/:product" element={<ProductDetails />} />
          <Route path="/becomeseller" element={<SellerRegister />} />
          <Route path="/dashboard" element={<UserProtected Component={Dashboard} />} >
            <Route path="category" element={<UserProtected Component={Categories} />} />
            <Route path="product" element={<UserProtected Component={Product} />} />
          </Route>
        </Routes>
        <Auth />
      </div>
    </>
  );
};

export default Router;
