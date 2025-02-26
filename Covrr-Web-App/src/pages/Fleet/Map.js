import React, { useEffect, useRef, useState } from "react";
import { GoogleMap, Marker, Polyline, useJsApiLoader } from "@react-google-maps/api";
import { useTheme } from "../../context/ThemeContext";
import {
  lightThemeOptions, darkThemeOptions, mapContainerStyle,
  defaultCenter, depotIcon, vehicleIcon, requiredLibraries,
  pathPolylineOptions, replayPolylineOptions, animationConfig
} from "../../config/mapOptions";
import FleetInfoMain from "./FleetInfo/Index";
import LiveStreamPlayer from "./FleetLiveStream";
import FleetVideos from "./FleetInfo/FleetVideos";

const libraries = ['geometry', 'drawing', 'places',]; // Define libraries array outside the component

const Map = ({ selectedRegion, selectedDepot, selectedVehicle, regions, isPlayerVisible, onClosePlayer }) => {
  const { isDarkMode } = useTheme();
  const mapOptions = isDarkMode ? darkThemeOptions : lightThemeOptions;
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries, // Use the predefined libraries array
  });

  const mapRef = useRef(null);
  const polylineMapRef = useRef(null);
  const polylineRef = useRef(null);
  const pathPolylineRef = useRef(null);  // Add this new ref
  const [mapLoaded, setMapLoaded] = useState(false);
  const [replayProgress, setReplayProgress] = useState([]);
  const [isReplaying, setIsReplaying] = useState(false);
  const replayInterval = useRef(null);
  const [vehicleRotation, setVehicleRotation] = useState(0);
  const initialDate = useRef(new Date());
  const [animationComplete, setAnimationComplete] = useState(false);
  const [showReplayMap, setShowReplayMap] = useState(false);
  const tripData = useRef(null);
  const replayMapInstance = useRef(null);
  const [pathKey, setPathKey] = useState(0); // Add this new state
  const [replayKey, setReplayKey] = useState(0); // Add this new state
  const animationFrameId = useRef(null);
  const lastTimestamp = useRef(null);
  const animationSpeed = 0.1; // Controls animation speed (smaller = slower)

  if (window.google && window.google.maps) {
    vehicleIcon.anchor = new window.google.maps.Point(10, 19);
  }

  const smoothPanTo = (map, targetLatLng, duration = animationConfig.panDuration) => {
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

  const fetchRoute = async (start, end) => {
    if (!window.google) return [];
    const directionsService = new window.google.maps.DirectionsService();
    const result = await directionsService.route({
      origin: start,
      destination: end,
      travelMode: window.google.maps.TravelMode.DRIVING,
    });
    return result.routes[0].overview_path.map((point) => ({
      lat: point.lat(),
      lng: point.lng(),
    }));
  };

  const refreshMap = () => {
    if (mapRef.current) {
      const center = mapRef.current.getCenter();
      const zoom = mapRef.current.getZoom();
      mapRef.current.panTo({ lat: center.lat(), lng: center.lng() });
      mapRef.current.setZoom(zoom);
    }
  };

  const removePolyline = () => {
    if (polylineRef.current) {
      polylineRef.current.setMap(null);
      polylineRef.current = null;
    }
    if (pathPolylineRef.current) {
      pathPolylineRef.current.setMap(null);
      pathPolylineRef.current = null;
    }
  };

  const panAndZoom = (map, targetLatLng, targetZoom) => {
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
      region.depots.forEach(depot => {
        bounds.extend(new window.google.maps.LatLng(depot.lat, depot.lng));
      });
    } else {
      bounds.extend(new window.google.maps.LatLng(region.lat, region.lng));
    }
    mapRef.current.fitBounds(bounds);

    const targetZoom = mapRef.current.getZoom();
    const zoomInterval = setInterval(() => {
      const currentZoom = mapRef.current.getZoom();
      if (currentZoom < targetZoom) {
        mapRef.current.setZoom(currentZoom + 1);
      } else {
        clearInterval(zoomInterval);
      }
    }, 200);
  };

  useEffect(() => {
    if (selectedRegion && mapLoaded) {
      fitBoundsToRegion(selectedRegion);
      setTimeout(() => {
        // panAndZoom(mapRef.current, { lat: selectedRegion.lat, lng: selectedRegion.lng }, 11);
      }, 100);
    }
  }, [selectedRegion, mapLoaded]);

  useEffect(() => {
    if (mapRef.current && selectedDepot && mapLoaded) {
      const targetLatLng = { lat: selectedDepot.lat, lng: selectedDepot.lng };
      panAndZoom(mapRef.current, targetLatLng, 14);
    } else if (!selectedDepot && mapLoaded && selectedRegion) {
      fitBoundsToRegion(selectedRegion);
      setShowReplayMap(false);
    }
  }, [selectedDepot, mapLoaded]);

  useEffect(() => {
    if (mapRef.current && selectedVehicle && mapLoaded) {
      console.log("Selected vehicle changed, updating map");
      setShowReplayMap(false);

      const targetLatLng = {
        lat: selectedVehicle.trip.vehiclePosition.lat,
        lng: selectedVehicle.trip.vehiclePosition.lng
      };

      panAndZoom(mapRef.current, targetLatLng, 14);

      setTimeout(() => {
        refreshMap();
      }, 100);
    } else if (!selectedVehicle && mapLoaded && selectedRegion) {
      setTimeout(() => {
        panAndZoom(mapRef.current, { lat: selectedRegion.lat, lng: selectedRegion.lng }, 11);
      }, 500);
    }
  }, [selectedVehicle, mapLoaded]);

  const calculatePath = (path) => {
    let totalDistance = 0;
    return path.map((coordinates, i, array) => {
      if (i === 0) {
        return { ...coordinates, distance: 0 };
      }
      const { lat: lat1, lng: lng1 } = array[i - 1];
      const { lat: lat2, lng: lng2 } = coordinates;

      const latLong1 = new window.google.maps.LatLng(lat1, lng1);
      const latLong2 = new window.google.maps.LatLng(lat2, lng2);

      const segmentDistance = window.google.maps.geometry.spherical.computeDistanceBetween(
        latLong1,
        latLong2
      );

      totalDistance += segmentDistance;
      return { ...coordinates, distance: totalDistance };
    });
  };

  const calculateVelocity = (path) => {
    const totalDistance = path.reduce((acc, curr, i, arr) => {
      if (i === 0) return 0;
      const prev = arr[i - 1];
      const latLng1 = new window.google.maps.LatLng(prev.lat, prev.lng);
      const latLng2 = new window.google.maps.LatLng(curr.lat, curr.lng);
      return acc + window.google.maps.geometry.spherical.computeDistanceBetween(latLng1, latLng2);
    }, 0);

    // 10km (10000 meters) as threshold between short and long paths
    const DISTANCE_THRESHOLD = 10000;

    // 60 seconds for short paths, 120 seconds for long paths
    const desiredDurationInSeconds = totalDistance <= DISTANCE_THRESHOLD ? 30 : 120;

    return totalDistance / desiredDurationInSeconds; // meters per second
  };

  const getDistance = () => {
    const differentInTime = (new Date() - initialDate.current) / 1000;
    return differentInTime * calculateVelocity(tripData.current.pathData.path);
  };

  const easeInOut = (t) => {
    return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
  };

  const interpolatePosition = (start, end, progress) => {
    return {
      lat: start.lat + (end.lat - start.lat) * progress,
      lng: start.lng + (end.lng - start.lng) * progress
    };
  };

  const calculateHeading = (start, end) => {
    if (!window.google?.maps?.geometry?.spherical) {
      return 0; // Return default angle if geometry library is not available
    }

    const startLatLng = new window.google.maps.LatLng(start.lat, start.lng);
    const endLatLng = new window.google.maps.LatLng(end.lat, end.lng);
    return window.google.maps.geometry.spherical.computeHeading(startLatLng, endLatLng);
  };

  const moveObject = (timestamp) => {
    if (!lastTimestamp.current) lastTimestamp.current = timestamp;
    const deltaTime = timestamp - lastTimestamp.current;
    lastTimestamp.current = timestamp;

    const distance = getDistance();
    if (!distance || !tripData.current?.pathData?.path) return;

    const calculatedPath = calculatePath(tripData.current.pathData.path);
    let progress = calculatedPath.filter(
      coordinates => coordinates.distance < distance
    );

    const nextLine = calculatedPath.find(
      coordinates => coordinates.distance > distance
    );

    if (!nextLine) {
      setReplayProgress(calculatedPath);
      setAnimationComplete(true);
      cancelAnimationFrame(animationFrameId.current);
      setIsReplaying(false);
      return;
    }

    const lastLine = progress[progress.length - 1] || calculatedPath[0];

    // Calculate smooth progress between points
    const segmentProgress = easeInOut((distance - lastLine.distance) /
      (nextLine.distance - lastLine.distance));

    const interpolatedPosition = interpolatePosition(lastLine, nextLine, segmentProgress);

    const lastLineLatLng = new window.google.maps.LatLng(
      lastLine.lat,
      lastLine.lng
    );
    const nextLineLatLng = new window.google.maps.LatLng(
      nextLine.lat,
      nextLine.lng
    );

    const angle = calculateHeading(lastLine, nextLine);

    setVehicleRotation(angle);
    setReplayProgress([...progress, {
      ...interpolatedPosition,
      bearing: angle
    }]);

    animationFrameId.current = requestAnimationFrame(moveObject);
  };

  const resetReplayState = () => {
    if (animationFrameId.current) {
      cancelAnimationFrame(animationFrameId.current);
    }
    lastTimestamp.current = null;
    setIsReplaying(false);
    setReplayProgress([]);
    setAnimationComplete(false);
  };

  const cleanupPolylines = () => {
    if (polylineRef.current) {
      polylineRef.current.setMap(null);
      polylineRef.current = null;
    }
    if (pathPolylineRef.current) {
      pathPolylineRef.current.setMap(null);
      pathPolylineRef.current = null;
    }
    // Force recreation of map components
    setReplayKey(prev => prev + 1);
  };

  const handleTripReplay = (rowData) => {
    cleanupPolylines();

    if (isReplaying) {
      resetReplayState();
    }

    tripData.current = rowData;
    const velocity = calculateVelocity(rowData.pathData.path); // Calculate velocity based on path length

    setShowReplayMap(true);
    setIsReplaying(true);
    setAnimationComplete(false);
    initialDate.current = new Date();
    setReplayProgress([rowData.pathData.path[0]]);

    if (polylineMapRef.current) {
      const bounds = new window.google.maps.LatLngBounds();
      const padding = 0.01;
      rowData.pathData.path.forEach(point => {
        bounds.extend(new window.google.maps.LatLng(point.lat - padding, point.lng - padding));
        bounds.extend(new window.google.maps.LatLng(point.lat + padding, point.lng + padding));
      });

      polylineMapRef.current.fitBounds(bounds);

      setTimeout(() => {
        const currentZoom = polylineMapRef.current.getZoom();
        polylineMapRef.current.setZoom(currentZoom - 0.5);
      }, 100);
    }

    animationFrameId.current = requestAnimationFrame(moveObject);
  };

  useEffect(() => {
    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
      removePolyline();
    };
  }, []);

  if (!isLoaded) {
    return <div className="text-center m-auto">Loading map...</div>;
  }
  const getMarkerLabel = (region) => {
    return region.depots.length.toString();
  };

  return (
    <div className="flex w-full h-full">
      <div className="w-full relative">
        {isPlayerVisible && (
          <div className="bg-black/80 backdrop-blur-sm flex justify-top items-top absolute z-10 w-full h-full pt-10">
            <LiveStreamPlayer width="85%" height="50%" onClose={onClosePlayer} />
          </div>
        )}

        {!showReplayMap && (
          <GoogleMap
            mapContainerStyle={mapContainerStyle}
            mapContainerClassName="mapContainerClass"
            zoom={5}
            center={defaultCenter}
            options={mapOptions}
            onLoad={(mapInstance) => {
              console.log("Map initialized");
              mapRef.current = mapInstance;
              setMapLoaded(true);
              if (selectedVehicle) {
                panAndZoom(mapInstance, {
                  lat: selectedVehicle.trip.vehiclePosition.lat,
                  lng: selectedVehicle.trip.vehiclePosition.lng
                }, 16);
              } else {
                smoothPanTo(mapInstance, defaultCenter);
                mapInstance.setZoom(5);
              }
            }}
          >
            {selectedVehicle ? (
              <Marker
                position={{
                  lat: selectedVehicle.trip.vehiclePosition.lat,
                  lng: selectedVehicle.trip.vehiclePosition.lng,
                }}
                icon={vehicleIcon}
              />
            ) : (
              mapLoaded && selectedRegion ? (
                selectedDepot && !selectedVehicle ? (
                  <Marker
                    position={{ lat: selectedDepot.lat, lng: selectedDepot.lng }}
                    label={{
                      text: selectedDepot.fleets ? selectedDepot.fleets.toString() : "",
                      color: "white",
                    }}
                    icon={depotIcon}
                  />
                ) : selectedRegion.depots && !selectedDepot ? (
                  selectedRegion.depots.map((depot, depotIndex) => (
                    <Marker
                      key={depotIndex}
                      position={{ lat: depot.lat, lng: depot.lng }}
                      label={{ text: depot.fleets ? depot.fleets.toString() : "", color: "white" }}
                      icon={depotIcon}
                    />
                  ))
                ) : null
              ) : (
                regions.map((region, index) => (
                  <Marker
                    key={index}
                    position={{ lat: region.lat, lng: region.lng }}
                    label={{ text: getMarkerLabel(region), color: "white" }}
                    icon={depotIcon}
                  />
                ))
              )
            )}
          </GoogleMap>
        )}

        {selectedVehicle && showReplayMap && tripData.current && (
          <GoogleMap
            key={replayKey} // Add this key prop
            mapContainerStyle={mapContainerStyle}
            mapContainerClassName="mapContainerClass"
            zoom={14}
            options={{
              ...mapOptions,
              fitBoundsToViewport: true
            }}
            onLoad={(mapInstance) => {
              console.log("Replay Map initialized");
              polylineMapRef.current = mapInstance;
              const bounds = new window.google.maps.LatLngBounds();

              // Add padding to bounds
              const padding = 0.01;
              tripData.current.pathData.path.forEach(point => {
                bounds.extend(new window.google.maps.LatLng(point.lat - padding, point.lng - padding));
                bounds.extend(new window.google.maps.LatLng(point.lat + padding, point.lng + padding));
              });

              mapInstance.fitBounds(bounds);

              // Adjust initial zoom level
              setTimeout(() => {
                const currentZoom = mapInstance.getZoom();
                mapInstance.setZoom(currentZoom + 0.5);
              }, 100);
            }}
          >
            <Polyline
              key={pathKey} // Add this key prop
              path={tripData.current.pathData.path}
              options={pathPolylineOptions}
              onLoad={polyline => {
                pathPolylineRef.current = polyline;
              }}
              onUnmount={() => {
                if (pathPolylineRef.current) {
                  pathPolylineRef.current.setMap(null);
                  pathPolylineRef.current = null;
                }
              }}
            />

            {(isReplaying || animationComplete) && replayProgress.length > 0 && (
              <Polyline
                path={replayProgress}
                options={replayPolylineOptions}
              />
            )}

            {isReplaying ? (
              <Marker
                position={replayProgress[replayProgress.length - 1]}
                icon={{
                  ...vehicleIcon,
                  rotation: vehicleRotation || 0
                }}
              />
            ) : (
              <Marker
                position={animationComplete ?
                  tripData.current.pathData.path[tripData.current.pathData.path.length - 1] :
                  tripData.current.pathData.path[0]
                }
                icon={{
                  ...vehicleIcon,
                  rotation: tripData.current.pathData.path[0].bearing || 0
                }}
              />
            )}

            {tripData.current.pathData.stops.map((stop, index) => (
              <Marker
                key={stop.id}
                position={stop}
                label={{
                  text: `${index + 1}`,
                  color: "white",
                  fontSize: "12px",
                  fontWeight: "bold"
                }}
              />
            ))}
          </GoogleMap>
        )}

        {selectedVehicle && (
          <div className="absolute w-[96.5%] bottom-0 mx-auto left-0 right-0">
            {selectedVehicle && showReplayMap && tripData.current && (
              <FleetVideos />
            )}
            <div className="mt-[-60px]">
              <FleetInfoMain onTripReplay={handleTripReplay} />
            </div>

          </div>
        )}
      </div>
    </div>
  );
};

export default Map;
