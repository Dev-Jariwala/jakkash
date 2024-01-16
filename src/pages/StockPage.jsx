import React, { useContext, useEffect, useRef, useState } from "react";
import TableWrapper from "../components/table/TableWrapper";
import { StockContext } from "../store/stockContext";
import {
  stableKeys,
  stableName,
  stableTHs,
} from "../assets/props/tableProps/stableProps";
import Loader1 from "../components/loaders/Loader1";
import EditStock from "../components/stock/EditStock";
import {
  fetchAllStocks,
  fetchStockDetails,
  stockDelete,
  stockUpdate,
} from "../controllers/stock";
import { fetchAllProducts } from "../controllers/products";
import { ProductsContext } from "../store/productContext";
import DeleteStock from "../components/stock/DeleteStock";
import Modal from "../components/modal/Modal";
import { toast } from "react-toastify";

const StockPage = () => {
  const { stocks, setStocks, fetching } = useContext(StockContext);
  const { setProducts } = useContext(ProductsContext);
  const [formState, setFormState] = useState({ status: "", formData: {} });
  const [loading, setLoading] = useState(true);
  const focusRef = useRef(null);
  const dateFixedStocks = stocks?.map((stock) => {
    return {
      ...stock,
      date: stock.date.slice(0, 10).split("-").reverse().join(" / "),
    };
  });
  useEffect(() => {
    if (fetching) {
      setLoading(true);
    } else {
      setLoading(false);
    }
  }, [fetching]);
  useEffect(() => {
    // Set focus on the "Delete" button when the delete modal opens
    if (focusRef.current) {
      focusRef.current.focus();
    }
  }, [formState.status]);
  const cleanupFunc = async () => {
    try {
      setProducts(await fetchAllProducts());
      setStocks(await fetchAllStocks());
      setFormState({ status: "", formData: {} });
    } catch (error) {
      console.error("Error updating products:", error);
      throw error;
    }
  };

  async function onEdit(e, stockId) {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetchStockDetails(stockId);
      setFormState({ status: "editStock", formData: res });
    } catch (error) {
      console.error("Error fetching stock details:", error);
      // Handle error if needed
    } finally {
      setLoading(false);
    }
  }
  async function handleEdit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      await toast.promise(
        stockUpdate(formState.formData._id, {
          addStock: formState.formData.addStock,
          date: formState.formData.date,
        }),
        {
          pending: "Editing Stock...",
          success: "Stock edited successfully! 👌",
          error: "Error editing Stock. Please try again. 🤯",
        }
      );
      await cleanupFunc();
    } catch (error) {
      console.log(error);
      throw error;
    } finally {
      setLoading(false);
    }
  }
  async function onDelete(e, stockId) {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetchStockDetails(stockId);
      setFormState({ status: "deleteStock", formData: res });
    } catch (error) {
      console.error("Error fetching stock details:", error);
      // Handle error if needed
    } finally {
      setLoading(false);
    }
  }

  // Function to handle actual product deletion
  const confirmDelete = async () => {
    setLoading(true);
    try {
      await toast.promise(stockDelete(formState.formData._id), {
        pending: "Deleting Stock...",
        success: "Stock deleted successfully! 👌",
        error: "Error deleting Stock. Please try again. 🤯",
      });
      await cleanupFunc();
    } catch (err) {
      console.error("Error confirming delete:", err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Function to cancel/delete without confirmation
  const cancelDelete = () => {
    setFormState({ status: "", formData: {} });
  };
  const actions = [
    {
      button: "Edit",
      classNames: ["btn-outline", "success"],
      onSmash: onEdit,
    },
    {
      button: "Delete",
      classNames: ["btn-outline", "danger"],
      onSmash: onDelete,
    },
  ];
  return (
    <>
      {loading && <Loader1 />}
      {/* Edit Stock Modal */}
      {formState.status === "editStock" && (
        <EditStock
          ref={focusRef}
          formState={formState}
          setFormState={setFormState}
          onSubmit={handleEdit}
        />
      )}
      {/* Delete Modal */}
      {formState.status === "deleteStock" && (
        <Modal
          isOpen={formState.status === "deleteStock"}
          onClose={cancelDelete}
        >
          <DeleteStock
            ref={focusRef}
            formData={formState.formData}
            cancelDelete={cancelDelete}
            confirmDelete={confirmDelete}
          />
        </Modal>
      )}
      <div className="page">
        <div className="p-title">
          <h2>Stock Page</h2>
        </div>
        <TableWrapper
          rows={dateFixedStocks}
          tableName={stableName}
          ths={stableTHs}
          actions={actions}
          mainKeys={stableKeys}
        ></TableWrapper>
      </div>
    </>
  );
};

export default StockPage;
