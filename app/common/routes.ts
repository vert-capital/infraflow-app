export default {
  app: "/",
  nodes: {
    list: "/nodes",
    new: "/nodes/new",
    detail: "/nodes/{id}",
  },
  applications: {
    list: "/applications",
    new: "/applications/new",
    detail: "/applications/{id}",
  },
  edges: {
    list: "/edges",
    new: "/edges/new",
    detail: "/edges/{id}",
  },
  api: {
    login: "/api/auth/login",
    loginDev: "/api/auth/login/dev",
    logout: "/api/auth/logout",
    prefsUser: "/api/user/prefs",
    edges: {
      list: "/api/edges",
      detail: "/api/edges/{id}",
      new: "/api/edges/new",
      edit: "/api/edges/{id}/edit",
    },
    nodes: {
      list: "/api/nodes",
      detail: "/api/nodes/{id}",
      new: "/api/nodes/new",
      edit: "/api/nodes/{id}/edit",
    },
    applications: {
      list: "/api/applications",
      detail: "/api/applications/{id}",
      new: "/api/applications/new",
      edit: "/api/applications/{id}/edit",
    },
    flow: "/api/flow",
  },
};
