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
import Event from '../Dashboard/Event/Event';
import BuyProducts from '../Pages/BuyProducts/BuyProducts';
import Carousels from '../Dashboard/Carousels/Carousels';

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
          <Route path="/buy" element={<Protected Component={BuyProducts} />} />
          <Route path="/productlist/:category/:event" element={<ProductList />} />
          <Route path="/productdetails/:product" element={<ProductDetails />} />
          <Route path="/becomeseller" element={<SellerRegister />} />
          <Route path="/dashboard" element={<UserProtected Component={Dashboard} />} >
            <Route path="category" element={<UserProtected Component={Categories} />} />
            <Route path="product" element={<UserProtected Component={Product} />} />
            <Route path="event" element={<UserProtected Component={Event} />} />
            <Route path="carousel" element={<UserProtected Component={Carousels} />} />
          </Route>
        </Routes>
        <Auth />
      </div>
    </>
  );
};

export default Router;
