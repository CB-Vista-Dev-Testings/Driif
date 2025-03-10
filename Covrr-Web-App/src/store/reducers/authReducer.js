const initialState = {
  isAuthenticated: false,
  user: null,
  accessToken: null,
  refreshToken: null,
  roles: [],
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN_SUCCESS":
      return {
        ...state,
        // isAuthenticated: action.payload.accessToken && !action.payload.must_change_password ? true : false,
        isAuthenticated: action.payload.accessToken ? true : false,
        user: action.payload.user || null,
        accessToken: action.payload.accessToken || null,
        refreshToken: action.payload.refreshToken || null,
        roles: action.payload.roles || [],
      };
    case "LOGOUT":
      localStorage.clear();
      return initialState;
    default:
      return state;
  }
};

export default authReducer;
