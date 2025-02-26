import React, { useState } from "react";
import Region from "./Region";
import Map from "./Map";
import Depot from "./Depot";
import { regionData } from "../../data/sampleData";

const Fleet = () => {
  const [selectedRegion, setSelectedRegion] = useState(null);
  const [selectedDepot, setSelectedDepot] = useState(null);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [showDepot, setShowDepot] = useState(false);
  const [isPlayerVisible, setIsPlayerVisible] = useState(false); // Add state for player visibility

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
          <Region
            regions={regionData}
            onRegionSelect={handleRegionSelect}
            onDepotSelect={handleDepotSelect}
            selectedRegion={selectedRegion}
          />
        ) : (
          <Depot
            onBack={handleBack}
            onVehicleSelect={handleVehicleSelect}
            onShowPlayer={() => setIsPlayerVisible(true)} // Pass function to show player
          />
        )}
      </div>
      <div className="w-full md:w-4/6 flex-grow bg-[#b5d4e2] mt-[-15px] mr-[-15px] h-full">
        <Map
          selectedRegion={selectedRegion}
          selectedDepot={selectedDepot}
          selectedVehicle={selectedVehicle}
          regions={regionData}
          isPlayerVisible={isPlayerVisible} // Pass player visibility state
          onClosePlayer={() => setIsPlayerVisible(false)} // Pass function to hide player
        />
      </div>
    </div>
  );
};

export default Fleet;
