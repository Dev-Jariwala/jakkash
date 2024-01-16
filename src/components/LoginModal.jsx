import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { CollectionContext } from "../store/collectionContext";
import axios from "axios";
import BACKEND_URL from "../assets/BACKEND_URL";
import {
  fetchAllCollections,
  setActiveCollection,
} from "../controllers/collection";
import Loader1 from "./loaders/Loader1";

const LoginModal = ({ setAuth }) => {
  const [loginData, setLoginData] = useState({
    email: "admin@admin.com",
    password: "Admin@123",
  });
  const { collections, setCollections, activeColl } =
    useContext(CollectionContext);

  const [freeze, setFreeze] = useState(false);

  async function onSetActiveColl(collectionId) {
    setFreeze(true);
    try {
      await setActiveCollection(collectionId);
      const res = await fetchAllCollections();
      setCollections(res);
    } catch (error) {
      console.log(error);
      throw error;
    } finally {
      setFreeze(false);
    }
  }

  return (
    <>
      {freeze && <Loader1 />}
      <div className="form-container">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (
              loginData.email.trim() === "admin@admin.com" &&
              loginData.password === "Admin@123"
            ) {
              setAuth(true);
              return toast.success("Loged in!");
            }
            return toast.error("Invalid Inputs");
          }}
        >
          <h4>Admin Login:</h4>
          <div>
            <label>
              Email:
              <input
                type="email"
                value={loginData.email}
                onChange={(e) =>
                  setLoginData((prev) => {
                    return { ...prev, email: e.target.value };
                  })
                }
                placeholder="me@example.com"
                autoFocus={true}
                required
              />
            </label>
            <label>
              Password:
              <input
                type="password"
                value={loginData.password}
                placeholder="••••••••••"
                onChange={(e) =>
                  setLoginData((prev) => {
                    return { ...prev, password: e.target.value };
                  })
                }
                required
              />
            </label>
            <label>
              Collections:
              <select
                value={activeColl?._id}
                onChange={(e) => onSetActiveColl(e.target.value)}
                disabled={freeze}
              >
                {collections.map((coll) => (
                  <option key={coll._id} value={coll._id}>
                    {coll.collectionName}
                  </option>
                ))}
              </select>
            </label>
          </div>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <button
              className={`${freeze && "disable"}`}
              type="submit"
              disabled={freeze}
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default LoginModal;
