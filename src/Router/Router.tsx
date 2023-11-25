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
import Personal from '../Pages/Profile/Personal';
import Orders from '../Pages/Profile/Orders';
import Address from '../Pages/Profile/Address/Address'; 

interface RouterProps { }

const Router: FC<RouterProps> = () => {

  return (
    <>
      <div className="w-full h-screen overflow-y-auto scrollbar-none">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Protected Component={Profile} />} >
            <Route path="order" element={<Protected Component={Orders} />} />
            <Route path="personal" element={<Protected Component={Personal} />} />
            <Route path="address" element={<Protected Component={Address} />} />
          </Route>
          <Route path="/cart" element={<Protected Component={Cart} />} />
          <Route path="/buy" element={<Protected Component={BuyProducts} />} />
          <Route path="/productlist/category/:category" element={<ProductList />} />
          <Route path="/productlist/event/:event" element={<ProductList />} />
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
