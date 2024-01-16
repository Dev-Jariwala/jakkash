import React, { useContext, useEffect, useRef, useState } from "react";
import TableWrapper from "../components/table/TableWrapper";
import { toast } from "react-toastify";
import { CollectionContext } from "../store/collectionContext";
import {
  ctableBtn,
  ctableKeys,
  ctableName,
  ctableTHs,
} from "../assets/props/tableProps/ctableProps";
import {
  collectionCreate,
  collectionDelete,
  collectionUpdate,
  fetchAllCollections,
  getCollectionDetails,
} from "../controllers/collection";
import Modal from "../components/modal/Modal";
import DeleteCollection from "../components/collection/DeleteCollection";
import NewCollection from "../components/collection/NewCollection";

import EditCollection from "../components/collection/EditCollection";

import Loader1 from "../components/loaders/Loader1";

const CollectionPage = () => {
  const { collections, setCollections, activeColl, fetching } =
    useContext(CollectionContext);
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
    if (formState.status === "deleteCollection" && focusRef.current) {
      focusRef.current.focus();
    } else if (formState.status === "editCollection" && focusRef.current) {
      focusRef.current.focus();
    } else if (formState.status === "newCollection" && focusRef.current) {
      focusRef.current.focus();
    }
  }, [formState.status]);
  function onNewCollection() {
    setFormState({
      status: "newCollection",
      formData: { collectionName: "" },
    });
  }
  const reRenderCollections = async () => {
    try {
      setCollections(await fetchAllCollections());
      setFormState({ status: "", formData: {} });
    } catch (error) {
      console.error("Error updating products:", error);
      toast.error("Error updating products");
    }
  };
  // Function to handle delete confirmation
  const handleDeleteConfirmation = async (e, collId) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (collId === activeColl._id) {
        return toast.info("Active Collection can not be deleted");
      }
      const res = await getCollectionDetails(collId);
      setFormState({ status: "deleteCollection", formData: res });
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
      await toast.promise(collectionDelete(formState.formData._id), {
        pending: "Deleting..",
        success: "Collection deleted! 👌",
        error: "Error deleting Collection 🤯",
      });
      await reRenderCollections();
    } catch (err) {
      console.error("Error confirming delete:", err);
      toast.error("Error deleting collection");
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
      await toast.promise(collectionCreate(formState.formData), {
        pending: "Creating Collection",
        success: "Collection created 👌",
        error: "Error creating Collection 🤯",
      });
      await reRenderCollections();
    } catch (error) {
      console.log(error);
      toast.error("Error adding product");
    } finally {
      setLoading(false);
    }
  }
  async function handleEdit(e, collectionId, formData) {
    e.preventDefault();
    setLoading(true);
    try {
      await toast.promise(collectionUpdate(collectionId, formData), {
        pending: "Editing Collection",
        success: "Collection Edited 👌",
        error: "Error editing Collection 🤯",
      });
      await reRenderCollections();
    } catch (error) {
      console.log(error);
      toast.error("Error editing Collection");
    } finally {
      setLoading(false);
    }
  }
  async function onEdit(e, collectionId) {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await getCollectionDetails(collectionId);
      setFormState({ status: "editCollection", formData: res });
    } catch (error) {
      console.error("Error fetching product details:", error);
      // Handle error if needed
    } finally {
      setLoading(false);
    }
  }
  const actions = [
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
    <>
      {loading && <Loader1 />}
      {/* Confirmation Modal for Delete */}
      {formState.status === "deleteCollection" && (
        <Modal
          isOpen={formState.status === "deleteCollection"}
          onClose={cancelDelete}
        >
          <DeleteCollection
            ref={focusRef}
            collectionName={formState.formData.collectionName}
            cancelDelete={cancelDelete}
            confirmDelete={confirmDelete}
          />
        </Modal>
      )}
      {formState.status === "newCollection" && (
        <NewCollection
          ref={focusRef}
          formState={formState}
          setFormState={setFormState}
          onSubmit={handleSubmit}
        />
      )}
      {formState.status === "editCollection" && (
        <EditCollection
          ref={focusRef}
          formState={formState}
          setFormState={setFormState}
          onSubmit={handleEdit}
        />
      )}
      <div className="page">
        <div className="p-title">
          <h2>Collection Page</h2>
        </div>
        <TableWrapper
          rows={collections}
          tableName={ctableName}
          tableBtn={ctableBtn}
          onTableBtn={onNewCollection}
          ths={ctableTHs}
          actions={actions}
          mainKeys={ctableKeys}
        ></TableWrapper>
      </div>
    </>
  );
};

export default CollectionPage;
