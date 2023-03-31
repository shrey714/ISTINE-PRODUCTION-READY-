import {SET_PACKAGE, ERROR_PACKAGE} from '../action/action.types';

const initialstate = {
  packages: null,
  loading: true,
  error: false,
};

export default (state = initialstate, action) => {
  switch (action.type) {
    case SET_PACKAGE:
      return {
        ...state,
        packages: action.payload,
        loading: false,
        error: false,
      };
    case ERROR_PACKAGE:
      return {
        ...state,
        error: true,
      };
    default:
      return state;
  }
};
