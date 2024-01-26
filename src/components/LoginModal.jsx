import React, { useContext, useState } from "react";
import { toast } from "react-toastify";
import { CollectionContext } from "../store/collectionContext";
import Loader1 from "../components/loaders/Loader1";
import {
  fetchAllCollections,
  setActiveCollection,
} from "../controllers/collection";
const LodingModal = ({ setAuth }) => {
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
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-20 scale-150 rounded-full w-auto"
            src="img/logo.png"
            alt="Your Company"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign in to Jakkash
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form
            className="space-y-6"
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
            <div>
              <label className="block text-sm font-medium leading-6 text-gray-900">
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
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
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label className="block text-sm font-medium leading-6 text-gray-900">
                  Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={loginData.password}
                  placeholder="••••••••••"
                  onChange={(e) =>
                    setLoginData((prev) => {
                      return { ...prev, password: e.target.value };
                    })
                  }
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium leading-6 text-gray-900">
                Collections
              </label>
              <div className="mt-2">
                <select
                  value={activeColl?._id}
                  onChange={(e) => onSetActiveColl(e.target.value)}
                  disabled={freeze}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                >
                  {collections.map((coll) => (
                    <option key={coll._id} value={coll._id}>
                      {coll.collectionName}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={freeze}
                className={`flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 ${
                  freeze && "opacity-50 cursor-not-allowed"
                }`}
              >
                Sign in
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default LodingModal;
