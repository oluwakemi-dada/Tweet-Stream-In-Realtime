import React from 'react';

const TweetItem = ({ tweet }) => {
  return (
    <div className='tweet-wrapper'>
      <h5>{tweet.data.text}</h5>
      <h6
        style={{ color: '#333' }}
      >{`@${tweet.includes.users[0].username}`}</h6>
      <a
        href={`https://twitter.com/${tweet.includes.users[0].username}/status/${tweet.data.id}`}
        target='_blank'
      >
        Go To Tweet
      </a>
    </div>
  );
};

export default TweetItem;
