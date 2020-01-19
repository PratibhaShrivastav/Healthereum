const initialState = {
  searchTerm: "",
  searchResult: []
};

const searchReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_SEARCH_TERM": {
      //   console.log("loading ", action.payload);
      return { searchTerm: action.payload };
    }
    case "SET_SEARCH_RESULT": {
      //   console.log("loading ", action.payload);
      return { searchResult: action.payload };
    }

    default:
      return state;
  }
};
export default searchReducer;
