// import axios from "axios";
// import jwt_decode from "jwt-decode";
// import dayjs from "dayjs";
// import { setSession } from "../auth/utils";
// import { useAuthContext } from "../auth/useAuthContext";

// const baseURL = "https://connect.maxen.io";

//React Axios interceptor pluged to authProvider to use and apdate access/refreshToken

const useAxios = () => {
  //   const { accessToken, setRefreshToken, setAccessToken, dispatch } =
  //     useAuthContext();
  //   const axiosInstance = axios.create({
  //     baseURL,
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: `Bearer ${accessToken}`,
  //     },
  //   });
  //   axiosInstance.interceptors.response.use(
  //     async (req) => {
  //       if (accessToken) {
  //         const user = jwt_decode(accessToken) as any;
  //         const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1; // check if user token is expired
  //         if (!isExpired) {
  //           return req;
  //         }
  //         const refreshToken = localStorage.getItem("refreshToken") || "";
  //         const response = await axios.post(`${baseURL}/dj-rest-auth/refresh`, {
  //           refresh: refreshToken,
  //         });
  //         if (response.data) {
  //           const { access_token, refresh_token, user } = response.data;
  //           setSession(access_token);
  //           localStorage.setItem("refreshToken", refresh_token);
  //           setAccessToken(access_token);
  //           setRefreshToken(refresh_token);
  //           dispatch({
  //             type: Types.LOGIN,
  //             payload: {
  //               user,
  //             },
  //           });
  //           req.headers.Authorization = `Bearer ${access_token}`;
  //         }
  //       }
  //       return req;
  //     },
  //     (error) =>
  //       Promise.reject(
  //         (error.response && error.response.data) || "Something went wrong"
  //       )
  //   );
  //   return axiosInstance;
};

export default useAxios;
