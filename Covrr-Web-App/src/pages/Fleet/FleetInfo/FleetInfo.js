import React from "react";
import { CheckCircleIcon } from "@heroicons/react/24/solid";
import { InformationCircleIcon } from "@heroicons/react/24/outline";

const FleetInfo = (fleetData) => {
  return (
    <>
      <div className="p-1 bg-cardBackground dark:bg-bodyBackground rounded-lg">
        {/* Driver Info */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <img src={require("../../../assets/images/icons/fleet_lcon.svg").default} alt="Driver" className="w-12 h-12 rounded-full" />
            <div>
              <h2 className="text-sm font-semibold text-text2">{fleetData?.fleetData?.registration_number}</h2>
              <p className="text-text3 text-sm">{fleetData?.fleetData?.registration_number}</p>
            </div>
          </div>
          <img src={require("../../../assets/images/icons/camera.svg").default} alt="Vehicle" className="w-12" />
        </div>

        {/* Details Section */}
        <p className="mt-4 text-[12px] font-semibold text-text3">VEHICLE DETAILS</p>
        <div className="mt-2 grid grid-cols-2 xl:grid-cols-4 gap-4">
          <div className="bg-muted1 p-3 rounded-lg">
            <p className="text-text5 text-[12px]">Vehicle ID</p>
            <p className="text-text2 text-[13px] whitespace-nowrap font-medium">{fleetData?.fleetData?.id ? fleetData?.fleetData?.id : <span className="na">N/A</span>}</p>
          </div>
          <div className="bg-muted1 p-3 rounded-lg">
            <p className="text-text5 text-[12px]">RC Number</p>
            <p className="text-text2 text-[13px] whitespace-nowrap font-medium">{fleetData?.fleetData?.rc_number ? fleetData?.fleetData?.rc_number : <span className="na">N/A</span>}</p>
          </div>
          <div className="bg-muted1 p-3 rounded-lg">
            <p className="text-text5 text-[12px]">Manager Name</p>
            <p className="text-text2 text-[13px] whitespace-nowrap font-medium">{fleetData?.fleetData?.manager_name ? fleetData?.fleetData?.manager_name : <span className="na">N/A</span>}</p>
          </div>
          <div className="bg-muted1 p-3 rounded-lg">
            <p className="text-text5 text-[12px]">Manager Number</p>
            <p className="text-text2 text-[13px] whitespace-nowrap font-medium">{fleetData?.fleetData?.manager_number ? fleetData?.fleetData?.manager_number : <span className="na">N/A</span>}</p>
          </div>
        </div>
        <p className="mt-4 text-[12px] font-semibold text-text3">INSURANCE DETAILS</p>
        <div className="mt-2 grid grid-cols-2 xl:grid-cols-3 gap-4">
          <div className="bg-muted1 p-3 rounded-lg relative">
            <CheckCircleIcon className="text-green-500 size-5 absolute right-4" />
            <p className="text-text5 text-[12px]">Insurance Status</p>
            <p className="text-text2 text-[13px] whitespace-nowrap font-medium">
              {fleetData?.fleetData?.insurance_expiry_date ? fleetData?.fleetData?.insurance_expiry_date : <span className="na">N/A</span>}
            </p>
          </div>
          <div className="bg-muted1 p-3 rounded-lg">
            <p className="text-text5 text-[12px]">Insured Value</p>
            <p className="text-text2 text-[13px] whitespace-nowrap font-medium">
              {fleetData?.fleetData?.insurance_expiry_date ? fleetData?.fleetData?.insurance_expiry_date : <span className="na">N/A</span>}
            </p>
          </div>
          <div className="bg-muted1 p-3 rounded-lg relative">
            <InformationCircleIcon className="text-text4 size-5 absolute right-4" />
            <p className="text-text5 text-[12px]">IDV</p>
            <p className="text-text2 text-[13px] whitespace-nowrap font-medium">
              {fleetData?.fleetData?.insurance_expiry_date ? fleetData?.fleetData?.insurance_expiry_date : <span className="na">N/A</span>}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default FleetInfo;
