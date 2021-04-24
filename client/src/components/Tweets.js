import React, { useEffect, useContext } from 'react';
import { io } from 'socket.io-client';
import '../App.css';
import TweetContext from '../context/tweets/tweetContext';
import TweetItem from './TweetItem';
const ENDPOINT = 'http://localhost:5000/';

const Tweets = () => {
  const tweetContext = useContext(TweetContext);

  const { addTweet, tweets } = tweetContext;

  useEffect(() => {
    const socket = io(ENDPOINT);

    socket.on('connect', () => {
      console.log('Connected to server...');
    });

    socket.on('tweet', (tweet) => {
      // console.log(tweet);
      addTweet(tweet);
      // eslint-disable-next-line
    });
  }, []);

  return (
    <div>
      <h2 style={{ textAlign: 'center' }}>Realtime Tweets</h2>
      <div className='tweet-container'>
        {tweets &&
          tweets
            .slice(0, 5)
            .map((tweet) => <TweetItem key={tweet.id} tweet={tweet} />)}
      </div>
    </div>
  );
};

export default Tweets;
