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
  fullscreenControl: true,
};

const darkThemeOptions = {
  styles: [
    {
      elementType: "geometry",
      stylers: [{ color: "#212121" }],
    },
    {
      elementType: "labels.icon",
      stylers: [{ visibility: "off" }],
    },
    {
      elementType: "labels.text.fill",
      stylers: [{ color: "#757575" }],
    },
    {
      elementType: "labels.text.stroke",
      stylers: [{ color: "#212121" }],
    },
    {
      featureType: "administrative",
      elementType: "geometry",
      stylers: [{ color: "#757575" }],
    },
    {
      featureType: "poi",
      elementType: "geometry",
      stylers: [{ color: "#212121" }],
    },
    {
      featureType: "poi.park",
      elementType: "geometry",
      stylers: [{ color: "#181818" }],
    },
    {
      featureType: "road",
      elementType: "geometry.fill",
      stylers: [{ color: "#2c2c2c" }],
    },
    {
      featureType: "road",
      elementType: "geometry.stroke",
      stylers: [{ color: "#3c3c3c" }],
    },
    {
      featureType: "road.arterial",
      elementType: "geometry",
      stylers: [{ color: "#373737" }],
    },
    {
      featureType: "road.highway",
      elementType: "geometry",
      stylers: [{ color: "#3c3c3c" }],
    },
    {
      featureType: "road.local",
      elementType: "labels.text.fill",
      stylers: [{ color: "#616161" }],
    },
    {
      featureType: "transit",
      elementType: "geometry",
      stylers: [{ color: "#2c2c2c" }],
    },
    {
      featureType: "water",
      elementType: "geometry",
      stylers: [{ color: "#000000" }],
    },
    {
      featureType: "water",
      elementType: "labels.text.fill",
      stylers: [{ color: "#3d3d3d" }],
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

// Default center position (Center of India)
export const defaultCenter = {
  lat: 20.5937,
  lng: 78.9629,
};

// Depot marker icon configuration
export const depotIcon = {
  url: "/assets/images/map_marker.svg",
  scaledSize: { width: 40, height: 40 },
};

// Vehicle SVG path and icon configuration
export const vehicleIcon = {
  path: "M17.402,0H5.643C2.526,0,0,3.467,0,6.584v34.804c0,3.116,2.526,5.644,5.643,5.644h11.759c3.116,0,5.644-2.527,5.644-5.644 V6.584C23.044,3.467,20.518,0,17.402,0z M22.057,14.188v11.665l-2.729,0.351v-4.806L22.057,14.188z M20.625,10.773 c-1.016,3.9-2.219,8.51-2.219,8.51H4.638l-2.222-8.51C2.417,10.773,11.3,7.755,20.625,10.773z M3.748,21.713v4.492l-2.73-0.349 V14.502L3.748,21.713z M1.018,37.938V27.579l2.73,0.343v8.196L1.018,37.938z M2.575,40.882l2.218-3.336h13.771l2.219,3.336H2.575z M19.328,35.805v-7.872l2.729-0.355v10.048L19.328,35.805z",
  scale: 1,
  strokeColor: "white",
  strokeWeight: 0.1,
  fillOpacity: 1,
  fillColor: "#000000",
  rotation: 0,
};

// Start marker icon configuration
export const startIcon = {
  url: "/assets/images/direction_marker.svg",
  scaledSize: { width: 30, height: 30 },
};

// End marker icon configuration
export const endIcon = {
  url: "/assets/images/direction_marker.svg",
  scaledSize: { width: 30, height: 30 },
};

// Required Google Maps libraries
export const requiredLibraries = ['places'];

// Polyline options for trip path
export const pathPolylineOptions = {
  strokeColor: "#0088ff70",
  strokeWeight: 6,
  strokeOpacity: 0.6
};

// Polyline options for replay progress
export const replayPolylineOptions = {
  strokeColor: "#FF0000",
  strokeWeight: 4,
  strokeOpacity: 0.75,
};

// Animation configuration
export const animationConfig = {
  panDuration: 500,
  zoomInterval: 200,
  velocity: 100,
};

export { lightThemeOptions, darkThemeOptions };
