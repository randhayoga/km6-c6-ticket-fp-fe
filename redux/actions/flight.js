import axios from "axios";
import {
  setFlights,
  setAirports,
  setFlightDetail,
  setSeatsByFlightId,
} from "../reducers/flight";
import { toast } from "sonner";

export const searchFlight = (queryParams) => async (dispatch) => {
  // Construct the dynamic API URL
  let apiUrl = `${import.meta.env.VITE_BACKEND_API}/flight/search?da=${
    queryParams.da
  }&aa=${queryParams.aa}&dd=${queryParams.dd}&class=${queryParams.class}`;

  // Add optional parameters if they exist
  if (queryParams.rd) apiUrl += `&rd=${queryParams.rd}`;
  if (queryParams.sort) apiUrl += `&sort=${queryParams.sort}`;

  let config = {
    method: "get",
    maxBodyLength: Infinity,
    url: apiUrl,
  };

  try {
    const response = await axios.request(config);
    const { data } = response.data;

    dispatch(setFlights(data));
  } catch (error) {
    console.log(error);
  }
};

export const getAirports = () => async (dispatch) => {
  let config = {
    method: "get",
    maxBodyLength: Infinity,
    url: `${import.meta.env.VITE_BACKEND_API}/airports`,
  };

  try {
    const response = await axios.request(config);
    const { data } = response.data;
    dispatch(setAirports(data));
  } catch (error) {
    toast.error(error?.response?.data?.message);
  }
};

export const getFlightDetail = (flightId) => async (dispatch) => {
  let config = {
    method: "get",
    maxBodyLength: Infinity,
    url: `${import.meta.env.VITE_BACKEND_API}/flight/${flightId}`,
  };

  try {
    const response = await axios.request(config);
    const { data } = response.data;
    console.log(data);
    dispatch(setFlightDetail(data));
  } catch (error) {
    console.log(error);
  }
};

export const getSeatsByFlightId = (flightId) => async (dispatch) => {
  let config = {
    method: "get",
    maxBodyLength: Infinity,
    url: `${import.meta.env.VITE_BACKEND_API}/seats/book/${flightId}`,
  };
  try {
    const response = await axios.request(config);
    const { data } = response.data;
    console.log(data);
    dispatch(setSeatsByFlightId(data));
  } catch (error) {
    console.log(error);
  }
};
