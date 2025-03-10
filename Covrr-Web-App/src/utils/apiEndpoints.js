const BASE_URL = process.env.REACT_APP_API_BASE_URL;

const endpoints = {
  graphql: `${BASE_URL}/graphql`,
  login: `${BASE_URL}/login`,
  refreshToken: `${BASE_URL}/refresh-token`,
  logout: `${BASE_URL}/logout`,
};

export default endpoints;
