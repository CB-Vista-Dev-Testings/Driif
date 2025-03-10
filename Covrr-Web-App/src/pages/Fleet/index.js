import React, { useState, useEffect, useRef } from "react";
import Region from "./Region";
import Map from "./Map";
import Depot from "./Depot";
import { useSelector } from "react-redux";
import { regionData } from "../../data/sampleData";
import { getRegionsByCompanyId } from "../../services/companyServices";

const Fleet = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [selectedRegion, setSelectedRegion] = useState(null);
  const [selectedDepot, setSelectedDepot] = useState(null);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [showDepot, setShowDepot] = useState(false);
  const [isPlayerVisible, setIsPlayerVisible] = useState(false);
  const [regions, setRegionss] = useState([]);
  // Add vehicle loading state
  const [isVehicleLoading, setIsVehicleLoading] = useState(false);

  // Add ref to track if fetch has been done
  const apiCalledRef = useRef(false);

  // Get user data from Redux store
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    const fetchRegions = async () => {
      // Skip if we've already called the API
      if (apiCalledRef.current) return;
      apiCalledRef.current = true; // Mark that we're calling the API
      setIsLoading(true);
      try {
        const companyId = user?.company_id ? user.company_id : 1;
        if (companyId) {
          const response = await getRegionsByCompanyId(companyId, true);
          if (response && response.status === "success" && response.data) {
            setRegionss(response.data);
          }
        }
      } catch (error) {
        apiCalledRef.current = false; // Reset in case we want to retry on error
      } finally {
        setIsLoading(false);
      }
    };
    fetchRegions();
  }, []); // Empty dependency array since company won't change during session

  const handleRegionSelect = (selection) => {
    setSelectedRegion(selection);
    setSelectedDepot(null);
    setShowDepot(false);
  };

  const handleDepotSelect = (depot) => {
    setSelectedDepot(depot);
    setShowDepot(true);
  };

  const handleVehicleSelect = (vehicle) => {
    setSelectedVehicle(vehicle);
  };

  const handleBack = () => {
    setShowDepot(false);
    setSelectedDepot(null);
    setSelectedVehicle(null); // Reset selectedVehicle to remove polyline
  };

  return (
    <div className="flex w-full">
      <div className="min-w-[480px] max-w-fit max-h-[88vh] overflow-auto theme-scrollbar pe-4 overflow-x-hidden">
        {!showDepot ? (
          <Region isLoading={isLoading} regions={regions} onRegionSelect={handleRegionSelect} onDepotSelect={handleDepotSelect} selectedRegion={selectedRegion} />
        ) : (
          <Depot
            onBack={handleBack}
            selectedDepot={selectedDepot}
            onVehicleSelect={handleVehicleSelect}
            onShowPlayer={() => setIsPlayerVisible(true)} // Pass function to show player
            setVehicleLoading={setIsVehicleLoading} // Pass the loading state setter
          />
        )}
      </div>
      <div className="w-full md:w-4/6 flex-grow bg-[#b5d4e2] mt-[-15px] mr-[-15px] h-full">
        <Map
          selectedRegion={selectedRegion}
          selectedDepot={selectedDepot}
          selectedVehicle={selectedVehicle}
          isMapLoading={isVehicleLoading}
          regions={regions}
          isPlayerVisible={isPlayerVisible} // Pass player visibility state
          onClosePlayer={() => setIsPlayerVisible(false)} // Pass function to hide player
        />
      </div>
    </div>
  );
};

export default Fleet;
