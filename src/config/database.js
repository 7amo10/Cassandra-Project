const cassandra = require('cassandra-driver');

const client = new cassandra.Client({
  contactPoints: process.env.CASSANDRA_CONTACT_POINTS?.split(',') || ['localhost'],
  localDataCenter: process.env.CASSANDRA_DATACENTER || 'datacenter1',
  keyspace: process.env.CASSANDRA_KEYSPACE || 'student_management',
  credentials: {
    username: process.env.CASSANDRA_USERNAME || 'cassandra',
    password: process.env.CASSANDRA_PASSWORD || 'cassandra'
  },
  queryOptions: {
    consistency: cassandra.types.consistencies.one, // Changed from localQuorum to ONE
    prepare: true
  }
});

async function connectWithRetry(maxRetries = 5, delay = 5000) {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      await client.connect();
      return true;
    } catch (err) {
      if (attempt === maxRetries) throw err;
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
}

module.exports = { client, connectWithRetry };