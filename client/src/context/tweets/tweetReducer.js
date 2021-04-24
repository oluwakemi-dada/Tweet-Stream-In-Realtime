import { ADD_TWEET } from '../types';

const twetReducer = (state, action) => {
  switch (action.type) {
    case ADD_TWEET:
      return {
        ...state,
        tweets: [action.payload, ...state.tweets],
      };

    default:
      return state;
  }
};

export default twetReducer;
