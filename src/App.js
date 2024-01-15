import React from "react";
import SideMenu from "./components/sidemenu/SideMenu";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import sidemenuProps from "./assets/props/sidemenuProps";
import ProductPage from "./pages/ProductPage";
const NotFound = () => {
  return (
    <div>
      <h1>404 Not Found</h1>
      <p>Oops! The page you are looking for does not exist.</p>
    </div>
  );
};

const App = () => {
  return (
    <>
      <BrowserRouter>
        <SideMenu sidemenuProps={{ ...sidemenuProps }}>
          <Routes>
            <Route path="/" element={<div>Dashboard</div>}></Route>
            <Route path="/products" element={<ProductPage />}></Route>
            <Route path="*" element={<NotFound />}></Route>
          </Routes>
        </SideMenu>
      </BrowserRouter>
    </>
  );
};

export default App;
