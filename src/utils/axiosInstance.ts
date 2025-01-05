import axios from "axios";
// import jwt_decode from "jwt-decode";
// import dayjs from "dayjs";
// import { setSession } from "../auth/utils";
// config
// import { HOST_API_KEY } from "../config";

const baseURL = "https://connect.maxen.io";
let accessToken = localStorage.getItem("accessToken") || "";

const axiosInstance = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${accessToken}`,
  },
});

// Request interceptors for API calls
axiosInstance?.interceptors.request.use(
  (config) => {
    config.headers.Authorization = `Bearer ${localStorage.getItem(
      "accessToken"
    )}`;
    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;

// axiosInstance.interceptors.response.use(
//   async (req) => {
//     if (!accessToken) {
//       accessToken = localStorage.getItem("accessToken") || "";
//       req.headers.Authorization = `Bearer ${accessToken}`;
//     }
//     const user = jwt_decode(accessToken) as any;
//     const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1; // check if user token is expired

//     if (!isExpired) {
//       return req;
//     }

//     const refreshToken = localStorage.getItem("refreshToken") || "";
//     const response = await axios.post(`${baseURL}/dj-rest-auth/refresh`, {
//       refresh: refreshToken,
//     });

//     if (response.data) {
//       const { access_token, refresh_token } = response.data;
//       setSession(access_token);
//       localStorage.setItem("refreshToken", refresh_token);
//       req.headers.Authorization = `Bearer ${access_token}`;
//     }

//     return req;
//   },
//   (error) =>
//     Promise.reject(
//       (error.response && error.response.data) || "Something went wrong"
//     )
// );
