import type { FC } from 'react';
import './App.css'
import Router from './Router/Router';

interface AppProps {}

const App: FC<AppProps> = () => {
  return (
    <>
    <Router/>
    </>
  );
}

export default App;
