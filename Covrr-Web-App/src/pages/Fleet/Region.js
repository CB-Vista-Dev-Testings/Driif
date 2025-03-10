import React, { useState, useEffect } from "react";
import { MagnifyingGlassIcon, ChevronRightIcon } from "@heroicons/react/16/solid";
import { FleetIcon, DriverIcon } from "../../components/SvgIcons";
import NoDataFoundContainer from "../../components/common/NoDataFound";

const Region = ({ regions, onRegionSelect, onDepotSelect, selectedRegion, isLoading }) => {
  const [expandedIndex, setExpandedIndex] = useState(null);

  useEffect(() => {
    if (selectedRegion) {
      const index = regions.findIndex((region) => region.name === selectedRegion.name);
      setExpandedIndex(index);
    }
  }, [selectedRegion, regions]);

  const handleCardClick = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
    onRegionSelect(regions[index]);
  };

  const handleDepotSelect = (depot) => {
    onDepotSelect(depot);
  };

  return (
    <div className="p-[1px]">
      <div key="region" className="animate-slideIn">
        <h2 className="text-2xl font-semibold mb-4 text-text1">Regions</h2>
        <div className="mb-4">
          <div className="mt-2 searchInputField">
            <input name="search" type="text" placeholder="Region" />
            <MagnifyingGlassIcon aria-hidden="true" className="icon" />
          </div>
        </div>
        {isLoading ? (
          <div className="animate-pulse">
            {[...Array(4)].map((_, index) => (
              <div key={index} className="w-full bg-cardBackground rounded-lg shadow mb-4 p-4">
                <div className="flex rounded w-3/4 mb-2 items-center gap-x-2">
                  <div className="bg-muted2 rounded-full h-[46px] w-[46px]"></div>
                  <div className="h-6 bg-muted2 rounded w-60"></div>
                </div>
                <div className="flex mt-4 rounded mb-2 items-center w-full gap-x-2">
                  <div className="h-10 bg-muted2 rounded w-full"></div>
                  <div className="h-10 bg-muted2 rounded w-full"></div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          regions.map((region, index) => (
            <div
              key={index}
              className={`bg-cardBackground hover:ring-1 hover:ring-primary rounded-lg shadow mb-4 cursor-pointer transition-all duration-300 ${
                expandedIndex === index ? "max-h-96 outline outline-1 outline-primary" : "max-h-[100px] overflow-hidden"
              }`}
            >
              <div onClick={() => handleCardClick(index)} className="p-4 pb-0 ">
                <div className="flex items-center mb-2">
                  <img src={require("../../assets/images/icons/fleet_lcon.svg").default} alt="Region" className="w-7 h-7 mr-2 rounded-full" />
                  <h3 className="font-semibold text-text1 text-[14px]">{region.name}</h3>
                </div>
                <div className="flex w-full gap-x-3 justify-between text-sm mt-2">
                  <div className={`p-2 flex justify-between rounded-md w-full ${expandedIndex === index ? "bg-black" : "bg-muted2 "}`}>
                    <span className={`text-sm whitespace-nowrap ${expandedIndex === index ? "text-white/80" : "text-text4"}`}>No of Depots</span>
                    <span className={`font-bold ${expandedIndex === index ? "text-white" : "text-text2"}`}>{region.depots.length}</span>
                  </div>
                  <div className={`p-2 flex justify-between rounded-md w-full ${expandedIndex === index ? "bg-black" : "bg-muted2 "}`}>
                    <span className={`text-sm whitespace-nowrap ${expandedIndex === index ? "text-white/80" : "text-text4"}`}>No of Routes</span>
                    <span className={`font-bold ${expandedIndex === index ? "text-white" : "text-text2"}`}>0</span>
                  </div>
                </div>
              </div>
              <div className={`p-4 pt-0 transition-all duration-300 ${expandedIndex === index ? "max-h-80" : "max-h-8"}`}>
                <div className="mt-4 bg-cardBackground " key={index}>
                  <div className="flex flex-col gap-y-2">
                    {region.depots.map((depot, depotIndex) => (
                      <div
                        className="flex bg-muted2 p-2 rounded-md justify-between"
                        key={depotIndex}
                        onClick={(e) => {
                          e.preventDefault();
                          handleDepotSelect(depot);
                        }}
                      >
                        <h4 className="text-text3 font-semibold text-sm tabular-nums">{depot.name}</h4>
                        <div className="flex gap-x-6 items-end justify-end">
                          <div className="flex items-center gap-x-1 w-10">
                            <FleetIcon className="size-5 text-text5 opacity-50 fill-none" />
                            <span className="text-text1 text-sm font-medium tabular-nums ">{depot?.vehicle_count ? depot?.vehicle_count : 0}</span>
                          </div>
                          <div className="flex items-center gap-x-1 w-10">
                            <DriverIcon className="size-5 text-text5 opacity-70 fill-none" />
                            <span className="text-text1q text-sm font-medium tabular-nums mt-[-1px]">{depot?.driver_count ? depot?.driver_count : 0}</span>
                          </div>
                          <ChevronRightIcon className="w-5 h-5 text-text5" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
        {
          // Show no data found if no vehicles are available
          regions.length === 0 && !isLoading && (
            <div className="mt-[60px]">
              <NoDataFoundContainer title="No Regions Found !" description="Try changing your filters to see vehicles" />
            </div>
          )
        }
      </div>
    </div>
  );
};

export default Region;
