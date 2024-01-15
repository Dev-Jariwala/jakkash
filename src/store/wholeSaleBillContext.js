import { createContext, useState, useEffect } from "react";
import axios from "axios";
import BACKEND_URL from "../assets/BACKEND_URL";

export const WholeSaleContext = createContext({});

export const WholeSaleProvider = ({ children }) => {
  const [wholeSaleBills, setWholeSaleBills] = useState([]);

  useEffect(() => {
    // Fetch data using Axios
    axios
      .get(`${BACKEND_URL}wholesale/fetch-allWholeSaleBills`)
      .then((response) => {
        // Set the fetched data to state
        setWholeSaleBills(response.data.wholeSaleBills.reverse());
      })
      .catch((error) => {
        // Handle error if needed
        console.error("Error fetching data: ", error);
      });
  }, []); // Run this effect only once on component mount

  return (
    <WholeSaleContext.Provider value={{ wholeSaleBills, setWholeSaleBills }}>
      {children}
    </WholeSaleContext.Provider>
  );
};
