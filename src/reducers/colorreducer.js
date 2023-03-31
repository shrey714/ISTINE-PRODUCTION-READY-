import {SET_COLOR} from '../action/action.types';

const initialState = {
  colours: {
    Primarycolor: '#fff',
    Secondarycolor: '#900',
    Ternarycolor: '#adadad',
  },
};

const colorreducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_COLOR:
      return {
        colours: action.data,
      };

    default:
      return state;
  }
};

export default colorreducer;
