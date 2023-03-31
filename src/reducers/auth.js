import {SET_USER, IS_AUTHENTICATED} from '../action/action.types';

const initialstate = {
  user: null,
  loading: true,
  isauthenticated: false,
};

export default (state = initialstate, action) => {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        user: action.payload,
        loading: false,
      };
    case IS_AUTHENTICATED:
      return {
        ...state,
        isauthenticated: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};
