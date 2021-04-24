const needle = require('needle');
const TOKEN = process.env.TWITTER_BEARER_TOKEN;

// RULES
const rulesURL = 'https://api.twitter.com/2/tweets/search/stream/rules';
const streamURL =
  'https://api.twitter.com/2/tweets/search/stream?tweet.fields=public_metrics&expansions=author_id';

const rules = [
  { value: '#react -is:retweet' },
  { value: '#reactjs -is:retweet' },
  { value: 'javascript -is:retweet' },
  { value: '#nodejs -is:retweet' },
  { value: '#express -is:retweet' },
];

module.exports = {
  // Get stream rules
  getRules: async () => {
    const response = await needle('get', rulesURL, {
      headers: {
        Authorization: `Bearer ${TOKEN}`,
      },
    });

    console.log(response.body);
    return response.body;
  },

  // Set stream rules
  setRules: async () => {
    const data = {
      add: rules,
    };

    const response = await needle('post', rulesURL, data, {
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${TOKEN}`,
      },
    });

    return response.body;
  },

  // Delete stream rules
  deleteRules: async (rules) => {
    if (!Array.isArray(rules.data)) {
      return null;
    }

    const ids = rules.data.map((rule) => rule.id);

    const data = {
      delete: {
        ids: ids,
      },
    };

    const response = await needle('post', rulesURL, data, {
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${TOKEN}`,
      },
    });

    return response.body;
  },

  // Stream tweets
  streamTweets: (socket) => {
    const stream = needle.get(streamURL, {
      headers: {
        Authorization: `Bearer ${TOKEN}`,
      },
    });

    stream.on('data', (data) => {
      try {
        const json = JSON.parse(data);
        // console.log(json);
        socket.emit('tweet', json);
      } catch (err) {}
    });
  },
};
