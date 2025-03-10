import React from "react";

const DriverInfo = (driverData) => {
  return (
    <>
      <div className="p-1 bg-cardBackground dark:bg-bodyBackground rounded-lg">
        {/* Driver Info */}
        <div className="flex items-center gap-4">
          <img src={require("../../../assets/images/user/user-01.png")} alt="Driver" className="w-12 h-12 rounded-full" />
          <div>
            <h2 className="text-sm font-semibold text-text2">
              {driverData?.driverData?.driver?.first_name ? driverData?.driverData?.driver?.first_name + " " + driverData?.driverData?.driver?.last_name : <span className="na">N/A</span>}
            </h2>
            <p className="text-text3 text-sm">{driverData?.driverData?.driver?.phone_number ? driverData?.driverData?.driver?.phone_number : <span className="na">N/A</span>}</p>
          </div>
        </div>

        {/* Details Section */}
        <div className="mt-4 grid grid-cols-2 xl:grid-cols-4 gap-4">
          <div className="bg-muted1 p-3 rounded-lg">
            <p className="text-text5 text-[12px]">Driver ID</p>
            <p className="text-text2 text-[13px] whitespace-nowrap font-medium">{driverData?.driverData?.driver?.id ? driverData?.driverData?.driver?.id : <span className="na">N/A</span>}</p>
          </div>
          <div className="bg-muted1 p-3 rounded-lg">
            <p className="text-text5 text-[12px]">Licence Number</p>
            <p className="text-text2 text-[13px] whitespace-nowrap font-medium">
              {driverData?.driverData?.driver?.license_number ? driverData?.driverData?.driver?.license_number : <span className="na">N/A</span>}
            </p>
          </div>
          <div className="bg-muted1 p-3 rounded-lg">
            <p className="text-text5 text-[12px]">Manager Name</p>
            <p className="text-text2 text-[13px] whitespace-nowrap font-medium">{driverData?.driverData?.driver?.name ? driverData?.driverData?.driver?.name : <span className="na">N/A</span>}</p>
          </div>
          <div className="bg-muted1 p-3 rounded-lg">
            <p className="text-text5 text-[12px]">Manager Number</p>
            <p className="text-text2 text-[13px] whitespace-nowrap font-medium">{driverData?.driverData?.driver?.name ? driverData?.driverData?.driver?.name : <span className="na">N/A</span>}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default DriverInfo;
