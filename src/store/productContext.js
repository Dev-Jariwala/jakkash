import { createContext, useState, useEffect } from "react";
import axios from "axios";
import BACKEND_URL from "../assets/BACKEND_URL";

export const ProductsContext = createContext({});

export const ProductsProvider = ({ children }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Fetch data using Axios
    axios
      .get(`${BACKEND_URL}product`)
      .then((response) => {
        // Set the fetched data to state
        setProducts(response.data.products);
      })
      .catch((error) => {
        // Handle error if needed
        console.error("Error fetching data: ", error);
      });
  }, []); // Run this effect only once on component mount

  return (
    <ProductsContext.Provider value={{ products, setProducts }}>
      {children}
    </ProductsContext.Provider>
  );
};
