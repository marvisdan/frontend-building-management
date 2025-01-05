import {
  ActionMapType,
  AuthStateType,
  AuthUserRoleType,
  AuthUserType,
} from "./types";

export enum Types {
  INITIAL = "INITIAL",
  LOGIN = "LOGIN",
  REGISTER = "REGISTER",
  LOGOUT = "LOGOUT",
  CHANGEROLE = "CHANGEROLE",
}
export type ActionsType = ActionMapType<Payload>[keyof ActionMapType<Payload>];
export const initialState: AuthStateType = {
  isInitialized: false,
  isAuthenticated: false,
  user: null,
  accessToken: null,
  role: {
    readOnly: false,
    readWrite: true,
  },
};

type Payload = {
  [Types.INITIAL]: {
    isAuthenticated: boolean;
    user: AuthUserType;
    role: AuthUserRoleType;
    accessToken: string | null;
  };
  [Types.LOGIN]: {
    user: AuthUserType;
    role: AuthUserRoleType;
    accessToken: string | null;
  };
  [Types.REGISTER]: {
    user: AuthUserType;
    role: AuthUserRoleType;
    accessToken: string | null;
  };
  [Types.LOGOUT]: undefined;
  [Types.CHANGEROLE]: {
    role: AuthUserRoleType;
  };
};

const reducer = (state: AuthStateType, action: ActionsType) => {
  if (action.type === Types.INITIAL) {
    return {
      isInitialized: true,
      isAuthenticated: action.payload.isAuthenticated,
      user: action.payload.user,
      accessToken: action.payload.accessToken,
      role: {
        readOnly: false,
        readWrite: true,
      },
    };
  }
  if (action.type === Types.LOGIN) {
    return {
      ...state,
      isAuthenticated: true,
      user: action.payload.user,
      role: {
        readOnly: false,
        readWrite: true,
      },
    };
  }
  if (action.type === Types.REGISTER) {
    return {
      ...state,
      isAuthenticated: true,
      user: action.payload.user,
      role: {
        readOnly: false,
        readWrite: true,
      },
    };
  }
  if (action.type === Types.LOGOUT) {
    return {
      ...state,
      isAuthenticated: false,
      user: null,
      role: null,
    };
  }
  if (action.type === Types.CHANGEROLE) {
    return {
      ...state,
      role: action.payload.role,
    };
  }

  return state;
};

export default reducer;
