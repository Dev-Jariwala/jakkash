import React, { useContext, useEffect, useRef, useState } from "react";
import TableWrapper from "../table/TableWrapper";

import Loader1 from "../loaders/Loader1";
import Modal from "../modal/Modal";
import { toast } from "react-toastify";
import EditRetail from "./EditWholeSale";
import { ProductsContext } from "../../store/productContext";
import { StockContext } from "../../store/stockContext";
import { fetchAllStocks } from "../../controllers/stock";
import { fetchAllProducts } from "../../controllers/products";
import { PDFViewer } from "@react-pdf/renderer";
import RetailBillPDF from "./RetailBillPDF";
import { WholeSaleContext } from "../../store/wholeSaleBillContext";
import {
  fetchAllWholeSaleBills,
  wholeSaleBillCreate,
  wholeSaleBillUpdate,
} from "../../controllers/wholeSale";
import {
  wbtableBtn,
  wbtableKeys,
  wbtableName,
  wbtableTHs,
} from "../../assets/props/tableProps/wbtableProps";
import NewWholeSale from "./NewWholeSale";
import EditWholeSale from "./EditWholeSale";
import { fetchAllClients } from "../../controllers/client";
import { ClientContext } from "../../store/clientContext";

const WholeSale = () => {
  const { wholeSaleBills, setWholeSaleBills, fetching } =
    useContext(WholeSaleContext);
  const { setProducts } = useContext(ProductsContext);
  const { setStocks } = useContext(StockContext);
  const { setClients } = useContext(ClientContext);
  const initialRetail = {
    BillNo: wholeSaleBills.length + 1,
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
  const dateFixedBills = wholeSaleBills?.map((stock) => {
    return {
      ...stock,
      orderDate: stock.orderDate.slice(0, 10).split("-").reverse().join(" / "),
      totalDue: (
        <button
          className={`btn-outline ${stock.totalDue > 0 ? "danger" : "success"}`}
        >
          {stock.totalDue > 0 ? stock.totalDue : "Paid"}
        </button>
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
      setWholeSaleBills(await fetchAllWholeSaleBills());
      setProducts(await fetchAllProducts());
      setStocks(await fetchAllStocks());
      setClients(await fetchAllClients());
      setFormState({ status: "", formData: {} });
    } catch (error) {
      console.error("Error fetching Retail Bills:", error);
      toast.error("Error fetching retail bills");
    }
  };

  const onNewWholeSale = () =>
    setFormState({
      status: "newWholesale",
      formData: { ...initialRetail },
    });
  const onShowPDF = (e, billId) => {
    setLoading(true);
    try {
      const bill = wholeSaleBills.find((bill) => bill._id === billId);
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
      await toast.promise(wholeSaleBillCreate(formState.formData), {
        pending: "Creating Bill...",
        success: "Bill created successfully! 👌",
        error: "Error creating Bill. Please try again. 🤯",
      });
      setShowPDF({ status: true, bill: formState.formData });
      await reRenderData();
    } catch (error) {
      console.log(error);
      toast.error("Error creating wholesalebill");
    } finally {
      setLoading(false);
    }
  }

  async function handleEdit(e, billId, formData) {
    e.preventDefault();
    setLoading(true);
    try {
      await toast.promise(wholeSaleBillUpdate(billId, formData), {
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
      const res = wholeSaleBills.find((bill) => bill._id === billId);
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
      button: "view",
      classNames: ["btn-outline", "primary"],
      onSmash: onShowPDF,
    },
    {
      button: "Edit",
      classNames: ["btn-outline", "success"],
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
        {formState.status === "newWholesale" && (
          <Modal
            isOpen={formState.status === "newWholesale"}
            onClose={() => setFormState({ status: "", formData: {} })}
          >
            <NewWholeSale
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
            <EditWholeSale
              formData={formState.formData}
              setFormState={setFormState}
              onSubmit={handleEdit}
            />
          </Modal>
        )}
      </div>
      <TableWrapper
        showIndex={false}
        rows={dateFixedBills}
        tableName={wbtableName}
        tableBtn={wbtableBtn}
        onTableBtn={onNewWholeSale}
        ths={wbtableTHs}
        actions={actions}
        mainKeys={wbtableKeys}
      ></TableWrapper>
    </>
  );
};

export default WholeSale;
