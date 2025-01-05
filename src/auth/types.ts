import { ActionsType } from "./reducer";

export type ActionMapType<M extends { [index: string]: any }> = {
  [Key in keyof M]: M[Key] extends undefined
    ? {
        type: Key;
      }
    : {
        type: Key;
        payload: M[Key];
      };
};

export type AuthUserType = null | Record<string, any>;

export type AuthUserRoleType = null | Record<string, any>;
export type AuthStateType = {
  isAuthenticated: boolean;
  isInitialized: boolean;
  user: AuthUserType;
  role: AuthUserRoleType;
  accessToken: string | null;
};
export type UserRoleType = { readOnly: boolean; readWrite: boolean };
export type JWTContextType = {
  method: "jwt";
  isAuthenticated: boolean;
  isInitialized: boolean;
  user: AuthUserType;
  role: AuthUserRoleType;
  accessToken: string | null;
  //refreshToken: string | null;
  handleUserRoleChange: (role: UserRoleType) => void;
  setAccessToken?: React.Dispatch<React.SetStateAction<string | null>>;
  setRefreshToken?: React.Dispatch<React.SetStateAction<string | null>>;
  dispatch?: React.Dispatch<ActionsType>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
};
