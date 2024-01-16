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
  ptableKeys,
  ptableName,
  ptableTHs,
} from "../assets/props/tableProps/ptableProps";
import EditProduct from "../components/product/EditProduct";
import Modal from "../components/modal/Modal";

import DeleteProduct from "../components/product/DeleteProduct";

const ProductPage = () => {
  const { products, setProducts, fetching } = useContext(ProductsContext);
  const [formState, setFormState] = useState({ status: "", formData: {} });
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
    if (formState.status === "deleteProduct" && focusRef.current) {
      focusRef.current.focus();
    } else if (formState.status === "editProduct" && focusRef.current) {
      focusRef.current.focus();
    } else if (formState.status === "newProduct" && focusRef.current) {
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
        pending: "Deleting..",
        success: "Product deleted! 👌",
        error: "Error deleting product 🤯",
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
        pending: "Creating product",
        success: "Product created 👌",
        error: "Error creating product 🤯",
      });
      await updateProducts();
    } catch (error) {
      console.log(error);
      toast.error("Error adding product");
    } finally {
      setLoading(false);
    }
  }
  async function handleAddStock(e) {
    e.preventDefault();
    alert("stock added");
  }
  async function handleEdit(e, productId, formData) {
    e.preventDefault();
    setLoading(true);
    try {
      await toast.promise(productUpdate(productId, formData), {
        pending: "Editing product",
        success: "Product Edited 👌",
        error: "Error editing product 🤯",
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
  const actions = [
    {
      button: "Add",
      classNames: ["btn-outline", "primary"],
      onSmash: handleAddStock,
    },
    {
      button: "Edit",
      classNames: ["btn-outline", "success"],
      onSmash: onEdit,
    },
    {
      button: "Delete",
      classNames: ["btn-outline", "danger"],
      onSmash: handleDeleteConfirmation,
    },
  ];

  return (
    <div className="page">
      <div className="p-title">
        <h2>Products Page</h2>
      </div>
      {loading && <Loader1 />}

      {/* Confirmation Modal for Delete */}
      {formState.status === "deleteProduct" && (
        <Modal
          isOpen={formState.status === "deleteProduct"}
          onClose={cancelDelete}
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

      <TableWrapper
        rows={products}
        tableName={ptableName}
        tableBtn={ptableBtn}
        onTableBtn={onNewProd}
        ths={ptableTHs}
        actions={actions}
        mainKeys={ptableKeys}
      ></TableWrapper>
    </div>
  );
};

export default ProductPage;
