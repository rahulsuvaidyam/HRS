import { FC } from 'react';
import { Route, Routes } from 'react-router-dom'; 
import Home from '../Home/Home';

interface RouterProps {}

const Router: FC<RouterProps> = () => {
  return (
    <>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
    </>
  );
};

export default Router;
