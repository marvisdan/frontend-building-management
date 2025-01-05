import React, {
  createContext,
  useCallback,
  useEffect,
  useReducer,
  useState,
} from "react";

import { fetchUser, loginWithCredentials } from "../api";
import reducer, { Types, initialState } from "./reducer";
import { JWTContextType, UserRoleType } from "./types";
import { isValidToken, setSession } from "./utils";

export const AuthContext = createContext<JWTContextType | null>(null);

type AuthProviderProps = {
  children: React.ReactNode;
};

export function AuthProvider({ children }: AuthProviderProps) {
  const [state, dispatch] = useReducer(reducer, initialState);
  let [accessToken, setAccessToken] = useState(
    () => localStorage.getItem("accessToken") || ""
  );
  // let [refreshToken, setRefreshToken] = useState("");

  const initialize = useCallback(async () => {
    try {
      if (accessToken && isValidToken(accessToken)) {
        setSession(accessToken);
        const user = await fetchUser(accessToken);
        dispatch({
          type: Types.INITIAL,
          payload: {
            accessToken,
            isAuthenticated: true,
            user: {
              id: user?.id,
              first_name: user?.first_name,
              last_name: user?.last_name,
              username: user?.username,
              email: user?.email,
            },
            role: {
              readOnly: false,
              redWrite: true,
            },
          },
        });
      } else {
        dispatch({
          type: Types.INITIAL,
          payload: {
            accessToken: null,
            isAuthenticated: false,
            user: null,
            role: null,
          },
        });
      }
    } catch (error) {
      dispatch({
        type: Types.INITIAL,
        payload: {
          accessToken: null,
          isAuthenticated: false,
          user: null,
          role: null,
        },
      });
      throw new Error(error);
    }
  }, [accessToken]);

  useEffect(() => {
    initialize();
  }, [initialize]);

  // LOGIN
  const login = async (username: string, password: string) => {
    const data = await loginWithCredentials(username, password);
    if (data.access_token) {
      const {
        access_token,
        // refresh_token,
        user,
      } = data;
      setSession(access_token);
      setAccessToken(access_token);
      // setRefreshToken(refresh_token);
      dispatch({
        type: Types.LOGIN,
        payload: {
          user,
          accessToken: access_token,
          role: {
            readOnly: false,
            redWrite: true,
          },
        },
      });
    } else {
      dispatch({
        type: Types.INITIAL,
        payload: {
          accessToken: null,
          isAuthenticated: false,
          user: null,
          role: null,
        },
      });
    }
  };

  // LOGOUT
  const logout = async () => {
    setSession(null);
    dispatch({
      type: Types.LOGOUT,
    });
  };

  const handleUserRoleChange = (role: UserRoleType) => {
    dispatch({
      type: Types.CHANGEROLE,
      payload: {
        ...state,
        role,
      },
    });
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        method: "jwt",
        accessToken: accessToken,
        //refreshToken: refreshToken,
        handleUserRoleChange,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
