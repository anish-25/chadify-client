import axios from "../api/axios";
import { endpoints } from "../api/endpoints";
import useAuth from "./useAuth";

const useRefreshToken = () => {
  const { setAuth, auth} = useAuth();
  const refresh = async () => {
    const storedToken = sessionStorage.getItem("token");
      let response = {};
      try {
        response = await axios.post(
          endpoints.refreshToken,
          {
            refreshToken: storedToken ? storedToken : "",
          }
        );
        const user = response?.data?.user;
        const accessToken = response?.data?.access_token;
        const refreshToken = response?.data?.refresh_token;
        setAuth((prev) => {
          return {
            user,
            accessToken,
            refreshToken,
          };
        });
      } catch (err) {
 
      }
      return response?.data?.access_token?.token;
     };
  return refresh;
};

export default useRefreshToken;
