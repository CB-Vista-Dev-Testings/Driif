import { useTheme } from "../context/ThemeContext";

// Custom hook to get map options based on theme
export const useMapOptions = () => {
  const { isDarkMode } = useTheme();
  return {
    mapOptions: isDarkMode ? darkThemeOptions : lightThemeOptions,
    isDarkMode,
  };
};

// Alert marker icon configurations
export const criticalAlertIcon = {
  url: "/assets/images/maps/critical_alert.svg",
  scaledSize: { width: 30, height: 30 },
  anchor: { x: 15, y: 15 }, // Center point of the icon
};

export const nonCriticalAlertIcon = {
  url: "/assets/images/maps/non_critical_alert.svg",
  scaledSize: { width: 30, height: 30 },
  anchor: { x: 15, y: 15 }, // Center point of the icon
};

export const stopsIcon = {
  url: "/assets/images/maps/stops.svg",
  scaledSize: { width: 30, height: 30 },
  anchor: { x: 15, y: 15 }, // Center point of the icon
};

const lightThemeOptions = {
  styles: [
    {
      elementType: "labels.icon",
      stylers: [{ visibility: "off" }],
    },
    {
      elementType: "labels.text.fill",
      stylers: [{ color: "#616161" }],
    },
    {
      elementType: "labels.text.stroke",
      stylers: [{ color: "#f5f5f5" }],
    },
    {
      featureType: "administrative.land_parcel",
      elementType: "labels.text.fill",
      stylers: [{ color: "#bdbdbd" }],
    },
    {
      featureType: "poi",
      elementType: "geometry",
      stylers: [{ color: "#eeeeee" }],
    },
    {
      featureType: "poi",
      elementType: "labels.text.fill",
      stylers: [{ color: "#757575" }],
    },
    {
      featureType: "poi.park",
      elementType: "geometry",
      stylers: [{ color: "#e5e5e5" }], // Lighter color for parks
    },
    {
      featureType: "poi.park",
      elementType: "labels.text.fill",
      stylers: [{ color: "#9e9e9e" }],
    },
    {
      featureType: "road",
      elementType: "geometry",
      stylers: [{ color: "#ffffff" }],
    },
    {
      featureType: "road.arterial",
      elementType: "labels.text.fill",
      stylers: [{ color: "#757575" }],
    },
    {
      featureType: "road.highway",
      elementType: "geometry",
      stylers: [{ color: "#dadada" }],
    },
    {
      featureType: "road.highway",
      elementType: "labels.text.fill",
      stylers: [{ color: "#616161" }],
    },
    {
      featureType: "road.local",
      elementType: "labels.text.fill",
      stylers: [{ color: "#9e9e9e" }],
    },
    {
      featureType: "transit.line",
      elementType: "geometry",
      stylers: [{ color: "#e5e5e5" }],
    },
    {
      featureType: "transit.station",
      elementType: "geometry",
      stylers: [{ color: "#eeeeee" }],
    },
    {
      featureType: "water",
      elementType: "geometry",
      stylers: [{ color: "#b0d4e3" }], // Blue variant for sea
    },
    {
      featureType: "water",
      elementType: "labels.text.fill",
      stylers: [{ color: "#92998d" }],
    },
  ],
  disableDefaultUI: true,
  zoomControl: false,
  mapTypeControl: false,
  streetViewControl: false,
  fullscreenControl: false,
};

const darkThemeOptions = {
  styles: [
    {
      elementType: "geometry",
      stylers: [{ color: "#1d1d1d" }], // Darker background
    },
    {
      elementType: "labels.icon",
      stylers: [{ visibility: "off" }],
    },
    {
      elementType: "labels.text.fill",
      stylers: [{ color: "#8a8a8a" }], // Slightly lighter text
    },
    {
      elementType: "labels.text.stroke",
      stylers: [{ color: "#1d1d1d" }], // Match background
    },
    {
      featureType: "administrative",
      elementType: "geometry",
      stylers: [{ color: "#5a5a5a" }], // Darker administrative areas
    },
    {
      featureType: "poi",
      elementType: "geometry",
      stylers: [{ color: "#2a2a2a" }], // Darker points of interest
    },
    {
      featureType: "poi.park",
      elementType: "geometry",
      stylers: [{ color: "#1a1a1a" }], // Darker parks
    },
    {
      featureType: "road",
      elementType: "geometry.fill",
      stylers: [{ color: "#3a3a3a" }], // Darker roads
    },
    {
      featureType: "road",
      elementType: "geometry.stroke",
      stylers: [{ color: "#4a4a4a" }], // Darker road strokes
    },
    {
      featureType: "road.arterial",
      elementType: "geometry",
      stylers: [{ color: "#4a4a4a" }], // Darker arterial roads
    },
    {
      featureType: "road.highway",
      elementType: "geometry",
      stylers: [{ color: "#4a4a4a" }], // Darker highways
    },
    {
      featureType: "road.local",
      elementType: "labels.text.fill",
      stylers: [{ color: "#7a7a7a" }], // Slightly lighter local road labels
    },
    {
      featureType: "transit",
      elementType: "geometry",
      stylers: [{ color: "#3a3a3a" }], // Darker transit
    },
    {
      featureType: "water",
      elementType: "geometry",
      stylers: [{ color: "#0a0a0a" }], // Darker water
    },
    {
      featureType: "water",
      elementType: "labels.text.fill",
      stylers: [{ color: "#4a4a4a" }], // Darker water labels
    },
  ],
  disableDefaultUI: true,
  zoomControl: false,
  mapTypeControl: false,
  streetViewControl: false,
  fullscreenControl: true,
};

// Container style for the map
export const mapContainerStyle = {
  width: "100%",
  height: "90vh",
};

// Full screen map container style
export const fullScreenMapContainerStyle = {
  width: "100%",
  height: "100vh",
};

// Default center position (Center of India)
export const defaultCenter = {
  lat: 20.5937,
  lng: 78.9629,
};

// Depot marker icon configuration
export const depotIcon = {
  url: "/assets/images/maps/map_marker.svg",
  scaledSize: { width: 40, height: 40 },
};

// Old vehicle marker icon configuration
export const oldVehicleIcon = {
  path: "M17.402,0H5.643C2.526,0,0,3.467,0,6.584v34.804c0,3.116,2.526,5.644,5.643,5.644h11.759c3.116,0,5.644-2.527,5.644-5.644 V6.584C23.044,3.467,20.518,0,17.402,0z M22.057,14.188v11.665l-2.729,0.351v-4.806L22.057,14.188z M20.625,10.773 c-1.016,3.9-2.219,8.51-2.219,8.51H4.638l-2.222-8.51C2.417,10.773,11.3,7.755,20.625,10.773z M3.748,21.713v4.492l-2.73-0.349 V14.502L3.748,21.713z M1.018,37.938V27.579l2.73,0.343v8.196L1.018,37.938z M2.575,40.882l2.218-3.336h13.771l2.219,3.336H2.575z M19.328,35.805v-7.872l2.729-0.355v10.048L19.328,35.805z",
  scale: 1,
  strokeColor: "white",
  strokeWeight: 0.1,
  fillOpacity: 1,
  fillColor: "#000000",
  rotation: 0,
};

// Car marker icon configuration
export const carIcon = {
  url: "/assets/images/maps/car.svg",
  scaledSize: { width: 30, height: 60 },
};

// Truck marker icon configuration
export const truckIcon = {
  url: "/assets/images/maps/truck.svg",
  scaledSize: { width: 50, height: 90 },
};

// Bus marker icon configuration
export const busIcon = {
  url: "/assets/images/maps/bus.svg",
  scaledSize: { width: 40, height: 70 },
};

// Function to get vehicle icon configuration based on vehicle type and theme
export const getVehicleIconByType = (vehicleType, isDarkMode) => {
  let icon;
  switch (vehicleType) {
    case "car":
      icon = carIcon;
      break;
    case "truck":
      icon = truckIcon;
      break;
    case "bus":
      icon = busIcon;
      break;
    default:
      icon = carIcon;
  }
  return {
    ...icon,
    fillColor: isDarkMode ? "#ffffff" : "#000000",
    rotation: 0,
  };
};

// Required Google Maps libraries
export const requiredLibraries = ["places"];

// Polyline options for trip path
export const pathPolylineOptions = {
  strokeColor: "#00bc6845",
  strokeWeight: 6,
  strokeOpacity: 0.5,
};

// Polyline options for replay progress
export const replayPolylineOptions = {
  strokeColor: "#00BC68",
  strokeWeight: 4,
  strokeOpacity: 1,
};

// Animation configuration
export const animationConfig = {
  panDuration: 500,
  zoomInterval: 200,
  velocity: 100,
};

// Start/End point circle options
export const startEndPointCircleOptions = {
  fillColor: "#00BC68", // Bright green
  fillOpacity: 1,
  strokeColor: "#00BC68", // Darker green border
  strokeWeight: 2,
  strokeOpacity: 1,
  clickable: true,
  zIndex: 5,
  radius: 10,
};

// Alert hover detection circle options
export const alertHoverCircleOptions = {
  fillColor: "#000000",
  fillOpacity: 0.1,
  strokeColor: "transparent",
  strokeOpacity: 0,
  clickable: true,
  zIndex: 10, // Ensure it's above the marker
  radius: 20,
};

// Libraries required for Google Maps
export const mapLibraries = ["geometry", "drawing", "places"];

// Google Maps API key - this could also be in an env file
export const googleMapsApiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

// Alert info window style classes
export const alertInfoWindowClasses = {
  container: "p-2 bg-white rounded shadow-lg",
  title: "text-lg font-semibold",
  description: "text-sm",
};

// Stop info window style classes
export const stopInfoWindowClasses = {
  container: "p-2 bg-white rounded shadow-sm",
  title: "font-semibold text-sm text-gray-800",
  detail: "text-xs text-gray-600",
  label: "font-medium",
};

// Sample default stop data (when real data is missing)
export const defaultStopData = {
  duration: "30 min",
  fromTime: "10:00 AM",
  toTime: "10:30 AM",
};

// Function to convert SVG icon configurations to Google Maps compatible icons
export const getSvgIcon = (iconConfig) => {
  if (window.google && window.google.maps) {
    return {
      url: iconConfig.url,
      scaledSize: new window.google.maps.Size(iconConfig.scaledSize.width, iconConfig.scaledSize.height),
      anchor: new window.google.maps.Point(iconConfig.anchor.x, iconConfig.anchor.y),
      labelOrigin: iconConfig.labelOrigin ? new window.google.maps.Point(iconConfig.labelOrigin.x, iconConfig.labelOrigin.y) : undefined,
    };
  }
  return null;
};

// Map filter options for the filter menu
export const mapFilterOptions = [
  { id: "all", label: "All" },
  { id: "critical", label: "Critical Alerts" },
  { id: "nonCritical", label: "Non-Critical Alert" },
  { id: "stops", label: "Stops" },
];

// Default filter state
export const defaultFilterState = {
  all: false,
  critical: false,
  nonCritical: false,
  stops: false,
};

// InfoWindow offset for stop markers (distance above marker)
export const infoWindowOffset = {
  lat: 0.0015, // Significantly increased for better visibility
  lng: 0,
};

export { lightThemeOptions, darkThemeOptions };
