const initialState = {
  loading: false
};

const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOADING": {
      console.log("loading ", action.payload);
      return { loading: action.payload };
    }

    default:
      return state;
  }
};
export default appReducer;
