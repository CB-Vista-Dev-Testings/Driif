import React, { useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { trips } from "../../../data/sampleData";
import { ReplayIcon } from "../../../components/SvgIcons";

const TripHistory = ({ onTripReplay }) => {
  const [selectedTrip, setSelectedTrip] = useState(null);

  const handleRowClick = (event) => {
    setSelectedTrip(event.data);
    onTripReplay(event.data);
  };

  const actionTemplate = (rowData) => (
    <button
      className="text-primary hover:text-primary text-center w-full p-2 py-0"
      onClick={() => {
        setSelectedTrip(rowData);
        onTripReplay(rowData);
      }}
    >
      <ReplayIcon className="w-[30px] h-[30px] mx-auto" />
    </button>
  );

  const rowClassName = (data) => {
    return {
      "bg-primary/5": selectedTrip && selectedTrip.date === data.date,
      "cursor-pointer": true,
      "hover:bg-primary/5": true, // Add this line to change bg color on hover
    };
  };

  return (
    <div className="bg-cardBackground dark:bg-bodyBackground rounded-lg">
      <DataTable value={trips} className="w-full" rowClassName={rowClassName} onRowClick={handleRowClick}>
        <Column field="date" header="Date" headerClassName="py-3 text-sm bg-muted1 text-text5 font-medium" className="text-text3 py-2 border-b border-border text-sm" />
        <Column field="name" header="Driver" headerClassName="py-3 text-sm bg-muted1 text-text5 font-medium" className="text-text3 py-2 border-b border-border text-sm" />
        <Column field="distance" header="Distance" headerClassName="py-3 text-sm bg-muted1 text-text5 font-medium" className="text-text3 py-2 border-b border-border text-sm" />
        <Column field="driveTime" header="Drive time" headerClassName="py-3 text-sm bg-muted1 text-text5 font-medium" className="text-text3 py-2 border-b border-border text-sm" />
        <Column field="avgSpeed" header="Avg speed" headerClassName="py-3 text-sm bg-muted1 text-text5 font-medium" className="text-text3 py-2 border-b border-border text-sm" />
        <Column field="stops" header="Stops" headerClassName="py-3 text-sm bg-muted1 text-text5 font-medium" className="text-text3 py-2 border-b border-border text-sm" />
        <Column field="alerts" header="Alerts" headerClassName="py-3 text-sm bg-muted1 text-text5 font-medium" className="text-text3 py-2 border-b border-border text-sm" />
        <Column body={actionTemplate} header="Actions" headerClassName="py-3 text-sm bg-muted1 text-text5 font-medium" className="text-text3 py-2 border-b border-border text-sm" />
      </DataTable>
    </div>
  );
};

export default TripHistory;
