import React, { useState, useEffect } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { ChevronLeftIcon } from "@heroicons/react/16/solid";
import {
  CameraVideo, FilterIcon, NavigationMarker, WarningIcon, SignalMediumGreen, FleetSpeed,
  FleetTemp, FleetKmph, FleetDistance, FleetWay, FleetLeaf, FleetFuel
} from "../../components/SvgIcons";
import { vehicleData } from "../../data/sampleData";
import AppBadge from "../../components/common/AppBadges";

const statusColors = {
  All: "bg-primary",
  Running: "bg-themeGreen",
  Idling: "bg-themeYellow",
  Parked: "bg-themeRed",
};

const Depot = ({ onBack, onVehicleSelect, onShowPlayer }) => { // Add onShowPlayer prop
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [selectedVehicleId, setSelectedVehicleId] = useState(null);
  const filteredData = selectedStatus === "All" ? vehicleData : vehicleData.filter((item) => item.status === selectedStatus);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const handleVehicleClick = (vehicle) => {
    setSelectedVehicleId(vehicle.id);
    onVehicleSelect(vehicle);
  };

  const handleBackClick = () => {
    setSelectedVehicleId(null);
    onBack();
  };

  return (
    <div className="p-[1px]">
      <div key="depot" className="animate-slideIn">
        <h1 className="text-xl font-semibold text-text1 gap-1 flex">
          <button className="btn btn-sm btn-icon !shadow-none" onClick={handleBackClick}>
            <ChevronLeftIcon className="h-5 w-5" />
          </button>
          Depot name
        </h1>
        <div className="flex items-center gap-2 mt-3">
          <div className="searchInputField w-full">
            <input name="search" type="text" placeholder="Search" />
            <MagnifyingGlassIcon aria-hidden="true" className="icon" />
          </div>
          <button className="btn btn-icon text-center !py-[10px] !px-3 bg-cardBackground !shadow-none">
            <WarningIcon className="h-5 w-5 mt-1 text-text4" />
          </button>
          <button className="btn btn-icon text-center !py-[10px] !px-3 bg-cardBackground !shadow-none">
            <FilterIcon className="h-10 w-10 mt-1 text-text2" />
          </button>
        </div>
        <div className="flex gap-x-2 mt-3 w-full">
          <button
            className={`status-button status-all ${selectedStatus === "All" ? "active" : ""}`}
            onClick={() => setSelectedStatus("All")}
          >
            All <span className={`status-count ${selectedStatus === "All" ? "active" : ""}`}>100</span>
          </button>
          <button
            className={`status-button status-running ${selectedStatus === "Running" ? "active" : ""}`}
            onClick={() => setSelectedStatus("Running")}
          >
            Running <span className={`status-count ${selectedStatus === "Running" ? "active" : ""}`}>100</span>
          </button>
          <button
            className={`status-button status-idling ${selectedStatus === "Idling" ? "active" : ""}`}
            onClick={() => setSelectedStatus("Idling")}
          >
            Idling <span className={`status-count ${selectedStatus === "Idling" ? "active" : ""}`}>8</span>
          </button>
          <button
            className={`status-button status-parked ${selectedStatus === "Parked" ? "active" : ""}`}
            onClick={() => setSelectedStatus("Parked")}
          >
            Parked <span className={`status-count ${selectedStatus === "Parked" ? "active" : ""}`}>12</span>
          </button>
        </div>

        <div className="mt-4 space-y-3">
          {
            isLoading ? (
              <div className="animate-pulse">
                {[...Array(4)].map((_, index) => (
                  <div key={index} className="w-full bg-cardBackground rounded-lg shadow mb-4 p-4 py-2">
                    <div className="flex rounded w-3/4 mb-2 items-center gap-x-2">
                      <div className="bg-muted2 rounded-full h-[46px] w-[46px]"></div>
                      <div className="h-6 bg-muted2 rounded w-60"></div>
                    </div>
                    <div className="h-20 bg-muted2 rounded w-full"></div>
                    <div className="flex mt-4 rounded mb-2 items-center w-full gap-x-2">
                      <div className="h-10 bg-muted2 rounded w-full"></div>
                      <div className="h-10 bg-muted2 rounded w-full"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              filteredData.map((item) => (
                <div
                  key={item.id}
                  className={`p-4 cursor-pointer border border-border rounded-lg hover:ring-1 hover:ring-primary shadow-sm bg-cardBackground ${selectedVehicleId === item.id ? "ring-[1px] !shadow-xl ring-primary" : ""}`}
                  onClick={() => handleVehicleClick(item)}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-x-1">
                      <img src={require("../../assets/images/icons/fleet_lcon.svg").default} alt="Region" className="w-6 h-6 mr-2" />
                      <h2 className="font-bold text-text1 text-sm">{item.name}</h2>
                      <WarningIcon className="ms-1 w-4 h-[15px] text-themeRed fill-none mt-[0.5px]" />
                    </div>
                    <div className="flex items-center gap-x-2">
                      <NavigationMarker className="w-6 h-6 text-text5 fill-none" />
                      <CameraVideo className="w-6 h-6 text-text5 fill-none" />
                      <SignalMediumGreen className="w-6 h-6 text-text5 fill-none" />
                      <AppBadge
                        text={item.status}
                        color={
                          item.status === "Running" ? "green" :
                            item.status === "Idling" ? "yellow" :
                              item.status === "Parked" ? "red" : "gray"
                        }
                        className="!rounded-full !font-bold"
                      />
                    </div>
                  </div>
                  <div className="flex flex-col bg-muted1 gap-y-2 p-2">
                    <div className="flex gap-x-2">
                      <p className="flex whitespace-nowrap gap-x-1 text-[13px] rounded-md text-text4 bg-cardBackground p-1 w-full">
                        <FleetSpeed className="!w-6 !h-6 fill-none" />
                        {item.km} km
                      </p>
                      <p className="flex whitespace-nowrap gap-x-1 text-[13px] rounded-md text-text4 bg-cardBackground p-1 w-full">
                        <FleetFuel className="!w-6 !h-6 fill-none" />
                        {item.fuel}
                      </p>
                      <p className="flex whitespace-nowrap gap-x-1 text-[13px] rounded-md text-text4 bg-cardBackground p-1 w-full">
                        <FleetLeaf className="!w-6 !h-6 fill-none" />
                        500 km
                      </p>
                    </div>
                    <div className="flex gap-x-2">
                      <p className="flex whitespace-nowrap gap-x-1 text-[13px] rounded-md text-text4 bg-cardBackground p-1 w-full">
                        <FleetWay className="!w-6 !h-6 fill-none" />
                        500 km
                      </p>
                      <p className="flex whitespace-nowrap gap-x-1 text-[13px] rounded-md text-text4 bg-cardBackground p-1 w-full">
                        <FleetDistance className="!w-6 !h-6 fill-none" />
                        500 km
                      </p>
                      <p className="flex whitespace-nowrap gap-x-1 text-[13px] rounded-md text-text4 bg-cardBackground p-1 w-full">
                        <FleetKmph className="!w-6 !h-6 fill-none" />
                        {item.speed}
                      </p>
                      <p className="flex whitespace-nowrap gap-x-1 text-[13px] rounded-md text-text4 bg-cardBackground p-1 w-full">
                        <FleetTemp className="!w-6 !h-6 fill-none" />
                        {item.temp}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4 mt-2 w-full">
                    <button className="flex w-full items-center gap-1 px-4 py-2 font-bold text-[13px] rounded-md justify-center bg-muted1 text-primary">
                      <NavigationMarker className="!w-6 !h-6 fill-none" /> Track
                    </button>
                    <button
                      className="flex w-full items-center gap-1 px-4 py-2 text-[13px] rounded-md font-bold justify-center bg-muted1 text-primary hover:bg-primary hover:text-white"
                      onClick={onShowPlayer} // Handle click to show player
                    >
                      <CameraVideo className="!w-6 !h-6 fill-none me-1 mt-[-1px]" /> Live Stream
                    </button>
                  </div>
                </div>
              ))
            )
          }

        </div>
      </div>
    </div>
  );
};

export default Depot;
