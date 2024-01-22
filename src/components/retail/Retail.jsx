import React, { useContext, useEffect, useRef, useState } from "react";
import TableWrapper from "../table/TableWrapper";
import { RetailBillContext } from "../../store/retailBillContext";
import {
  rbtableBtn,
  rbtableKeys,
  rbtableName,
  rbtableTHs,
} from "../../assets/props/tableProps/rbtableProps";
import Loader1 from "../loaders/Loader1";
import Modal from "../modal/Modal";
import NewRetail from "./NewRetail";
import { toast } from "react-toastify";
import {
  fetchAllRetailBIll,
  retailbillCreate,
  retailbillUpdate,
} from "../../controllers/retail";
import EditRetail from "./EditRetail";
import { ProductsContext } from "../../store/productContext";
import { StockContext } from "../../store/stockContext";
import { fetchAllStocks } from "../../controllers/stock";
import { fetchAllProducts } from "../../controllers/products";
import { PDFViewer } from "@react-pdf/renderer";
import RetailBillPDF from "./RetailBillPDF";
import { fetchAllClients } from "../../controllers/client";
import { ClientContext } from "../../store/clientContext";
import Table2Wrapper from "../table2/Table2Wrapper";

const Retail = () => {
  const { retailBills, setRetailBIlls, fetching } =
    useContext(RetailBillContext);
  const { setProducts } = useContext(ProductsContext);
  const { setStocks } = useContext(StockContext);
  const { setClients } = useContext(ClientContext);
  const initialRetail = {
    BillNo: retailBills.length + 1,
    orderDate: "",
    name: "",
    address: "",
    mobileNumber: "",
    deliveryDate: "",
    products: [],
    totalFirki: "",
    subTotal: 0,
    discount: 0,
    advance: 0,
    totalDue: 0,
  };
  const [formState, setFormState] = useState({ status: "", formData: {} });
  const [showPDF, setShowPDF] = useState({ status: false, bill: {} });
  const [loading, setLoading] = useState(true);
  const focusRef = useRef(null);
  const dateFixedBills = retailBills?.map((bill) => {
    return {
      ...bill,
      orderDate: bill.orderDate.slice(0, 10).split("-").reverse().join("/"),
      totalDue: (
        <span
          class={`inline-flex items-center rounded-md bg-red-50 px-2 py-1 text-xs font-medium ${
            bill.totalDue > 0
              ? "bg-red-50 text-red-700  ring-red-600/10"
              : "bg-green-50 text-green-700 ring-green-600/20"
          } ring-1 ring-inset`}
        >
          {bill.totalDue > 0 ? bill.totalDue : "Paid"}
        </span>
      ),
    };
  });
  // Assuming tomorrow's date is calculated using JavaScript Date object
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);

  // Filter retail bills with delivery dates ending tomorrow
  const tomorrowBills = retailBills
    ?.filter((bill) => new Date(bill.deliveryDate) <= tomorrow)
    ?.map((bill) => {
      return {
        ...bill,
        orderDate: bill.orderDate.slice(0, 10).split("-").reverse().join(" / "),
        totalDue: (
          <span
            class={`inline-flex items-center rounded-md bg-red-50 px-2 py-1 text-xs font-medium ${
              bill.totalDue > 0 ? "bg-red-50" : "bg-green-50"
            } ring-1 ring-inset ring-red-600/10`}
          >
            {bill.totalDue > 0 ? bill.totalDue : "Paid"}
          </span>
        ),
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
  const reRenderData = async () => {
    try {
      setRetailBIlls(await fetchAllRetailBIll());
      setProducts(await fetchAllProducts());
      setStocks(await fetchAllStocks());
      setClients(await fetchAllClients());
      setFormState({ status: "", formData: {} });
    } catch (error) {
      console.error("Error fetching Retail Bills:", error);
      toast.error("Error fetching retail bills");
    }
  };

  const onNewRetail = () =>
    setFormState({
      status: "newRetail",
      formData: { ...initialRetail },
    });
  const onShowPDF = (e, billId) => {
    setLoading(true);
    try {
      const bill = retailBills.find((bill) => bill._id === billId);
      setShowPDF({
        status: true,
        bill,
      });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      await toast.promise(retailbillCreate(formState.formData), {
        pending: "Creating Bill...",
        success: "Bill created successfully! 👌",
        error: "Error creating Bill. Please try again. 🤯",
      });
      setShowPDF({ status: true, bill: formState.formData });
      await reRenderData();
    } catch (error) {
      console.log(error);
      toast.error("Error adding product");
    } finally {
      setLoading(false);
    }
  }

  async function handleEdit(e, billId, formData) {
    e.preventDefault();
    setLoading(true);
    try {
      await toast.promise(retailbillUpdate(billId, formData), {
        pending: "Editing Bill...",
        success: "Bill editied successfully! 👌",
        error: "Error editing Bill. Please try again. 🤯",
      });
      await reRenderData();
    } catch (error) {
      console.log(error);
      toast.error("Error editing Bill");
    } finally {
      setLoading(false);
    }
  }
  async function onEdit(e, billId) {
    e.preventDefault();
    setLoading(true);

    try {
      const res = retailBills.find((bill) => bill._id === billId);
      setFormState({ status: "editRetail", formData: res });
    } catch (error) {
      console.error("Error fetching bill details:", error);
      // Handle error if needed
    } finally {
      setLoading(false);
    }
  }
  const actions = [
    {
      button: (
        <span className="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 mr-2 text-xs font-medium text-blue-600 ring-1 ring-inset ring-blue-700/10">
          <span className="material-icons text-sm">visibility</span>
        </span>
      ),

      classNames: [],
      onSmash: onShowPDF,
    },
    {
      button: (
        <span class="inline-flex items-center rounded-md bg-green-50 px-2 py-1 mr-2 text-xs font-medium text-green-600 ring-1 ring-inset ring-green-600/20">
          <span className="material-icons text-sm">edit</span>
        </span>
      ),
      classNames: [],
      onSmash: onEdit,
    },
  ];
  return (
    <>
      {loading && <Loader1 />}
      {showPDF.status && (
        <Modal
          isOpen={showPDF.status}
          onClose={() => setShowPDF({ status: false, bill: {} })}
        >
          <PDFViewer width="1000" height="600">
            <RetailBillPDF bill={showPDF.bill} />
          </PDFViewer>
        </Modal>
      )}
      <div className="bills">
        {formState.status === "newRetail" && (
          <Modal
            isOpen={formState.status === "newRetail"}
            onClose={() => setFormState({ status: "", formData: {} })}
          >
            <NewRetail
              formState={formState}
              setFormState={setFormState}
              onSubmit={handleSubmit}
              ref={focusRef}
            />
          </Modal>
        )}
        {formState.status === "editRetail" && (
          <Modal
            isOpen={formState.status === "editRetail"}
            onClose={() => setFormState({ status: "", formData: {} })}
          >
            <EditRetail
              formData={formState.formData}
              setFormState={setFormState}
              onSubmit={handleEdit}
            />
          </Modal>
        )}
      </div>
      <Table2Wrapper
        showIndex={false}
        rows={dateFixedBills}
        tableName={rbtableName}
        tableBtn={rbtableBtn}
        onTableBtn={onNewRetail}
        ths={rbtableTHs}
        actions={actions}
        mainKeys={rbtableKeys}
      ></Table2Wrapper>
    </>
  );
};

export default Retail;