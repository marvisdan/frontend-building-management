const ROOTS_AUTH = "/auth";
const ROOTS_DASHBOARD = "/dashboard";

function path(root: string, sublink: string) {
  return `${root}${sublink}`;
}

export const PATH_AUTH = {
  root: ROOTS_AUTH,
  login: path(ROOTS_AUTH, "/login"),
  resetPassword: path(ROOTS_AUTH, "/reset-password"),
  passwordChanged: path(ROOTS_AUTH, "/password-changed"),
};

export const PATH_DASHBOARD = {
  root: ROOTS_DASHBOARD,
  analytics: path(ROOTS_DASHBOARD, "/analytics"),
  buildings: {
    root: path(ROOTS_DASHBOARD, "/buildings/"),
    view: (id: string) => path(ROOTS_DASHBOARD, `/buildings/${id}`),
  },

  one: path(ROOTS_DASHBOARD, "/one"),
  two: path(ROOTS_DASHBOARD, "/two"),
  three: path(ROOTS_DASHBOARD, "/three"),
  assetList: path(ROOTS_DASHBOARD, "/assetList"),
  asset: {
    root: path(ROOTS_DASHBOARD, "/asset/"),
    list: path(ROOTS_DASHBOARD, "/asset/list"),
    create: path(ROOTS_DASHBOARD, "/asset/create"),
    edit: (id: string) => path(ROOTS_DASHBOARD, `/asset/edit/${id}`),
    view: (id: number) => path(ROOTS_DASHBOARD, `/asset/${id}/details`),
  },
  workorder: {
    root: path(ROOTS_DASHBOARD, "/workorder/"),
    schedule: path(ROOTS_DASHBOARD, "/workorder/schedule"),
    create: path(ROOTS_DASHBOARD, "/workorder/create"),
    edit: (id: number) => path(ROOTS_DASHBOARD, `/workorder/edit/${id}`),
    view: (id: number) => path(ROOTS_DASHBOARD, `/workorder/${id}/details`),
  },
  contact: {
    root: path(ROOTS_DASHBOARD, "/contact/"),
    list: path(ROOTS_DASHBOARD, "/contact/list"),
    create: path(ROOTS_DASHBOARD, "/contact/create"),
    update: (id: number) => path(ROOTS_DASHBOARD, `/contact/${id}`),
  },
  user: {
    root: path(ROOTS_DASHBOARD, "/user"),
    profile: path(ROOTS_DASHBOARD, "/user/profile"),
    four: path(ROOTS_DASHBOARD, "/user/four"),
    five: path(ROOTS_DASHBOARD, "/user/five"),
    six: path(ROOTS_DASHBOARD, "/user/six"),
  },
};
