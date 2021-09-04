const ADD_PLANDATA = "ADD_PLANDATA";
const initState = {
  planData: {},
};

const orderReducer = (state = initState, action) => {
  switch (action.type) {
    case ADD_PLANDATA:
      return { planData: action.payload.planData };

    default:
      console.log(state);
      return state;
  }
};

export default orderReducer;
