import { useEffect, useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import axiosClient from "../../axios-client";
import "primeflex/primeflex.css";
import "../../assets/styles/admin.css";

const ListenerList = () => {
 const [listeners, setListeners] = useState([]);
 const [globalFilter, setGlobalFilter] = useState('');

 useEffect(() => {
    axiosClient
      .get("/listeners")
      .then((response) => setListeners(response.data))
      .catch((error) => console.error("Error fetching listeners:", error));
 }, []);

 const onGlobalFilterChange = (e) => {
  const value = e.target.value;
  setGlobalFilter(value);
  // Workaround for the bug: Reset the DataTable to display all items when the search input is cleared
  if (value === '') {
      setGlobalFilter(null);
  }
};


 return (
    <div style={{ height: "calc(100vh - 150px)" }}>
      <DataTable
        value={listeners}
        stripedRows
        showGridlines
        scrollable
        scrollHeight="flex"
        tableStyle={{ minWidth: "50rem" }}
        rowstyle={{ paddingTop: "10px", paddingBottom: "10px" }}
        paginator={true} // Enable pagination
        rowsPerPageOptions={[5, 10, 20]}
        paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport"
        rows={10} 
        header={
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <h1>Listeners</h1>
            <div style={{ display: "flex", alignItems: "center" }}>
              <span className="p-input-icon-left">
                <i className="pi pi-search" />
                <input
                 type="text"
                 value={globalFilter}
                 onChange={onGlobalFilterChange}
                 placeholder="Search"
                 className="p-inputtext form-control mb-3"
                />
              </span>
            </div>
          </div>
        }
      >
        <Column
          field="id"
          header="ID"
          sortable
          headerStyle={{
            backgroundColor: "#2c2c2c",
            borderBottom: "2px solid #c70000",
            paddingTop: "10px",
            paddingBottom: "10px",
          }}
        />
        <Column
          field="name"
          header="Name"
          sortable
          headerStyle={{
            backgroundColor: "#2c2c2c",
            borderBottom: "2px solid #c70000",
            paddingTop: "10px",
            paddingBottom: "10px",
          }}
        />
        <Column
          field="email"
          header="Email Address"
          sortable
          headerStyle={{
            backgroundColor: "#2c2c2c",
            borderBottom: "2px solid #c70000",
            paddingTop: "10px",
            paddingBottom: "10px",
          }}
        />
        <Column
          field="email_verified_at"
          header="Verification Status"
          headerStyle={{
            backgroundColor: "#2c2c2c",
            borderBottom: "2px solid #c70000",
            paddingTop: "10px",
            paddingBottom: "10px",
          }}
          body={(rowData) => {
            const bgColor = rowData.email_verified_at ? "#00c700" : "#c70000";
            return (
              <div
                style={{
                 backgroundColor: bgColor,
                 color: "white",
                 padding: "5px 10px",
                 borderRadius: "10px",
                 display: "inline-block",
                }}
              >
                {rowData.email_verified_at ? "Verified" : "Unverified"}
              </div>
            );
          }}
        />
        <Column
          header="Actions"
          headerStyle={{
            backgroundColor: "#2c2c2c",
            borderBottom: "2px solid #c70000",
            paddingTop: "10px",
            paddingBottom: "10px",
          }}
        />
      </DataTable>
    </div>
 );
};

export default ListenerList;
