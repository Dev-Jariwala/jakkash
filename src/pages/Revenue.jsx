import React, { useState, useEffect } from "react";
import PageTitle from "../components/pageTemp/PageTitle";
import All from "../components/revenue/All";

const Revenue = () => {
  const [activeTab, setActiveTab] = useState("tab1");
  const tabClassName = (tab) =>
    `inline-block w-full text-xl font-semibold p-4 border-b-2 rounded-t-lg button-transition ${
      activeTab === tab
        ? "border-blue-500 dark:text-gray-200"
        : "border-blue-200 text-gray-700 dark:border-gray-700 dark:text-gray-500"
    }`;

  // ...

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    scrollToTab(tab);
  };

  const scrollToTab = (tab) => {
    const tabElement = document.getElementById(tab);
    if (tabElement) {
      tabElement.scrollIntoView({ behavior: "smooth" });
    }
  };
  useEffect(() => {
    const tabs = ["tab1", "tab2", "tab3", "tab4"];

    const handleIntersection = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveTab(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersection, {
      threshold: 0.5, // Adjust the threshold based on your needs
    });

    tabs.forEach((tab) => {
      const tabElement = document.getElementById(tab);
      if (tabElement) {
        observer.observe(tabElement);
      }
    });

    // Clean up the observer on component unmount
    return () => {
      tabs.forEach((tab) => {
        const tabElement = document.getElementById(tab);
        if (tabElement) {
          observer.unobserve(tabElement);
        }
      });
    };
  }, []); // Empty dependency array to run the effect only once on mount

  return (
    <PageTitle pageName={"Revenue"}>
      {/* Tabs  */}
      <div className="mx-auto sticky top-0 z-50 bg-primary-light max-w-screen-xl">
        <div className="mb-4 border-b border-blue-200 dark:border-gray-700">
          <ul className="flex flex-wrap -mb-px text-sm font-medium text-center">
            <li className="w-1/4">
              <button
                className={tabClassName("tab1")}
                type="button"
                onClick={() => handleTabClick("tab1")}
              >
                Bills
              </button>
            </li>
            <li className="w-1/4">
              <button
                className={tabClassName("tab2")}
                type="button"
                onClick={() => handleTabClick("tab2")}
              >
                Purchases
              </button>
            </li>
            <li className="w-1/4">
              <button
                className={tabClassName("tab3")}
                type="button"
                onClick={() => handleTabClick("tab3")}
              >
                Revenue
              </button>
            </li>
            <li className="w-1/4">
              <button
                className={tabClassName("tab4")}
                type="button"
                onClick={() => handleTabClick("tab4")}
              >
                All Data
              </button>
            </li>
          </ul>
        </div>
      </div>
      <div className="mx-auto max-w-screen-xl px-4">
        <All />
      </div>
    </PageTitle>
  );
};

export default Revenue;
