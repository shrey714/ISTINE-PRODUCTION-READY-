import {SET_COLOR} from './action.types';

const setPST = colors => {
  return {
    type: SET_COLOR,
    data: colors,
  };
};

export default setPST;
