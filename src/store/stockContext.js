import { createContext, useState, useEffect } from "react";
import axios from "axios";
import BACKEND_URL from "../assets/BACKEND_URL";

export const StockContext = createContext({});

export const StockProvider = ({ children }) => {
  const [stocks, setStocks] = useState([]);

  useEffect(() => {
    // Fetch data using Axios
    axios
      .get(`${BACKEND_URL}stock/fetch-allStocks`)
      .then((response) => {
        // Set the fetched data to state
        setStocks(response.data.stocks.reverse());
      })
      .catch((error) => {
        // Handle error if needed
        console.error("Error fetching data: ", error);
      });
  }, []); // Run this effect only once on component mount

  return (
    <StockContext.Provider value={{ stocks, setStocks }}>
      {children}
    </StockContext.Provider>
  );
};
