const initialState = {
  doctorList: [],
  appointmentList: []
};

const hospitalReducer = (state = initialState, action) => {
  switch (action.type) {
    case "STORE_DOCS": {
      //   console.log("loading ", action.payload);
      return { doctorList: action.payload };
    }
    case "STORE_APPOINTMENTS": {
      //   console.log("loading ", action.payload);
      return { appointmentList: action.payload };
    }

    default:
      return state;
  }
};
export default hospitalReducer;
