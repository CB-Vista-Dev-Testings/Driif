import { getRequest, postRequest, putRequest, deleteRequest } from "./apiService";
import { ENDPOINTS } from "../config/apiConfig";

// Fetches regions by company ID
export const getRegionsByCompanyId = async (companyId, showError = true) => {
  return await getRequest(`${ENDPOINTS.GET_REGIONS}?company_id=${companyId}`, showError);
};

// Fetches Vehicle by Depot ID
export const getVehicleByDepots = async (companyId, depotId, driver, showError = true) => {
  return await getRequest(`${ENDPOINTS.GET_VEHICLE_BY_DEPOTS}?company_id=${companyId}&depotId=${depotId}`, showError);
};

// Fetches last known location of a vehicle
export const getVehicleLastLocation = async (vehicleId, showError = true) => {
  return await getRequest(`${ENDPOINTS.GET_VEHICLE_LAST_LOCATION}?vehicle_id=${vehicleId}`, showError);
};

// Fetches live tracking of a vehicle
export const getVehicleLiveTracking = async (vehicleId, showError = true) => {
  return await getRequest(`${ENDPOINTS.VEHICLE_LIVE_TRACKING}?vehicle_id=${vehicleId}`, showError);
};
