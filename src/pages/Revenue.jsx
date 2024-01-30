import React, { useState, useEffect } from "react";
import PageTitle from "../components/pageTemp/PageTitle";
import All from "../components/revenue/All";
import { useNavigate } from "react-router-dom";
import { toast, useToast } from "react-toastify";
import NotFound from "./NotFound";

const Revenue = () => {
  const [isPasswordValid, setIsPasswordValid] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const handleRevenueClick = async () => {
      const enteredPassword = prompt("Enter password for Revenue:");
      // Check if the entered password is correct (you should replace 'yourPassword' with the actual correct password)
      if (enteredPassword === "jakkash@123") {
        setIsPasswordValid(true);
        toast.success("Access Granted!");
      } else if (enteredPassword === "jakkash@321") {
        setIsPasswordValid("Jakash");
        // toast.success("Access Granted!");
      } else {
        navigate("/");
        // Show a toast or any other notification indicating invalid password
        toast.error("Invalid password. Access denied!");
      }
    };
    handleRevenueClick();
  }, []);
  const [activeTab, setActiveTab] = useState("tab4");
  const tabClassName = (tab) =>
    `inline-block w-full text-xl font-semibold p-4 border-b-2 rounded-t-lg button-transition ${
      activeTab === tab
        ? "border-blue-500 dark:text-gray-200"
        : "border-blue-200 text-gray-700 dark:border-gray-700 dark:text-gray-500"
    }`;

  // ...

  const scrollToTab = (tab) => {
    const tabElement = document.getElementById(tab);
    if (tabElement) {
      tabElement.scrollIntoView({ behavior: "smooth" });
    }
  };
  if (isPasswordValid === "Jakash") {
    return <NotFound />;
  }
  if (!isPasswordValid) {
    return <div>Not Allowed</div>;
  }

  return (
    <>
      {isPasswordValid && (
        <PageTitle pageName={"Revenue"}>
          {/* Tabs  */}
          <div className="mx-auto sticky top-0 z-50  max-w-screen-xl">
            <div className="mb-4 border-b border-blue-200 dark:border-gray-700">
              <ul className="flex flex-wrap -mb-px text-sm font-medium text-center">
                <li className="w-1/4">
                  <button
                    className={tabClassName("tab4")}
                    type="button"
                    onClick={() => setActiveTab("tab4")}
                  >
                    All Data
                  </button>
                </li>
                <li className="w-1/4">
                  <button
                    className={tabClassName("tab1")}
                    type="button"
                    onClick={() => setActiveTab("tab1")}
                  >
                    Bills
                  </button>
                </li>
                <li className="w-1/4">
                  <button
                    className={tabClassName("tab2")}
                    type="button"
                    onClick={() => setActiveTab("tab2")}
                  >
                    Purchases
                  </button>
                </li>
                <li className="w-1/4">
                  <button
                    className={tabClassName("tab3")}
                    type="button"
                    onClick={() => setActiveTab("tab3")}
                  >
                    Revenue
                  </button>
                </li>
              </ul>
            </div>
          </div>
          <div className="mx-auto max-w-screen-xl px-4">
            <All activeTab={activeTab} />
          </div>
        </PageTitle>
      )}
    </>
  );
};

export default Revenue;
