export default {
  app: '/',
  node: {
    list: '/nodes',
    new: '/nodes/new',
    detail: '/nodes/{id}',
  },
  api: {
    login: '/api/auth/login',
    loginDev: '/api/auth/login/dev',
    logout: '/api/auth/logout',
    prefsUser: '/api/user/prefs',
    nodes: {
      list: '/api/nodes',
      detail: '/api/nodes/{id}',
      new: '/api/nodes/new',
      edit: '/api/nodes/{id}/edit',
    },
  },
};
