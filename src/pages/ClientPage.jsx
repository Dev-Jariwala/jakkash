import React, { useContext, useEffect, useRef, useState } from "react";

import TableWrapper from "../components/table/TableWrapper";
import { ClientContext } from "../store/clientContext";
import {
  cltableBtn,
  cltableHeaders,
  cltableKeys,
  cltableName,
  cltableTHs,
} from "../assets/props/tableProps/cltableProps";
import Loader1 from "../components/loaders/Loader1";
import PageTitle from "../components/pageTemp/PageTitle";
import Table2Wrapper from "../components/table2/Table2Wrapper";

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
      <PageTitle pageName={"Client"}>
        <Table2Wrapper
          rows={clients}
          tableName={cltableName}
          tableBtn={cltableBtn}
          onTableBtn={onNewClient}
          ths={cltableTHs}
          mainKeys={cltableKeys}
          exportData={clients}
          headers={cltableHeaders}
        ></Table2Wrapper>
      </PageTitle>
    </>
  );
};

export default ClientPage;
