import React, { useEffect, useState } from "react";
import SideMenu from "./components/sidemenu/SideMenu";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import sidemenuProps from "./assets/props/sidemenuProps";
import ProductPage from "./pages/ProductPage";
import CollectionPage from "./pages/CollectionPage";

import LoginModal from "./components/LoginModal";
import { ProductsProvider } from "./store/productContext";
import { StockProvider } from "./store/stockContext";
import { CollectionProvider } from "./store/collectionContext";
import StockPage from "./pages/StockPage";
import DashboardPage from "./pages/DashboardPage";
import BillPage from "./pages/BillPage";
import { RetailBillProvider } from "./store/retailBillContext";
import { ClientProvider } from "./store/clientContext";
import ClientPage from "./pages/ClientPage";
import { WholeSaleProvider } from "./store/wholeSaleBillContext";
import NotFound from "./pages/NotFound";
import PurchasePage from "./pages/PurchasePage";
import { PurchasesProvider } from "./store/purchaseContext";

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
          {!auth && <LoginModal setAuth={setAuth}></LoginModal>}

          {auth && (
            <ProductsProvider>
              <PurchasesProvider>
                <StockProvider>
                  <RetailBillProvider>
                    <WholeSaleProvider>
                      <ClientProvider>
                        <SideMenu
                          sidemenuProps={{ ...sidemenuProps }}
                          setAuth={setAuth}
                        >
                          <Routes>
                            <Route path="/" element={<DashboardPage />}></Route>
                            <Route
                              path="/products"
                              element={<ProductPage />}
                            ></Route>
                            <Route
                              path="/purchase"
                              element={<PurchasePage />}
                            ></Route>
                            <Route
                              path="/collection"
                              element={<CollectionPage />}
                            ></Route>
                            <Route
                              path="/stocks"
                              element={<StockPage />}
                            ></Route>
                            <Route path="/bills" element={<BillPage />}></Route>

                            <Route
                              path="/clients"
                              element={<ClientPage />}
                            ></Route>
                            <Route path="*" element={<NotFound />}></Route>
                          </Routes>
                        </SideMenu>
                      </ClientProvider>
                    </WholeSaleProvider>
                  </RetailBillProvider>
                </StockProvider>
              </PurchasesProvider>
            </ProductsProvider>
          )}
        </CollectionProvider>
      </BrowserRouter>
    </>
  );
};

export default App;
