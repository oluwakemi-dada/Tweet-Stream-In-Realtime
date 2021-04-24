import React from 'react';
import Tweets from './components/Tweets';
import TweetState from './context/tweets/TweetState';

function App() {
  return (
    <TweetState>
      <div className='App'>
        <Tweets />
      </div>
    </TweetState>
  );
}

export default App;
