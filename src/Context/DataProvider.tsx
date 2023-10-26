import { createContext, useState } from "react";

type DataContextValue = {
  logInPage: boolean
  setLogInPage: React.Dispatch<React.SetStateAction<boolean>>
  
};

export const DataContext = createContext<DataContextValue>({} as DataContextValue);
type DataProviderProps = {
  children: React.ReactNode;
};

const DataProvider = ({ children }: DataProviderProps) => {
  const [logInPage, setLogInPage] = useState(false);
 

  
  const value: DataContextValue = {
    logInPage,
    setLogInPage,
  };
  return (
    <DataContext.Provider value={value}>
      {children}
    </DataContext.Provider>
  );
};
export default DataProvider;