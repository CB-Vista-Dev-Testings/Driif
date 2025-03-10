import React, { useState } from "react";
import { ChevronUpIcon, ChevronDownIcon } from "@heroicons/react/24/solid";
import DriverInfo from "./DriverInfo";
import TripHistory from "./TripHistory";
import FleetInfo from "./FleetInfo";
import { CalendarIcon } from "@heroicons/react/24/outline";
import DateRangePickerWithFooter from "./DateRangePickerWithFooter";
import { FLEET_TABS_ON_MAP } from "../../../constants/constants";

const FleetInfoMain = ({ onTripReplay, vehicleData }) => {
  const [activeTab, setActiveTab] = useState(FLEET_TABS_ON_MAP.DRIVER);
  const [isOpen, setIsOpen] = useState(false);
  const [dateRange, setDateRange] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleSelect = (ranges) => {
    setDateRange([ranges.selection]);
  };

  const handleApply = () => {
    setShowDatePicker(false);
    // Additional logic for applying the date range can be added here
  };

  const handleCancel = () => {
    setShowDatePicker(false);
  };

  return (
    <>
      <div className="relative w-full mt-10 shadow-2xl rounded-b-lg border border-border2 rounded-lg">
        {/* Tabs */}
        <button
          className="absolute top-[-30px] !min-w-[20px] !p-[6px_10px_25px_10px] right-0 border border-border2 font-semibold btn bg-cardBackground dark:bg-bodyBackground shadow-2xl !rounded-[13px]"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <ChevronUpIcon size={24} className="size-4" /> : <ChevronDownIcon size={24} className="size-5 text-primary" />}
        </button>
        <div className="relative flex border-b border-border bg-bodyBackground dark:bg-bodyBackground rounded-t-lg">
          {activeTab === FLEET_TABS_ON_MAP.TRIP ? (
            <div className="absolute top-3 right-3">
              <button className="btn bg-primary/15 border border-primary !px-1 !py-1" onClick={() => setShowDatePicker(!showDatePicker)}>
                <CalendarIcon className="size-4 text-primary" />
              </button>
              {showDatePicker && (
                <div style={{ position: "absolute", zIndex: 1000, bottom: "40px", right: "0" }}>
                  <DateRangePickerWithFooter ranges={dateRange} onChange={handleSelect} onApply={handleApply} onCancel={handleCancel} />
                </div>
              )}
            </div>
          ) : null}
          <button
            className={`flex-1 text-sm p-3 text-center bg-cardBackground dark:bg-bodyBackground font-bold border-b-1 ${
              activeTab === FLEET_TABS_ON_MAP.DRIVER ? "border-b-2 text-primary border-primary" : "text-text3"
            }`}
            onClick={() => setActiveTab(FLEET_TABS_ON_MAP.DRIVER)}
          >
            Driver details
          </button>
          <button
            className={`flex-1 text-sm p-3 text-center font-bold bg-cardBackground dark:bg-bodyBackground border-b-1 ${
              activeTab === FLEET_TABS_ON_MAP.VEHICLE ? "border-b-2 text-primary border-primary" : "text-text3"
            }`}
            onClick={() => setActiveTab(FLEET_TABS_ON_MAP.VEHICLE)}
          >
            Vehicle details
          </button>
          <button
            className={`flex-1 text-sm p-3 text-center font-bold bg-cardBackground dark:bg-bodyBackground border-b-1 ${
              activeTab === FLEET_TABS_ON_MAP.TRIP ? "border-b-2 text-primary border-primary" : "text-text3"
            }`}
            onClick={() => setActiveTab(FLEET_TABS_ON_MAP.TRIP)}
          >
            Trip history
          </button>
        </div>

        {/* Expandable Section */}
        <div
          className={`overflow-hidden relative bg-cardBackground dark:bg-bodyBackground rounded-b-lg p-4 transition-all duration-300 dark:bg-gradient1 ${
            isOpen ? "max-h-screen opacity-100 block" : "max-h-0 opacity-0 hidden"
          }`}
        >
          {activeTab === FLEET_TABS_ON_MAP.DRIVER && <DriverInfo driverData={vehicleData} />}
          {activeTab === FLEET_TABS_ON_MAP.VEHICLE && <FleetInfo fleetData={vehicleData} />}
          {activeTab === FLEET_TABS_ON_MAP.TRIP && <TripHistory tripHistory={vehicleData} onTripReplay={onTripReplay} />}
        </div>

        {/* Toggle Button */}
      </div>
    </>
  );
};

export default FleetInfoMain;
