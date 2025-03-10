import React, { useState, useEffect, useRef } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { ChevronLeftIcon } from "@heroicons/react/16/solid";
import {
  CameraVideo,
  FilterIcon,
  NavigationMarker,
  WarningIcon,
  SignalMediumGreen,
  FleetSpeed,
  FleetTemp,
  FleetKmph,
  FleetDistance,
  FleetWay,
  FleetLeaf,
  FleetFuel,
  NoDataFound,
} from "../../components/SvgIcons";
import AppBadge from "../../components/common/AppBadges";
import { OverlayPanel } from "primereact/overlaypanel";
import { useSelector } from "react-redux";
import { getVehicleByDepots, getVehicleLastLocation, getVehicleLiveTracking } from "../../services/companyServices";
import NoDataFoundContainer from "../../components/common/NoDataFound";
import { useToast } from "../../components/common/AppToaster";
import { VEHICLE_STATUS, TRACKING_INTERVAL } from "../../constants/constants";

const Depot = ({ onBack, onVehicleSelect, onShowPlayer, selectedDepot, setVehicleLoading }) => {
  const Live_tracking_seconds = TRACKING_INTERVAL; // using constant instead of hardcoded value

  const [selectedStatus, setSelectedStatus] = useState(VEHICLE_STATUS.ALL);
  const [vehiclesData, setVehiclesData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [selectedVehicle, setSelectedVehicle] = useState([null]);

  const op = useRef(null);
  const opTemp = useRef(null);
  const [isLoading, setIsLoading] = useState(true);
  // Add tracking state to track which vehicles are being tracked
  const [trackingVehicles, setTrackingVehicles] = useState({});
  // Ref to store tracking intervals
  const trackingIntervalsRef = useRef({});
  // Add ref to track if fetch has been done
  const apiCalledRef = useRef(false);
  // Get user data from Redux store
  const user = useSelector((state) => state.auth.user);

  const { showSuccess, showError } = useToast();

  // Filter function to handle vehicle data filtering
  const getFilteredData = (data, statusFilter) => {
    if (!data || data.length === 0) return [];
    return statusFilter === VEHICLE_STATUS.ALL ? data : data.filter((item) => item?.devices[0]?.moving_status === statusFilter);
  };

  // Get count function for vehicle status counts
  const getStatusCount = (data, statusFilter) => {
    if (!data || data.length === 0) return 0;
    return statusFilter === VEHICLE_STATUS.ALL ? data.length : data.filter((item) => item.devices && item?.devices[0] && item?.devices[0]?.moving_status === statusFilter).length;
  };

  useEffect(() => {
    if (selectedStatus) {
      setFilteredData(getFilteredData(vehiclesData, selectedStatus));
    }
  }, [selectedStatus]);

  useEffect(() => {
    if (selectedDepot) {
      const fetchVehiclesByDepot = async () => {
        // Skip if we've already called the API
        if (apiCalledRef.current) return;
        apiCalledRef.current = true; // Mark that we're calling the API
        setIsLoading(true);
        try {
          const companyId = user?.company_id ? user.company_id : 1;
          if (companyId) {
            const response = await getVehicleByDepots(companyId, selectedDepot?.id, "without", true);
            if (response && response.status === "success" && response.data) {
              setVehiclesData(response.data.items);
              setFilteredData(getFilteredData(response.data.items, "All"));
            }
          }
        } catch (error) {
          apiCalledRef.current = false; // Reset in case we want to retry on error
        } finally {
          setIsLoading(false);
        }
      };
      fetchVehiclesByDepot();
    }
  }, [selectedDepot]);

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  // Function to fetch vehicle last known location
  const fetchVehicleLocation = async (vehicleId) => {
    try {
      const response = await getVehicleLastLocation(vehicleId);
      if (response && response.status === "success") {
        return response.data;
      } else {
        return null;
      }
    } catch (error) {
      return null;
    } finally {
    }
  };

  // Function to fetch live tracking data for a vehicle
  const fetchLiveTracking = async (vehicleId) => {
    try {
      const response = await getVehicleLiveTracking(vehicleId);
      if (response && response.status === "success" && response.data && response.data.length > 0) {
        // Format last location with proper structure
        const last_location = {
          lat: response.data[0].lat,
          lng: response.data[0].lng,
        };

        // Find the complete vehicle data from our vehicles list
        const vehicleData = vehiclesData.find((v) => v.id === vehicleId);
        if (vehicleData) {
          // Create a complete updated vehicle object with new location
          const updatedVehicle = {
            ...vehicleData,
            last_location: last_location,
            isLiveTrack: true,
          };

          // Update our local state
          setSelectedVehicle(updatedVehicle);

          // Pass the UPDATED vehicle object directly to parent
          onVehicleSelect(updatedVehicle);
          return response.data;
        }
      } else {
        // No valid data - show message and stop tracking immediately
        showError("Live tracking not available");
        stopTrackingForVehicle(vehicleId);
      }
    } catch (error) {
      stopTrackingForVehicle(vehicleId);
    }
    return null;
  };

  const handleVehicleClick = async (vehicle) => {
    setVehicleLoading(true);
    setSelectedVehicle(vehicle);
    stopTrackingForVehicle(); // Stop tracking for all vehicles
    try {
      const vehicle_last_location = await fetchVehicleLocation(vehicle.id);
      if (vehicle_last_location) {
        vehicle.last_location = vehicle_last_location;
        vehicle.vehicleType = "bus"; // TODO
      }
      onVehicleSelect(vehicle);
    } catch (error) {
    } finally {
      setVehicleLoading(false);
    }
  };

  const handleBackClick = () => {
    setSelectedVehicle(null);
    stopTrackingForVehicle(); // Stop tracking for all vehicles
    onBack();
  };

  // Helper function to conditionally add mouse event handlers - fixed to ensure tooltip shows
  const getMouseHandlers = (dataIsMissing) => {
    // Only add handlers if data is missing (shows N/A)
    if (dataIsMissing) {
      return {
        onMouseEnter: (e) => {
          e.stopPropagation(); // Prevent event bubbling
          opTemp.current.show(e);
        },
        onMouseLeave: (e) => {
          e.stopPropagation(); // Prevent event bubbling
          setTimeout(() => {
            if (opTemp.current) {
              opTemp.current.hide(e);
            }
          }, 200);
        },
      };
    }
    return {}; // Return empty object if data exists
  };

  // Helper function to properly stop tracking for a specific vehicle or all vehicles
  const stopTrackingForVehicle = (vehicleId = null) => {
    if (vehicleId) {
      // Stop tracking for a specific vehicle
      if (trackingIntervalsRef.current[vehicleId]) {
        clearInterval(trackingIntervalsRef.current[vehicleId]);
        delete trackingIntervalsRef.current[vehicleId];

        // Update tracking state for this vehicle
        setTrackingVehicles((prev) => ({
          ...prev,
          [vehicleId]: false,
        }));

        console.log(`Stopped tracking vehicle ${vehicleId}`);
      }
    } else {
      // No vehicle ID provided - stop all tracking
      stopAllTracking();
    }
  };

  // Add a dedicated function to stop and reset all vehicle tracking
  const stopAllTracking = () => {
    // Stop all active tracking intervals
    Object.keys(trackingIntervalsRef.current).forEach((id) => {
      clearInterval(trackingIntervalsRef.current[id]);
    });
    // Reset the tracking intervals object
    trackingIntervalsRef.current = {};
    // Reset tracking state for all vehicles
    setTrackingVehicles({});
    // Reset previous location tracking
    if (selectedVehicle && selectedVehicle.isLiveTrack) {
      // Update vehicle state to remove live tracking flag
      setSelectedVehicle((prev) => ({
        ...prev,
        isLiveTrack: false,
      }));
      // Notify parent component about the change
      onVehicleSelect({
        ...selectedVehicle,
        isLiveTrack: false,
      });
    }

    console.log("All vehicle tracking stopped and reset");
  };

  // Update toggle tracking function to handle errors better
  const toggleTracking = (vehicleId, e) => {
    e.stopPropagation(); // Prevent triggering the parent div's onClick
    const isCurrentlyTracking = trackingVehicles[vehicleId];

    // Update tracking state
    setTrackingVehicles((prev) => ({
      ...prev,
      [vehicleId]: !prev[vehicleId],
    }));

    if (!isCurrentlyTracking) {
      // Clear any existing interval first just to be safe
      if (trackingIntervalsRef.current[vehicleId]) {
        clearInterval(trackingIntervalsRef.current[vehicleId]);
      }

      // Start tracking - fetch initially then set interval
      fetchLiveTracking(vehicleId);

      // Set interval to fetch location every 15 seconds
      const intervalId = setInterval(() => {
        fetchLiveTracking(vehicleId);
      }, Live_tracking_seconds);

      // Store the interval ID
      trackingIntervalsRef.current[vehicleId] = intervalId;
      console.log(`Started tracking vehicle ${vehicleId}`);
    } else {
      stopTrackingForVehicle(vehicleId);
    }
  };

  // Clean up by calling stopTrackingForVehicle without parameter to stop all tracking
  useEffect(() => {
    return () => {
      stopAllTracking(); // Stop all tracking on unmount
    };
  }, []);

  return (
    <div className="p-[1px]">
      <div key="depot" className="animate-slideIn">
        <h1 className="text-xl font-semibold text-text1 gap-1 flex">
          <button className="btn btn-sm btn-icon !shadow-none" onClick={handleBackClick}>
            <ChevronLeftIcon className="h-5 w-5" />
          </button>
          {selectedDepot.name ? selectedDepot.name : "Depot name"}
        </h1>
        <div className="flex items-center gap-2 mt-3">
          <div className="searchInputField w-full">
            <input name="search" type="text" placeholder="Vehicle Number" />
            <MagnifyingGlassIcon aria-hidden="true" className="icon" />
          </div>
          <button className="btn btn-icon text-center !py-[10px] !px-3 bg-cardBackground !shadow-none">
            <FilterIcon className="h-10 w-10 mt-1 text-text2" />
          </button>
          <button className="btn btn-icon text-center !py-[10px] !px-3 bg-cardBackground !shadow-none">
            <WarningIcon className="h-5 w-5 mt-1 text-text4" />
          </button>
        </div>
        <div className="flex gap-x-2 mt-3 w-full">
          <button className={`status-button status-all ${selectedStatus === VEHICLE_STATUS.ALL ? "active" : ""}`} onClick={() => setSelectedStatus(VEHICLE_STATUS.ALL)}>
            {VEHICLE_STATUS.ALL}
            <span className={`status-count ${selectedStatus === VEHICLE_STATUS.ALL ? "active" : ""}`}>{getStatusCount(vehiclesData, VEHICLE_STATUS.ALL)}</span>
          </button>
          <button className={`status-button status-running ${selectedStatus === VEHICLE_STATUS.RUNNING ? "active" : ""}`} onClick={() => setSelectedStatus(VEHICLE_STATUS.RUNNING)}>
            {VEHICLE_STATUS.RUNNING} <span className={`status-count ${selectedStatus === VEHICLE_STATUS.RUNNING ? "active" : ""}`}>{getStatusCount(vehiclesData, VEHICLE_STATUS.RUNNING)}</span>
          </button>
          <button className={`status-button status-idling ${selectedStatus === VEHICLE_STATUS.IDLING ? "active" : ""}`} onClick={() => setSelectedStatus(VEHICLE_STATUS.IDLING)}>
            {VEHICLE_STATUS.IDLING} <span className={`status-count ${selectedStatus === VEHICLE_STATUS.IDLING ? "active" : ""}`}>{getStatusCount(vehiclesData, VEHICLE_STATUS.IDLING)}</span>
          </button>
          <button className={`status-button status-parked ${selectedStatus === VEHICLE_STATUS.PARKED ? "active" : ""}`} onClick={() => setSelectedStatus(VEHICLE_STATUS.PARKED)}>
            {VEHICLE_STATUS.PARKED} <span className={`status-count ${selectedStatus === VEHICLE_STATUS.PARKED ? "active" : ""}`}>{getStatusCount(vehiclesData, VEHICLE_STATUS.PARKED)}</span>
          </button>
        </div>

        <div className="mt-4 space-y-3">
          {isLoading ? (
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
                className={`p-4 cursor-pointer border border-border rounded-lg hover:ring-1 hover:ring-primary shadow-sm bg-cardBackground ${
                  selectedVehicle?.id === item.id ? "ring-[1px] !shadow-xl ring-primary" : ""
                }`}
                onClick={() => handleVehicleClick(item)}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-x-1">
                    <img src={require("../../assets/images/icons/fleet_lcon.svg").default} alt="Region" className="w-6 h-6 mr-2 rounded-full" />
                    <h2 className="font-bold text-text1 text-sm">{item.registration_number}</h2>
                    <WarningIcon className="ms-1 w-4 h-[15px] text-themeRed fill-none mt-[0.5px] hidden" />
                  </div>
                  <div className="flex items-center gap-x-2">
                    <NavigationMarker className="w-6 h-6 text-text5 fill-none" />
                    <CameraVideo className="w-6 h-6 text-text5 fill-none" />
                    <SignalMediumGreen className="w-6 h-6 text-text5 fill-none" />
                    <AppBadge
                      text={item?.devices[0]?.moving_status}
                      color={
                        item?.devices[0]?.moving_status === VEHICLE_STATUS.RUNNING
                          ? "green"
                          : item?.devices[0]?.moving_status === VEHICLE_STATUS.IDLING
                          ? "yellow"
                          : item?.devices[0]?.moving_status === VEHICLE_STATUS.PARKED
                          ? "red"
                          : "gray"
                      }
                      className="!rounded-full !font-bold"
                    />
                  </div>
                </div>
                <div className="flex flex-col bg-muted2 gap-y-2 p-2 rounded-md">
                  <div className="flex gap-x-2">
                    <p
                      className="flex whitespace-nowrap gap-x-1 text-[13px] rounded-md text-text4 bg-cardBackground px-2 py-1 w-full justify-start items-center cursor-help"
                      {...getMouseHandlers(item.km === undefined || item.km === null || item.km === "")}
                    >
                      <FleetSpeed className="fill-none" />
                      {item.km ? item.km : <span className="na">00000 KMS</span>}
                    </p>
                    <p
                      className="flex whitespace-nowrap gap-x-1 text-[13px] rounded-md text-text4 bg-cardBackground px-2 py-1 w-full justify-start items-start cursor-help"
                      {...getMouseHandlers(item.km === undefined || item.km === null || item.km === "")}
                    >
                      <FleetFuel className="fill-none" />
                      {item.km ? item.km : <span className="na">000 L</span>}
                    </p>
                    <p
                      className="flex whitespace-nowrap gap-x-1 text-[13px] rounded-md text-text4 bg-cardBackground px-2 py-1 w-full justify-start items-start cursor-help"
                      {...getMouseHandlers(item.km === undefined || item.km === null || item.km === "")}
                    >
                      <FleetLeaf className="fill-none" />
                      {item.km ? item.km : <span className="na">00 KMPL</span>}
                    </p>
                  </div>
                  <div className="flex gap-x-2">
                    <p
                      className="flex whitespace-nowrap gap-x-1 text-[13px] rounded-md text-text4 bg-cardBackground px-2 py-1 w-full justify-start items-start cursor-help"
                      {...getMouseHandlers(item.km === undefined || item.km === null || item.km === "")}
                    >
                      <FleetWay className="fill-none" />
                      {item.km ? item.km : <span className="na">N/A</span>}
                    </p>
                    <p
                      className="flex whitespace-nowrap gap-x-1 text-[13px] rounded-md text-text4 bg-cardBackground px-2 py-1 w-full justify-start items-start cursor-help"
                      {...getMouseHandlers(item.km === undefined || item.km === null || item.km === "")}
                    >
                      <FleetDistance className="fill-none" />
                      {item.km ? item.km : <span className="na">00 KMS</span>}
                    </p>
                    <p
                      className="flex whitespace-nowrap gap-x-1 text-[13px] rounded-md text-text4 bg-cardBackground px-2 py-1 w-full justify-start items-start cursor-help"
                      {...getMouseHandlers(item.km === undefined || item.km === null || item.km === "")}
                    >
                      <FleetKmph className="fill-none" />
                      {item.km ? item.km : <span className="na">000 KmPh</span>}
                    </p>
                    <p
                      className="flex whitespace-nowrap gap-x-1 text-[13px] rounded-md text-text4 bg-cardBackground px-2 py-1 w-full cursor-help"
                      {...getMouseHandlers(item.km === undefined || item.km === null || item.km === "")}
                    >
                      <FleetTemp className="fill-none" />
                      {item.km ? item.km : <span className="na">0 Deg C</span>}
                    </p>
                  </div>
                </div>

                <OverlayPanel ref={opTemp} appendTo={document.body} className="bg-primary text-themeWhite hidden">
                  <p className="text-themeYellow">
                    <a href="https://driif.ai/login" target="_blank" rel="noopener noreferrer" className="underline font-semibold cursor-pointer">
                      Contact us
                    </a>{" "}
                    for purchasing this device.
                  </p>
                </OverlayPanel>

                {selectedVehicle?.id === item.id && (
                  <div className="flex gap-4 mt-2 w-full">
                    <button
                      className={`flex w-full items-center gap-1 px-4 py-2 font-bold text-[13px] rounded-md justify-center ${
                        trackingVehicles[item.id] ? "bg-themeRed text-themeWhite hover:bg-red-600" : "bg-muted1 text-primary hover:bg-primary hover:text-themeWhite"
                      }`}
                      onClick={(e) => toggleTracking(item.id, e)}
                    >
                      <NavigationMarker className="!w-6 !h-6 fill-none" />
                      {trackingVehicles[item.id] ? "Stop Tracking" : "Track"}
                    </button>
                    <button
                      className="flex w-full items-center gap-1 px-4 py-2 text-[13px] rounded-md font-bold justify-center bg-muted1 text-primary hover:bg-primary hover:text-themeWhite"
                      onClick={onShowPlayer} // Handle click to show player
                    >
                      <CameraVideo className="!w-6 !h-6 fill-none me-1 mt-[-1px]" /> Live Stream
                    </button>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
        {
          // Show no data found if no vehicles are available
          vehiclesData.length === 0 && !isLoading && (
            <div className="mt-[60px]">
              <NoDataFoundContainer title="No Vehicles Found !" description="Try changing your filters to see vehicles" />
            </div>
          )
        }
      </div>
    </div>
  );
};

export default Depot;
