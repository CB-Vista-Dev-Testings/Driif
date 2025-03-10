import React, { useEffect, useRef, useState } from "react";
import { GoogleMap, Marker, Polyline, useJsApiLoader } from "@react-google-maps/api";
import { useTheme } from "../../context/ThemeContext";
import {
  lightThemeOptions,
  darkThemeOptions,
  mapContainerStyle,
  fullScreenMapContainerStyle,
  defaultCenter,
  depotIcon,
  getVehicleIconByType,
  replayPolylineOptions,
  mapLibraries,
  googleMapsApiKey,
  mapFilterOptions,
  defaultFilterState,
} from "../../config/mapOptions";
import FleetInfoMain from "./FleetInfo/Index";
import LiveStreamPlayer from "./FleetLiveStream";
import { ArrowsPointingOutIcon, ArrowsPointingInIcon } from "@heroicons/react/24/outline";
import { FilterIcon } from "../../components/SvgIcons";
import { Menu, MenuButton, MenuItems } from "@headlessui/react";
import CustomMarker from "./CustomMarker";
import Loader from "../../components/Loader";
import ReplayMap from "./ReplayMap";
import FleetVideos from "./FleetInfo/FleetVideos";

// Utility function to validate coordinates
const isValidCoordinate = (coord) => {
  if (!coord) return false;
  const { lat, lng } = coord;
  return typeof lat === "number" && typeof lng === "number" && !isNaN(lat) && !isNaN(lng) && isFinite(lat) && isFinite(lng) && lat >= -90 && lat <= 90 && lng >= -180 && lng <= 180;
};

const Map = ({ selectedRegion, selectedDepot, selectedVehicle, regions, isPlayerVisible, onClosePlayer, isMapLoading }) => {
  const { isDarkMode } = useTheme();
  const mapOptions = isDarkMode ? darkThemeOptions : lightThemeOptions;
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey,
    libraries: mapLibraries,
  });

  const [vehicleIcon, setVehicleIcon] = useState({});
  const mapRef = useRef(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [showReplayMap, setShowReplayMap] = useState(false);
  const tripData = useRef(null);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState(defaultFilterState);

  // Live tracking state
  const [liveTrackingPath, setLiveTrackingPath] = useState([]);
  const initialLocationRef = useRef(null);
  const previousLocationRef = useRef(null);
  const [vehicleHeading, setVehicleHeading] = useState(0);

  // Add a ref for FleetVideos that can be shared with ReplayMap
  const fleetVideosRef = useRef(null);

  useEffect(() => {
    //TODO
    // if (selectedRegion && mapLoaded) {
    //   fitBoundsToRegion(selectedRegion);
    //   setTimeout(() => {
    //     // panAndZoom(mapRef.current, { lat: selectedRegion.lat, lng: selectedRegion.lng }, 11);
    //   }, 100);
    // }
  }, [selectedRegion, mapLoaded]);

  useEffect(() => {
    //TODO
    if (mapRef.current && selectedDepot && mapLoaded) {
      // const targetLatLng = { lat: selectedDepot.lat, lng: selectedDepot.lng };
      // panAndZoom(mapRef.current, targetLatLng, 14);
    } else if (!selectedDepot && mapLoaded && selectedRegion) {
      // fitBoundsToRegion(selectedRegion);
      setShowReplayMap(false);
    }
  }, [selectedDepot, mapLoaded]);

  useEffect(() => {
    // TODO
    // if (mapRef.current && selectedVehicle && mapLoaded) {
    //   setShowReplayMap(false);
    //   const targetLatLng = {
    //     lat: selectedVehicle.trip.vehiclePosition.lat,
    //     lng: selectedVehicle.trip.vehiclePosition.lng,
    //   };
    //   panAndZoom(mapRef.current, targetLatLng, 14);
    //   setTimeout(() => {
    //     refreshMap();
    //   }, 100);
    // } else if (!selectedVehicle && mapLoaded && selectedRegion) {
    //   setTimeout(() => {
    //     panAndZoom(mapRef.current, { lat: selectedRegion?.lat, lng: selectedRegion?.lng }, 11);
    //   }, 500);
    // }
  }, [selectedVehicle, mapLoaded]);

  useEffect(() => {
    if (selectedVehicle) {
      const newIcon = getVehicleIconByType(selectedVehicle.vehicleType, isDarkMode);
      if (window.google && window.google.maps) {
        newIcon.anchor = new window.google.maps.Point(10, 19);
      }
      setVehicleIcon(newIcon);
    }
  }, [selectedVehicle, isDarkMode]);

  const smoothPanTo = (map, targetLatLng, duration = 1000) => {
    if (!isValidCoordinate(targetLatLng)) {
      console.error("Invalid coordinates for map panning:", targetLatLng);
      return;
    }
    const startLatLng = map.getCenter();
    const startTime = performance.now();
    const animate = (currentTime) => {
      const elapsedTime = currentTime - startTime;
      const progress = Math.min(elapsedTime / duration, 1);
      const lat = startLatLng.lat() + (targetLatLng.lat - startLatLng.lat()) * progress;
      const lng = startLatLng.lng() + (targetLatLng.lng - startLatLng.lng()) * progress;
      map.panTo({ lat, lng });
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    requestAnimationFrame(animate);
  };

  const refreshMap = () => {
    if (mapRef.current) {
      const center = mapRef.current.getCenter();
      const zoom = mapRef.current.getZoom();
      mapRef.current.panTo({ lat: center.lat(), lng: center.lng() });
      mapRef.current.setZoom(zoom);
    }
  };

  const panAndZoom = (map, targetLatLng, targetZoom) => {
    if (!isValidCoordinate(targetLatLng)) {
      console.error("Invalid coordinates for map panning:", targetLatLng);
      return;
    }

    smoothPanTo(map, targetLatLng);
    const zoomInterval = setInterval(() => {
      const currentZoom = map.getZoom();
      if (currentZoom < targetZoom) {
        map.setZoom(currentZoom + 1);
      } else {
        clearInterval(zoomInterval);
      }
    }, 200);
  };

  const fitBoundsToRegion = (region) => {
    const bounds = new window.google.maps.LatLngBounds();
    if (region.depots) {
      region.depots.forEach((depot) => {
        bounds.extend(new window.google.maps.LatLng(depot.lat, depot.lng));
      });
    } else {
      bounds.extend(new window.google.maps.LatLng(region.lat, region.lng));
    }
    mapRef.current.fitBounds(bounds);
  };

  // Handle vehicle selection
  useEffect(() => {
    if (mapRef.current && selectedVehicle && mapLoaded) {
      setShowReplayMap(false);

      if (selectedVehicle?.last_location && isValidCoordinate(selectedVehicle.last_location)) {
        const targetLatLng = {
          lat: selectedVehicle?.last_location?.lat,
          lng: selectedVehicle.last_location?.lng,
        };

        panAndZoom(mapRef.current, targetLatLng, 14);
        setTimeout(() => {
          refreshMap();
        }, 100);
      } else {
        console.warn("Invalid or missing coordinates for vehicle:", selectedVehicle?.id);
      }
    } else if (!selectedVehicle && mapLoaded && selectedRegion) {
      if (selectedRegion && isValidCoordinate(selectedRegion)) {
        setTimeout(() => {
          panAndZoom(mapRef.current, { lat: selectedRegion?.lat, lng: selectedRegion?.lng }, 11);
        }, 500);
      }
    }
  }, [selectedVehicle, mapLoaded]);

  // Calculate bearing between two points
  const calculateBearing = (startLat, startLng, destLat, destLng) => {
    if (
      !window.google?.maps?.geometry?.spherical ||
      !isFinite(startLat) ||
      isNaN(startLat) ||
      !isFinite(startLng) ||
      isNaN(startLng) ||
      !isFinite(destLat) ||
      isNaN(destLat) ||
      !isFinite(destLng) ||
      isNaN(destLng)
    ) {
      return 0;
    }

    const start = new window.google.maps.LatLng(startLat, startLng);
    const dest = new window.google.maps.LatLng(destLat, destLng);
    return window.google.maps.geometry.spherical.computeHeading(start, dest);
  };

  // Update vehicle heading when location changes
  useEffect(() => {
    if (selectedVehicle?.last_location && previousLocationRef.current) {
      const prevLoc = previousLocationRef.current;
      const currLoc = selectedVehicle.last_location;

      if (isValidCoordinate(prevLoc) && isValidCoordinate(currLoc) && (prevLoc.lat !== currLoc.lat || prevLoc.lng !== currLoc.lng)) {
        const heading = calculateBearing(prevLoc.lat, prevLoc.lng, currLoc.lat, currLoc.lng);
        setVehicleHeading(heading);
      }
    }

    if (selectedVehicle?.last_location && isValidCoordinate(selectedVehicle.last_location)) {
      previousLocationRef.current = { ...selectedVehicle.last_location };
    }
  }, [selectedVehicle?.last_location]);

  // Update live tracking path
  useEffect(() => {
    if (selectedVehicle?.last_location && isValidCoordinate(selectedVehicle.last_location)) {
      if (!initialLocationRef.current && selectedVehicle.isLiveTrack) {
        initialLocationRef.current = { ...selectedVehicle.last_location };
        setLiveTrackingPath([selectedVehicle.last_location]);
      } else if (selectedVehicle.isLiveTrack) {
        setLiveTrackingPath((prevPath) => {
          const lastPoint = prevPath[prevPath.length - 1];
          if (lastPoint && lastPoint.lat === selectedVehicle.last_location.lat && lastPoint.lng === selectedVehicle.last_location.lng) {
            return prevPath;
          }
          return [...prevPath, selectedVehicle.last_location];
        });
      } else {
        initialLocationRef.current = null;
        setLiveTrackingPath([]);
      }
    }
  }, [selectedVehicle?.last_location]);

  // Clear path when switching vehicles
  useEffect(() => {
    initialLocationRef.current = selectedVehicle?.last_location && isValidCoordinate(selectedVehicle.last_location) ? { ...selectedVehicle.last_location } : null;

    setLiveTrackingPath(selectedVehicle?.last_location && isValidCoordinate(selectedVehicle.last_location) ? [selectedVehicle.last_location] : []);
  }, [selectedVehicle?.id]);

  // Handle trip replay
  const handleTripReplay = (rowData) => {
    tripData.current = rowData;
    setShowReplayMap(true);
  };

  // Functions for alert interactions that may be needed by FleetVideos
  const handleAlertClick = (alert) => {
    if (fleetVideosRef.current && alert.videoId) {
      fleetVideosRef.current.scrollToVideo(alert.videoId);
    }
  };

  const handleAlertHover = (alert) => {
    if (fleetVideosRef.current && alert.videoId) {
      fleetVideosRef.current.scrollToVideo(alert.videoId);
    }
  };

  const clearVideoFocus = () => {
    if (fleetVideosRef.current) {
      fleetVideosRef.current.clearFocus();
    }
  };

  // Full screen toggle
  const toggleFullScreen = () => {
    const mapElement = document.getElementById("map-container");
    if (!document.fullscreenElement) {
      mapElement.requestFullscreen().catch((err) => {
        alert(`Error attempting to enable full-screen mode: ${err.message} (${err.name})`);
      });
    } else {
      document.exitFullscreen();
    }
    setIsFullScreen(!isFullScreen);
  };

  // Filter change handler
  const handleFilterChange = (filter) => {
    setSelectedFilters((prevFilters) => ({
      ...prevFilters,
      [filter]: !prevFilters[filter],
    }));
  };

  if (!isLoaded) {
    return <div className="text-center m-auto h-[88vh] flex items-center justify-center">Loading map...</div>;
  }

  const getMarkerLabel = (region) => {
    return region.depots.length.toString();
  };

  return (
    <div id="map-container" className={`flex w-full h-full relative ${isFullScreen ? "fixed inset-0 z-50 bg-white" : ""}`}>
      {isMapLoading && <Loader fullscreen={false} />}

      {/* Map Controls */}
      <div className="flex gap-x-4 absolute top-4 right-4 z-10">
        {/* Filter menu */}
        <Menu as="div" className="relative">
          <MenuButton className="bg-themeWhite w-[45px] h-[45px] rounded-full flex items-center justify-center shadow-[0px_0px_7px_7px_rgba(0,0,0,0.1)] border border-primary/30 cursor-pointer">
            <FilterIcon className="text-themeBlack mt-2 ps-[0.5px]" />
          </MenuButton>
          <MenuItems
            transition
            className="absolute right-0 rounded-lg flex flex-col gap-y-3 z-10 mt-2.5 w-[200px] origin-top-right bg-cardBackground p-3 shadow-lg ring-1 ring-gray-900/5 transition focus:outline-none"
          >
            <div className="flex gap-y-4 flex-col justify-between items-center">
              {mapFilterOptions.map((option) => (
                <label key={option.id} className="cursor-pointer text-sm text-text2 flex justify-between w-full">
                  {option.label}
                  <input type="checkbox" className="w-5 h-5" checked={selectedFilters[option.id]} onChange={() => handleFilterChange(option.id)} />
                </label>
              ))}
            </div>
            <button className="btn btn-primary btn-md mt-2">Apply</button>
          </MenuItems>
        </Menu>

        {/* Full screen toggle */}
        <div
          className="bg-themeWhite w-[45px] h-[45px] rounded-full flex items-center justify-center shadow-[0px_0px_7px_7px_rgba(0,0,0,0.1)] border border-primary/30 cursor-pointer"
          onClick={toggleFullScreen}
        >
          <ArrowsPointingOutIcon className={`h-5 w-5 text-themeBlack ${isFullScreen ? "hidden" : "block"}`} />
          <ArrowsPointingInIcon className={`h-5 w-5 text-themeBlack ${isFullScreen ? "block" : "hidden"}`} />
        </div>
      </div>

      <div className="w-full relative">
        {/* Live stream player */}
        {isPlayerVisible && (
          <div className="bg-black/80 backdrop-blur-sm flex justify-top items-top absolute z-10 w-full h-full pt-10">
            <LiveStreamPlayer width="85%" height="50%" onClose={onClosePlayer} />
          </div>
        )}

        {/* Standard Map View */}
        {!showReplayMap && (
          <GoogleMap
            mapContainerStyle={isFullScreen ? fullScreenMapContainerStyle : mapContainerStyle}
            mapContainerClassName="mapContainerClass"
            zoom={5}
            center={defaultCenter}
            options={mapOptions}
            onLoad={(mapInstance) => {
              mapRef.current = mapInstance;
              setMapLoaded(true);
              if (selectedVehicle && selectedVehicle?.last_location) {
                panAndZoom(
                  mapInstance,
                  {
                    lat: selectedVehicle?.last_location?.lat,
                    lng: selectedVehicle?.last_location?.lng,
                  },
                  16
                );
              } else {
                smoothPanTo(mapInstance, defaultCenter);
                mapInstance.setZoom(5);
              }
            }}
          >
            {/* Draw live tracking polyline when in tracking mode */}
            {selectedVehicle?.isLiveTrack && liveTrackingPath.length > 1 && <Polyline path={liveTrackingPath} options={replayPolylineOptions} />}

            {/* Vehicle, Depot or Region markers */}
            {selectedVehicle && selectedVehicle?.last_location && isValidCoordinate(selectedVehicle.last_location) ? (
              <CustomMarker
                position={{
                  lat: selectedVehicle?.last_location?.lat,
                  lng: selectedVehicle?.last_location?.lng,
                }}
                icon={vehicleIcon}
                rotation={vehicleHeading}
              />
            ) : mapLoaded && selectedRegion ? (
              selectedDepot && !selectedVehicle && isValidCoordinate(selectedDepot) ? (
                <Marker
                  position={{ lat: selectedDepot.lat, lng: selectedDepot.lng }}
                  label={{
                    text: selectedDepot?.fleets ? selectedDepot?.fleets.toString() : "",
                    color: "white",
                  }}
                  icon={depotIcon}
                />
              ) : selectedRegion?.depots && !selectedDepot ? (
                selectedRegion.depots
                  .filter((depot) => isValidCoordinate(depot))
                  .map((depot, depotIndex) => (
                    <Marker key={depotIndex} position={{ lat: depot?.lat, lng: depot?.lng }} label={{ text: depot?.fleets ? depot?.fleets.toString() : "", color: "white" }} icon={depotIcon} />
                  ))
              ) : null
            ) : (
              regions
                .filter((region) => isValidCoordinate(region))
                .map((region, index) => <Marker key={index} position={{ lat: region?.lat, lng: region?.lng }} label={{ text: getMarkerLabel(region), color: "white" }} icon={depotIcon} />)
            )}
          </GoogleMap>
        )}

        {/* Replay Map View */}
        {selectedVehicle && showReplayMap && tripData.current && (
          <ReplayMap
            tripData={tripData.current}
            vehicleIcon={vehicleIcon}
            isFullScreen={isFullScreen}
            fleetVideosRef={fleetVideosRef} // Pass the ref to ReplayMap
            onAlertClick={handleAlertClick}
            onAlertHover={handleAlertHover}
            onAlertMouseOut={clearVideoFocus}
          />
        )}

        {/* Vehicle Info Panel - Always show when vehicle is selected, regardless of map mode */}
        {selectedVehicle && (
          <div className="absolute w-[96.5%] bottom-0 mx-auto left-0 right-0">
            {showReplayMap && tripData.current && (
              <FleetVideos
                ref={fleetVideosRef}
                tripData={tripData.current}
                // Add any other props that FleetVideos might need
                vehicleId={selectedVehicle.id}
              />
            )}
            <div className="mt-[-60px]"></div>
            <FleetInfoMain onTripReplay={handleTripReplay} vehicleData={selectedVehicle} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Map;
