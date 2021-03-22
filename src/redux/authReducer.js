import { USER_SET } from "./authActions";

const initialState = {
  user: "",
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_SET:
      return {
        ...state,
        user: action.payload.user,
      };
    default:
      return state;
  }
};

export default authReducer;
