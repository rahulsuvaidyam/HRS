import { FC } from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from '../Home/Home';
import Profile from '../Pages/Profile/Profile';
import Navbar from '../Pages/Navbar';
import Protected from './Protected';
import Cart from '../Pages/Cart/Cart';
import Auth from '../Auth/Auth';

interface RouterProps { }

const Router: FC<RouterProps> = () => {
  return (
    <>
      <div className="w-full h-screen">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Protected Component={Profile}/>} />
          <Route path="/cart" element={<Cart/>} />
        </Routes>
        <Auth/>
      </div>
    </>
  );
};

export default Router;
