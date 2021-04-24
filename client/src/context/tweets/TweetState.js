import React, { useReducer } from 'react';
import TweetContext from './tweetContext';
import tweetReducer from './tweetReducer';
import { ADD_TWEET } from '../types';
import { v4 as uuid } from 'uuid';

const TweetState = (props) => {
  const initialState = {
    tweets: [],
  };

  const [state, dispatch] = useReducer(tweetReducer, initialState);

  // Add Tweet
  const addTweet = (tweet) => {
    tweet.id = uuid();
    dispatch({
      type: ADD_TWEET,
      payload: tweet,
    });
  };

  return (
    <TweetContext.Provider
      value={{
        tweets: state.tweets,
        addTweet,
      }}
    >
      {props.children}
    </TweetContext.Provider>
  );
};

export default TweetState;
