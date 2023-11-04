import { createContext, useState } from "react";

type DataContextValue = {
  logInPage: boolean
  setLogInPage: React.Dispatch<React.SetStateAction<boolean>>
  isRender:boolean
  setIsRender:React.Dispatch<React.SetStateAction<boolean>>
  openPopUP:boolean
  setOpenPopUP:React.Dispatch<React.SetStateAction<boolean>>
  categoryEdit:any
  setCategoryEdit:React.Dispatch<React.SetStateAction<any>>
  productEdit:any
  setproductEdit:React.Dispatch<React.SetStateAction<any>>
  openSideBar:any
  setopenSideBar:React.Dispatch<React.SetStateAction<any>>
  
};

export const DataContext = createContext<DataContextValue>({} as DataContextValue);
type DataProviderProps = {
  children: React.ReactNode;
};

const DataProvider = ({ children }: DataProviderProps) => {
  const [logInPage, setLogInPage] = useState(false);
  const [isRender, setIsRender] = useState(false);
  const [openPopUP, setOpenPopUP] = useState(false)
  const [openSideBar, setopenSideBar] = useState(true)
  const [categoryEdit, setCategoryEdit] = useState({})
  const [productEdit, setproductEdit] = useState({})
 
 

  
  const value: DataContextValue = {
    logInPage,
    setLogInPage,
    isRender,
    setIsRender, 
    openPopUP, 
    setOpenPopUP,
    categoryEdit, 
    setCategoryEdit,
    setproductEdit,
    productEdit,
    openSideBar,
     setopenSideBar
  };
  return (
    <DataContext.Provider value={value}>
      {children}
    </DataContext.Provider>
  );
};
export default DataProvider;