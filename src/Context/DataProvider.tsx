import { createContext, useState } from "react";

type DataContextValue = {
  logInPage: boolean
  setLogInPage: React.Dispatch<React.SetStateAction<boolean>>
  isRender:boolean
  setIsRender:React.Dispatch<React.SetStateAction<boolean>>
  userDetails:any 
  setUserDetails:React.Dispatch<React.SetStateAction<void>>
  
};

export const DataContext = createContext<DataContextValue>({} as DataContextValue);
type DataProviderProps = {
  children: React.ReactNode;
};

const DataProvider = ({ children }: DataProviderProps) => {
  const [logInPage, setLogInPage] = useState(false);
  const [isRender, setIsRender] = useState(false);
  const [userDetails, setUserDetails] = useState<any>({})
 

  
  const value: DataContextValue = {
    logInPage,
    setLogInPage,
    isRender,
    setIsRender,
    userDetails, 
    setUserDetails
  };
  return (
    <DataContext.Provider value={value}>
      {children}
    </DataContext.Provider>
  );
};
export default DataProvider;