import {SET_SHUTTER} from '../action/action.types';

const shutterreducer = (state = false, action) => {
  switch (action.type) {
    case SET_SHUTTER:
      return action.data;

    default:
      return state;
  }
};

export default shutterreducer;
