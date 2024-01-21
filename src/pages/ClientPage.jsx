import React, { useContext, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import TableWrapper from "../components/table/TableWrapper";
import { ClientContext } from "../store/clientContext";
import {
  cltableBtn,
  cltableKeys,
  cltableName,
  cltableTHs,
} from "../assets/props/tableProps/cltableProps";
import Loader1 from "../components/loaders/Loader1";

const ClientPage = () => {
  const { clients, fetching } = useContext(ClientContext);
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
  function onNewClient() {
    setFormState({
      status: "newClient",
      formData: { name: "", mobileNumber: 0, address: "" },
    });
  }
  return (
    <>
      {loading && <Loader1 />}
      <div className="page">
        <div className="p-title">
          <h2>
            <Link to={"/"}>Dashboard</Link>
            <span className="material-icons">navigate_next</span> Client
          </h2>
        </div>
        <TableWrapper
          rows={clients}
          tableName={cltableName}
          tableBtn={cltableBtn}
          onTableBtn={onNewClient}
          ths={cltableTHs}
          mainKeys={cltableKeys}
        ></TableWrapper>
      </div>
    </>
  );
};

export default ClientPage;
