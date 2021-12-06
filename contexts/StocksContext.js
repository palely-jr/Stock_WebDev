import React, { useState, useContext, useEffect } from "react";
import {
  AsyncStorageStatic,
  ToastAndroid,
  Platform,
  AlertIOS,
} from "react-native";
const StocksContext = React.createContext();
import AsyncStorage from "@react-native-async-storage/async-storage";

export const StocksProvider = ({ children }) => {
  const [state, setState] = useState([]);
  return (
    <StocksContext.Provider value={[state, setState]}>
      {children}
    </StocksContext.Provider>
  );
};
export const useStocksContext = () => {

  return {
    ServerURL:
      "https://financialmodelingprep.com/api/v3/nasdaq_constituent?apikey=f84908d9032402250918ef3eafbe6562",
    //watchList: state,
  };
};