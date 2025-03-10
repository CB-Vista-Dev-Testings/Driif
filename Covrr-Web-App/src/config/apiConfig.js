export const BASE_URL = process.env.REACT_APP_BASE_URL;
export const ENDPOINTS = {
  LOGIN: `${BASE_URL}/auth/login`,
  CHANGE_PASSWORD: `${BASE_URL}/auth/change-password`,
  GET_REGIONS: `${BASE_URL}/region-depot/region/list`,
  GET_VEHICLE_BY_DEPOTS: `${BASE_URL}/vehicle/list-vehicles/filtered`,
  GET_VEHICLE_LAST_LOCATION: `${BASE_URL}/vehicle/last-known-location`,
  VEHICLE_LIVE_TRACKING: `${BASE_URL}/vehicle/gps/live-tracking`,
};
