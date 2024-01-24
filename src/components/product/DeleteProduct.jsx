import React, { forwardRef, useState } from "react";

const DeleteProduct = forwardRef(
  ({ productName, cancelDelete, confirmDelete }, ref) => {
    const [muted, setMuted] = useState(false);
    const [wantToDelete, setWantToDelete] = useState(false);
    const toggleMute = () => {
      setMuted((prevMuted) => !prevMuted);
    };
    return (
      <div className="px-4 pt-3 w-[500px]">
        <div
          class="flex flex-col p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
          role="alert"
        >
          <div className="flex items-center">
            <span className="material-icons text-m mr-2">warning</span>
            <span class="font-bold text-m">Warning!</span>
          </div>

          <div className="mt-2 text-justify">
            By deleting <span className="font-semibold">"{productName}"</span>,
            associated <span className="font-semibold">stocks</span> will also
            be permanently deleted.
          </div>
        </div>
        <div
          class="flex p-4 mb-4 text-sm text-blue-800 rounded-lg bg-blue-50 dark:bg-gray-800 dark:text-blue-400"
          role="alert"
        >
          <svg
            class="flex-shrink-0 inline w-4 h-4 me-3 mt-[2px]"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
          </svg>
          <span class="sr-only">Info</span>
          <div>
            <span class="font-medium">
              Instead try to <span className="font-semibold">Mute</span> the
              product:
            </span>
            <ul class="mt-1.5 list-disc list-inside text-xs text-justify">
              <li>Muted products won't appear in New bills.</li>
              <li>
                They are excluded from editing bills that don't contain the
                product's quantity.
              </li>
              {/* <li>Muted products are placed at the end of the table.</li> */}
              <li>
                You can <strong>Unmute</strong> the product anytime to restore
                its visibility and data.
              </li>
            </ul>
            {/* Toggle button to mute or unmute product */}
            <label class="relative inline-flex items-center cursor-pointer mt-3">
              <input
                type="checkbox"
                value=""
                className="sr-only peer"
                onChange={toggleMute}
                checked={muted}
              />
              <div class="w-11 h-6 bg-blue-200 peer-focus:outline-none rounded-full peer peer-focus:ring-1 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
              <span class="ms-3 text-sm font-medium text-blue-800 dark:text-gray-300">
                {muted ? "Muted" : "UnMuted"}
              </span>
            </label>
          </div>
        </div>
        <div class="flex items-center mb-4">
          <input
            id="default-checkbox"
            type="checkbox"
            checked={wantToDelete}
            onChange={() => setWantToDelete((prev) => !prev)}
            class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
          />
          <label
            for="default-checkbox"
            class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            I Understand, delete '{productName}'
          </label>
        </div>

        <div className="flex items-center justify-end mt-5">
          <button
            type="button"
            onClick={cancelDelete}
            class="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 me-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
          >
            Cancle
          </button>
          <button
            type="button"
            onClick={confirmDelete}
            ref={ref}
            disabled={!wantToDelete}
            class={`focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 ${
              !wantToDelete && "opacity-50 cursor-not-allowed"
            } dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900`}
          >
            Delete
          </button>
        </div>
      </div>
    );
  }
);

export default DeleteProduct;
