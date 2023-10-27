import type { FC } from 'react';
import './App.css'
import Router from './Router/Router';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface AppProps {}

const App: FC<AppProps> = () => {
  return (
    <>
    <Router/>
    <ToastContainer 
    position="bottom-left"
    autoClose={2000}
    hideProgressBar={false}
    newestOnTop={false}
    closeOnClick
    rtl={false}
    pauseOnFocusLoss
    draggable
    pauseOnHover
    theme="light"
    />
    </>
  );
}

export default App;
