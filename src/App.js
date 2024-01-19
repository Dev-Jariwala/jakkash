import React, { useEffect, useState } from "react";
import SideMenu from "./components/sidemenu/SideMenu";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import sidemenuProps from "./assets/props/sidemenuProps";
import ProductPage from "./pages/ProductPage";
import CollectionPage from "./pages/CollectionPage";
import Modal from "./components/modal/Modal";
import { toast } from "react-toastify";
import LoginModal from "./components/LoginModal";
import { ProductsProvider } from "./store/productContext";
import { StockProvider } from "./store/stockContext";
import { CollectionProvider } from "./store/collectionContext";
import StockPage from "./pages/StockPage";
import DashboardPage from "./pages/DashboardPage";
import BillPage from "./pages/BillPage";
import { RetailBillProvider } from "./store/retailBillContext";
const NotFound = () => {
  return (
    <div>
      <h1>404 Not Found</h1>
      <p>Oops! The page you are looking for does not exist.</p>
    </div>
  );
};

const App = () => {
  // Check if auth status is stored in localStorage
  const storedAuth = localStorage.getItem("auth");
  const [auth, setAuth] = useState(storedAuth ? JSON.parse(storedAuth) : false);
  // Update localStorage when auth status changes
  useEffect(() => {
    localStorage.setItem("auth", JSON.stringify(auth));
  }, [auth]);
  return (
    <>
      <BrowserRouter>
        <CollectionProvider>
          {/* {!auth && <LoginPage setAuth={setAuth} />} */}
          {!auth && (
            <Modal isOpen={!auth} onClose={() => toast.error("please login")}>
              <LoginModal setAuth={setAuth}></LoginModal>
            </Modal>
          )}

          {auth && (
            <ProductsProvider>
              <StockProvider>
                <RetailBillProvider>
                  <SideMenu
                    sidemenuProps={{ ...sidemenuProps }}
                    setAuth={setAuth}
                  >
                    <Routes>
                      <Route path="/" element={<DashboardPage />}></Route>
                      <Route path="/products" element={<ProductPage />}></Route>
                      <Route
                        path="/collection"
                        element={<CollectionPage />}
                      ></Route>
                      <Route path="/stocks" element={<StockPage />}></Route>
                      <Route path="/bills" element={<BillPage />}></Route>
                      <Route path="*" element={<NotFound />}></Route>
                    </Routes>
                  </SideMenu>
                </RetailBillProvider>
              </StockProvider>
            </ProductsProvider>
          )}
        </CollectionProvider>
      </BrowserRouter>
    </>
  );
};

export default App;
