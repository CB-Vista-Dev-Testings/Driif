import React, { useRef, useState, useEffect } from "react";
import { GoogleMap, Marker, Polyline, Circle, InfoWindow } from "@react-google-maps/api";
import {
  darkThemeOptions,
  lightThemeOptions,
  mapContainerStyle,
  mapOptions,
  pathPolylineOptions,
  replayPolylineOptions,
  startEndPointCircleOptions,
  stopsIcon,
  criticalAlertIcon,
  nonCriticalAlertIcon,
  alertHoverCircleOptions,
  getSvgIcon,
} from "../../config/mapOptions";
import { useTheme } from "../../context/ThemeContext";
import CustomMarker from "./CustomMarker";
import { debounce } from "lodash";

// Utility function to validate coordinates
const isValidCoordinate = (coord) => {
  if (!coord) return false;
  const { lat, lng } = coord;
  return typeof lat === "number" && typeof lng === "number" && !isNaN(lat) && !isNaN(lng) && isFinite(lat) && isFinite(lng) && lat >= -90 && lat <= 90 && lng >= -180 && lng <= 180;
};

const ReplayMap = ({
  tripData,
  vehicleIcon,
  isFullScreen,
  fleetVideosRef, // Use the shared ref from Map component
  onAlertClick,
  onAlertHover,
  onAlertMouseOut,
}) => {
  const { isDarkMode } = useTheme();
  const mapOptions = isDarkMode ? darkThemeOptions : lightThemeOptions;

  const polylineMapRef = useRef(null);
  const pathPolylineRef = useRef(null);
  const polylineRef = useRef(null);

  const [replayProgress, setReplayProgress] = useState([]);
  const [isReplaying, setIsReplaying] = useState(false);
  const [vehicleRotation, setVehicleRotation] = useState(0);
  const [animationComplete, setAnimationComplete] = useState(false);
  const [pathKey, setPathKey] = useState(0);
  const [replayKey, setReplayKey] = useState(0);

  const initialDate = useRef(new Date());
  const animationFrameId = useRef(null);
  const lastTimestamp = useRef(null);

  // Alert interaction states
  const [selectedAlert, setSelectedAlert] = useState(null);
  const [hoveredAlert, setHoveredAlert] = useState(null);
  const hoverTimeoutRef = useRef(null);
  const currentHoveredAlertRef = useRef(null);
  const [hoverEnabled, setHoverEnabled] = useState(true);

  // InfoWindow visibility state
  const [visibleInfoWindows, setVisibleInfoWindows] = useState({});

  // Initialize replay on component mount
  useEffect(() => {
    if (tripData) {
      startReplay();
    }

    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
      cleanupPolylines();
    };
  }, [tripData]);

  // Initialize visible InfoWindows when trip data changes
  useEffect(() => {
    if (tripData?.pathData?.stops) {
      const initialVisibility = {};
      tripData.pathData.stops.forEach((stop) => {
        initialVisibility[stop.id || `stop-${Math.random()}`] = true;
      });
      setVisibleInfoWindows(initialVisibility);
    }
  }, [tripData]);

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

      const segmentDistance = window.google.maps.geometry.spherical.computeDistanceBetween(latLong1, latLong2);

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

    const DISTANCE_THRESHOLD = 10000;
    const desiredDurationInSeconds = totalDistance <= DISTANCE_THRESHOLD ? 30 : 120;

    return totalDistance / desiredDurationInSeconds; // meters per second
  };

  const getDistance = () => {
    const differentInTime = (new Date() - initialDate.current) / 1000;
    return differentInTime * calculateVelocity(tripData.pathData.path);
  };

  const easeInOut = (t) => {
    return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
  };

  const interpolatePosition = (start, end, progress) => {
    return {
      lat: start.lat + (end.lat - start.lat) * progress,
      lng: start.lng + (end.lng - start.lng) * progress,
    };
  };

  const calculateHeading = (start, end) => {
    if (!window.google?.maps?.geometry?.spherical || !isValidCoordinate(start) || !isValidCoordinate(end)) {
      return 0;
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
    if (!distance || !tripData?.pathData?.path) return;

    const calculatedPath = calculatePath(tripData.pathData.path);
    let progress = calculatedPath.filter((coordinates) => coordinates.distance < distance);

    const nextLine = calculatedPath.find((coordinates) => coordinates.distance > distance);

    if (!nextLine) {
      setReplayProgress(calculatedPath);
      setAnimationComplete(true);
      cancelAnimationFrame(animationFrameId.current);
      setIsReplaying(false);
      return;
    }

    const lastLine = progress[progress.length - 1] || calculatedPath[0];

    // Calculate smooth progress between points
    const segmentProgress = easeInOut((distance - lastLine.distance) / (nextLine.distance - lastLine.distance));

    const interpolatedPosition = interpolatePosition(lastLine, nextLine, segmentProgress);
    const angle = calculateHeading(lastLine, nextLine);

    setVehicleRotation(angle);
    setReplayProgress([
      ...progress,
      {
        ...interpolatedPosition,
        bearing: angle,
      },
    ]);

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
    setReplayKey((prev) => prev + 1);
  };

  const startReplay = () => {
    cleanupPolylines();
    resetReplayState();

    setIsReplaying(true);
    setAnimationComplete(false);
    initialDate.current = new Date();
    setReplayProgress([tripData.pathData.path[0]]);

    animationFrameId.current = requestAnimationFrame(moveObject);
  };

  const handleAlertClick = (alert) => {
    setSelectedAlert(alert);
    if (onAlertClick) {
      onAlertClick(alert);
    }
  };

  const handleStableAlertHover = (alert) => {
    if (!hoverEnabled || currentHoveredAlertRef.current === alert.id) return;

    setHoverEnabled(false); // Disable hover briefly to prevent multiple triggers
    currentHoveredAlertRef.current = alert.id;
    setSelectedAlert(alert);

    if (onAlertHover) {
      onAlertHover(alert);
    }

    // Re-enable hover after a delay
    setTimeout(() => {
      setHoverEnabled(true);
    }, 1000);
  };

  const handleStableAlertMouseOut = () => {
    currentHoveredAlertRef.current = null;
    setSelectedAlert(null);

    if (onAlertMouseOut) {
      onAlertMouseOut();
    }
  };

  // Create debounced versions of the alert hover handlers
  const debouncedAlertHover = debounce((alert) => {
    if (currentHoveredAlertRef.current !== alert.id) {
      currentHoveredAlertRef.current = alert.id;
      setSelectedAlert(alert);
      if (fleetVideosRef.current) {
        fleetVideosRef.current.scrollToVideo(alert.videoId);
      }
    }
  }, 300);

  const debouncedAlertMouseOut = debounce(() => {
    currentHoveredAlertRef.current = null;
    setSelectedAlert(null);
    if (fleetVideosRef.current) {
      fleetVideosRef.current.clearFocus();
    }
  }, 300);

  // Clean up debounced functions on unmount
  useEffect(() => {
    return () => {
      debouncedAlertHover.cancel();
      debouncedAlertMouseOut.cancel();
    };
  }, []);

  // Get alert icon using the getSvgIcon helper
  const getAlertIcon = (type) => {
    const iconConfig = type === "critical" ? criticalAlertIcon : nonCriticalAlertIcon;
    return getSvgIcon(iconConfig);
  };

  // Function to render start and end points
  const renderStartEndPoints = () => {
    if (!tripData?.pathData?.path || tripData.pathData.path.length === 0) return null;

    const startPoint = tripData.pathData.path[0];
    const endPoint = tripData.pathData.path[tripData.pathData.path.length - 1];

    return (
      <>
        {/* Start point - Green circle */}
        <Circle center={{ lat: startPoint.lat, lng: startPoint.lng }} radius={startEndPointCircleOptions.radius} options={startEndPointCircleOptions} />

        {/* End point - Green circle */}
        <Circle center={{ lat: endPoint.lat, lng: endPoint.lng }} radius={startEndPointCircleOptions.radius} options={startEndPointCircleOptions} />
      </>
    );
  };

  // Render alerts on the map
  const renderAlerts = () => {
    if (!tripData?.pathData?.alerts) return null;

    return tripData.pathData.alerts.map((alert, index) => (
      <React.Fragment key={alert.id}>
        {/* Transparent circle for better hover detection */}
        <Circle
          center={{ lat: alert.lat, lng: alert.lng }}
          radius={alertHoverCircleOptions.radius}
          options={alertHoverCircleOptions}
          onMouseOver={() => handleStableAlertHover(alert)}
          onMouseOut={handleStableAlertMouseOut}
          onClick={() => handleAlertClick(alert)}
        />

        {/* Actual marker */}
        <Marker position={{ lat: alert.lat, lng: alert.lng }} icon={getAlertIcon(alert.type)} onClick={() => handleAlertClick(alert)} />
      </React.Fragment>
    ));
  };

  // Render stops on the map
  const renderStops = () => {
    if (!tripData?.pathData?.stops) return null;

    return tripData.pathData.stops.map((stop, index) => {
      const stopId = stop.id || `stop-${index}`;
      const stopIconWithLabel = getSvgIcon({
        ...stopsIcon,
        labelOrigin: { x: stopsIcon.anchor.x, y: stopsIcon.anchor.y },
      });

      // Get stop duration and time info or provide defaults
      const duration = stop.duration || "30 min";
      const fromTime = stop.fromTime || "10:00 AM";
      const toTime = stop.toTime || "10:30 AM";

      // Calculate offset position for InfoWindow
      const infoWindowPosition = {
        lat: stop.lat - -0.000099,
        lng: stop.lng,
      };

      // Toggle InfoWindow visibility when marker is clicked
      const handleMarkerClick = () => {
        setVisibleInfoWindows((prev) => ({
          ...prev,
          [stopId]: !prev[stopId],
        }));
      };

      // Handle InfoWindow close event
      const handleInfoWindowClose = () => {
        setVisibleInfoWindows((prev) => ({
          ...prev,
          [stopId]: false,
        }));
      };

      return (
        <React.Fragment key={stopId}>
          <Marker
            position={stop}
            icon={stopIconWithLabel}
            onClick={handleMarkerClick}
            label={{
              text: `${index + 1}`,
              color: "white",
              fontSize: "12px",
              fontWeight: "bold",
            }}
          />

          {/* Render InfoWindow only if it's visible in state */}
          {visibleInfoWindows[stopId] !== false && (
            <InfoWindow position={infoWindowPosition} options={{ disableAutoPan: true }} onCloseClick={handleInfoWindowClose}>
              <>
                <div className="stop-info p-2 rounded shadow-sm ps-0 pe-4">
                  <div className="font-semibold text-sm text-themeYellow/90">Stop {index + 1}</div>
                  <div className="text-xs text-gray-200 font-medium">
                    <span className="font-normal text-gray-300">Duration:</span> {duration}
                  </div>
                  <div className="text-xs text-gray-200 font-medium">
                    <span className="font-normal text-gray-300">Time:</span> {fromTime} - {toTime}
                  </div>
                </div>
              </>
            </InfoWindow>
          )}
        </React.Fragment>
      );
    });
  };

  return (
    <>
      <GoogleMap
        key={replayKey}
        mapContainerStyle={mapContainerStyle}
        mapContainerClassName="mapContainerClass"
        zoom={14}
        options={{
          ...mapOptions,
          fitBoundsToViewport: true,
        }}
        onLoad={(mapInstance) => {
          polylineMapRef.current = mapInstance;
          const bounds = new window.google.maps.LatLngBounds();

          // Add padding to bounds
          const padding = 0.01;
          tripData.pathData.path.forEach((point) => {
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
          key={pathKey}
          path={tripData.pathData.path}
          options={pathPolylineOptions}
          onLoad={(polyline) => {
            pathPolylineRef.current = polyline;
          }}
          onUnmount={() => {
            if (pathPolylineRef.current) {
              pathPolylineRef.current.setMap(null);
              pathPolylineRef.current = null;
            }
          }}
        />

        {(isReplaying || animationComplete) && replayProgress.length > 0 && <Polyline path={replayProgress} options={replayPolylineOptions} />}

        {/* Start and End Points */}
        {renderStartEndPoints()}

        {isReplaying ? (
          <CustomMarker position={replayProgress[replayProgress.length - 1]} rotation={vehicleRotation || 0} icon={vehicleIcon} />
        ) : (
          <CustomMarker
            position={animationComplete ? tripData.pathData.path[tripData.pathData.path.length - 1] : tripData.pathData.path[0]}
            rotation={tripData.pathData.path[0].bearing || 0}
            icon={vehicleIcon}
          />
        )}

        {/* Render stops and alerts */}
        {renderStops()}
        {renderAlerts()}

        {/* Selected Alert Info Window */}
        {selectedAlert && (
          <InfoWindow position={{ lat: selectedAlert.lat, lng: selectedAlert.lng }} onCloseClick={() => setSelectedAlert(null)}>
            <div className="stop-info p-2 rounded shadow-sm ps-0 pe-14">
              <div className={`text-xs font-medium ${selectedAlert.type === "critical" ? "text-red-400" : "text-themeYellow/90"}`}>
                <span className="font-normal ">{selectedAlert.type === "critical" ? "Critical Alert" : "Non-Critical Alert"}</span>
              </div>
              <div className={`font-semibold text-sm ${selectedAlert.type === "critical" ? "text-red-400" : "text-themeYellow/90"}`}>{selectedAlert.description}</div>
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
    </>
  );
};

export default ReplayMap;
