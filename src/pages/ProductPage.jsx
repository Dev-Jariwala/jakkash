import React, { useContext, useEffect, useRef, useState } from "react";
import { ProductsContext } from "../store/productContext";
import Loader1 from "../components/loaders/Loader1";
import {
  fetchAllProducts,
  fetchProductDetails,
  productCreate,
  productDelete,
  productUpdate,
} from "../controllers/products";
import NewProduct from "../components/product/NewProduct";
import { toast } from "react-toastify";
import TableWrapper from "../components/table/TableWrapper";
import {
  ptableBtn,
  ptableHeaders,
  ptableKeys,
  ptableName,
  ptableTHs,
} from "../assets/props/tableProps/ptableProps";
import EditProduct from "../components/product/EditProduct";
import Modal from "../components/modal/Modal";

import DeleteProduct from "../components/product/DeleteProduct";
import Newstock from "../components/stock/NewStock";
import { fetchAllStocks, stockCreate } from "../controllers/stock";
import { StockContext } from "../store/stockContext";
import PageTitle from "../components/pageTemp/PageTitle";
import Table2Wrapper from "../components/table2/Table2Wrapper";

const ProductPage = () => {
  const { products, setProducts, fetching } = useContext(ProductsContext);
  const [formState, setFormState] = useState({ status: "", formData: {} });
  const { setStocks } = useContext(StockContext);
  const [loading, setLoading] = useState(true);
  const focusRef = useRef(null);

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

  const updateProducts = async () => {
    try {
      setProducts(await fetchAllProducts());
      setFormState({ status: "", formData: {} });
    } catch (error) {
      console.error("Error updating products:", error);
      toast.error("Error updating products");
    }
  };

  const onNewProd = () =>
    setFormState({
      status: "newProduct",
      formData: { productName: "", retailPrice: 0, wholesalePrice: 0 },
    });
  // Function to handle delete confirmation
  const handleDeleteConfirmation = async (e, productId) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetchProductDetails(productId);
      setFormState({ status: "deleteProduct", formData: res });
    } catch (error) {
      console.error("Error fetching product details:", error);
      throw error;
    } finally {
      setLoading(false); // Add this line to handle errors gracefully
    }
  };

  // Function to handle actual product deletion
  const confirmDelete = async () => {
    setLoading(true);
    try {
      await toast.promise(productDelete(formState.formData._id), {
        pending: "Deleting Product...",
        success: "Product deleted successfully! 👌",
        error: "Error deleting Product. Please try again. 🤯",
      });
      await updateProducts();
    } catch (err) {
      console.error("Error confirming delete:", err);
      toast.error("Error deleting product");
    } finally {
      setLoading(false);
    }
  };

  // Function to cancel/delete without confirmation
  const cancelDelete = () => {
    setFormState({ status: "", formData: {} });
  };
  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      await toast.promise(productCreate(formState.formData), {
        pending: "Creating Product...",
        success: "Product created successfully! 👌",
        error: "Error creating Product. Please try again. 🤯",
      });
      await updateProducts();
    } catch (error) {
      console.log(error);
      toast.error("Error adding product");
    } finally {
      setLoading(false);
    }
  }

  async function handleEdit(e, productId, formData) {
    e.preventDefault();
    setLoading(true);
    try {
      await toast.promise(productUpdate(productId, formData), {
        pending: "Editing Product...",
        success: "Product editied successfully! 👌",
        error: "Error editing Product. Please try again. 🤯",
      });
      await updateProducts();
    } catch (error) {
      console.log(error);
      toast.error("Error editing product");
    } finally {
      setLoading(false);
    }
  }
  async function onEdit(e, productId) {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetchProductDetails(productId);
      setFormState({ status: "editProduct", formData: res });
    } catch (error) {
      console.error("Error fetching product details:", error);
      // Handle error if needed
    } finally {
      setLoading(false);
    }
  }

  async function onAdd(e, productId) {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetchProductDetails(productId);
      setFormState({
        status: "addStock",
        formData: { productId: res._id, productName: res.productName },
      });
    } catch (error) {
      console.error("Error fetching product details:", error);
      // Handle error if needed
    } finally {
      setLoading(false);
    }
  }
  async function handleAddStock(e, formData) {
    e.preventDefault();
    setLoading(true);
    try {
      if (formData.addStock < 0) {
        alert("negative values not allowed!");
      } else {
        await toast.promise(stockCreate(formData.productId, formData), {
          pending: "Adding Stock...",
          success: "Stock added successfully! 👌",
          error: "Error adding Stock. Please try again. 🤯",
        });

        await updateProducts();
        setStocks(await fetchAllStocks());
      }
    } catch (error) {
      console.log(error);
      throw error;
    } finally {
      setLoading(false);
    }
  }
  const actions = [
    {
      button: (
        <span className="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 mr-2 text-xs font-medium text-blue-600 ring-1 ring-inset ring-blue-700/10">
          <span className="material-icons text-sm">add</span>
        </span>
      ),

      classNames: [],
      onSmash: onAdd,
    },
    {
      button: (
        <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 mr-2 text-xs font-medium text-green-600 ring-1 ring-inset ring-green-600/20">
          <span className="material-icons text-sm">edit</span>
        </span>
      ),
      classNames: [],
      onSmash: onEdit,
    },
    {
      button: (
        <span className="inline-flex items-center rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-600 ring-1 ring-inset ring-red-600/10">
          <span className="material-icons text-sm">delete</span>
        </span>
      ),
      classNames: [
        // "text-red-500",
        // " cursor-pointer",
        // " hover:text-red-700",
        // " transition",
      ],
      onSmash: handleDeleteConfirmation,
    },
  ];
  const filters = [
    {
      title: "High To Low",
      value: "HighToLow",
      onChecked: (rows) => {
        return rows.sort((a, b) => b.retailPrice - a.retailPrice);
      },
    },
    { title: "Low To High", value: "LowToHigh" },
  ];
  return (
    <>
      {loading && <Loader1 />}

      {/* Confirmation Modal for Delete */}
      {formState.status === "deleteProduct" && (
        <Modal
          isOpen={formState.status === "deleteProduct"}
          onClose={cancelDelete}
          title={"Delete Product :"}
        >
          <DeleteProduct
            ref={focusRef}
            productName={formState.formData.productName}
            cancelDelete={cancelDelete}
            confirmDelete={confirmDelete}
          />
        </Modal>
      )}

      {/* New Product Modal */}
      {formState.status === "newProduct" && (
        <NewProduct
          ref={focusRef}
          formState={formState}
          setFormState={setFormState}
          onSubmit={handleSubmit}
        />
      )}
      {/* Edit Product Modal */}
      {formState.status === "editProduct" && (
        <EditProduct
          ref={focusRef}
          formState={formState}
          setFormState={setFormState}
          onSubmit={handleEdit}
        />
      )}
      {/* Add Stock Modal */}
      {formState.status === "addStock" && (
        <Newstock
          ref={focusRef}
          formState={formState}
          setFormState={setFormState}
          onSubmit={handleAddStock}
        />
      )}
      <PageTitle pageName={"Products"}>
        <Table2Wrapper
          rows={products}
          tableName={ptableName}
          tableBtn={ptableBtn}
          onTableBtn={onNewProd}
          ths={ptableTHs}
          actions={actions}
          mainKeys={ptableKeys}
          filters={filters}
          exportData={products}
          headers={ptableHeaders}
        ></Table2Wrapper>
      </PageTitle>
    </>
  );
};

export default ProductPage;
