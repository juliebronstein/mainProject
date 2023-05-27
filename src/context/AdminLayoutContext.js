import { createContext, useState } from "react";

export const AdminContext = createContext({
  showsibbar: false,
  numOfPage:20,
  setShowSibbar: () => {},
});

export const AdminContextContainer = ({ children }) => {
  const [showsibbar, setShowSibbar] = useState(false);
  const [numOfPage, setNumOfPage] = useState(20);
  return (
    <AdminContext.Provider
      value={{
        showsibbar,
        setShowSibbar,
        numOfPage,
        setNumOfPage
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};
