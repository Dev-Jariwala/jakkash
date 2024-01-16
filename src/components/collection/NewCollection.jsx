import React, { forwardRef } from "react";
import Modal from "../modal/Modal";

const NewCollection = forwardRef(
  ({ formState, setFormState, onSubmit }, ref) => {
    return (
      <Modal
        isOpen={formState.status === "newCollection"}
        onClose={() => setFormState({ status: "", formData: {} })}
      >
        <div className="form-container">
          <form onSubmit={(e) => onSubmit(e)}>
            <h4>Enter Collection details:</h4>
            <div>
              <label>
                Collection Name:
                <input
                  ref={ref}
                  type="text"
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
              <button type="submit">Create Collection</button>
            </div>
          </form>
        </div>
      </Modal>
    );
  }
);

export default NewCollection;
