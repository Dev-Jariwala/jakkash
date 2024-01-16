import React, { forwardRef } from "react";
import Modal from "../modal/Modal";

const EditCollection = forwardRef(
  ({ formState, setFormState, onSubmit }, ref) => {
    return (
      <Modal
        isOpen={formState.status === "editCollection"}
        onClose={() => setFormState({ status: "", formData: {} })}
      >
        <div className="form-container">
          <form
            onSubmit={(e) =>
              onSubmit(e, formState.formData._id, {
                collectionName: formState.formData.collectionName,
              })
            }
          >
            <h4>Edit Collection details:</h4>
            <div>
              <label>
                Collection Name:
                <input
                  type="text"
                  ref={ref}
                  placeholder="Collection Name"
                  value={formState.formData.collectionName}
                  onChange={(e) =>
                    setFormState((prev) => ({
                      ...prev,
                      formData: {
                        ...prev.formData,
                        collectionName: String(e.target.value),
                      },
                    }))
                  }
                  required
                />
              </label>
            </div>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <button type="submit">Update Collection</button>
            </div>
          </form>
        </div>
      </Modal>
    );
  }
);

export default EditCollection;
