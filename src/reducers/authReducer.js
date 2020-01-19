const initialState = {
  loggedIn: false,
  user: {
    token: ""
  }
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN_SUCCESS": {
      console.log("log in success from reducer", action.payload);
      return { loggedIn: action.payload };
    }
    case "STORE_USER_DATA": {
      return { user: action.payload };
    }
    default:
      return state;
  }
};
export default authReducer;
