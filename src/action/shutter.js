import {SET_SHUTTER} from './action.types';

const shutter = shutterstatus => {
  return {
    type: SET_SHUTTER,
    data: shutterstatus,
  };
};

export default shutter;
