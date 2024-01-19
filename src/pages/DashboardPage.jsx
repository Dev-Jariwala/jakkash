import React, { useContext } from "react";
import StatCard from "../components/statcards/StatCard";
import { CollectionContext } from "../store/collectionContext";
import { ProductsContext } from "../store/productContext";
import { StockContext } from "../store/stockContext";

const DashboardPage = () => {
  const { collections } = useContext(CollectionContext);
  const { products } = useContext(ProductsContext);
  const { stocks } = useContext(StockContext);
  return (
    <>
      <div className="page">
        <div className="p-title">
          <h2>Dashboard</h2>
        </div>
        <div className="dashboard-container">
          <div className="statcards-container">
            <StatCard
              icon={<span className="material-icons">playlist_add</span>}
              color={"blue"}
              title={"Collections"}
              data={collections.length}
              stat={10}
              link={"collection"}
            ></StatCard>
            <StatCard
              icon={<span className="material-icons">shopping_cart</span>}
              color={"red"}
              title={"Products"}
              data={products.length}
              stat={25}
              link={"products"}
            ></StatCard>
            <StatCard
              icon={<span className="material-icons">receipt_long</span>}
              color={"green"}
              title={"Bills"}
              data={50}
              stat={3000}
              link={"bills"}
            ></StatCard>
            <StatCard
              icon={<span className="material-icons">leaderboard</span>}
              color={"orange"}
              title={"Stocks"}
              data={stocks.length}
              stat={500}
              link={"stocks"}
            ></StatCard>
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardPage;
