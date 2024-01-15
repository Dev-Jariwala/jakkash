import { createContext, useState, useEffect } from "react";
import axios from "axios";
import BACKEND_URL from "../assets/BACKEND_URL";

export const RetailBillContext = createContext({});

export const RetailBillProvider = ({ children }) => {
  const [retailBills, setRetailBIlls] = useState([]);

  useEffect(() => {
    // Fetch data using Axios
    axios
      .get(`${BACKEND_URL}retail/fetch-allRetailbills`)
      .then((response) => {
        // Set the fetched data to state
        setRetailBIlls(response.data.retailBills.reverse());
      })
      .catch((error) => {
        // Handle error if needed
        console.error("Error fetching data: ", error);
      });
  }, []); // Run this effect only once on component mount

  return (
    <RetailBillContext.Provider value={{ retailBills, setRetailBIlls }}>
      {children}
    </RetailBillContext.Provider>
  );
};
