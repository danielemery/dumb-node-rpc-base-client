import { assert } from 'chai';

import DumbServer from '@danielemeryau/dumb-node-rpc-base-server';
import DumbClient from '..';
import Logger from '@danielemeryau/logger';

const testLogger = new Logger('integration-test');

const PORT = 3000;
const API_URL = `http://localhost:${PORT}`;

const SAMPLE_RESPONSE = {
  someString: 'hello, world',
  someNumber: 42,
};
const SAMPLE_RESPONSE_WITH_DATE = {
  testDate: new Date(),
};

class IntegrationTestServer extends DumbServer {
  constructor(loggerName: string, port: number) {
    super(loggerName, port);

    this.addRoute('/Get', () => Promise.resolve(SAMPLE_RESPONSE));
    this.addRoute('/GetDate', () => Promise.resolve(SAMPLE_RESPONSE_WITH_DATE));
  }
}

async function runTest() {
  const client = new DumbClient(API_URL, 'integration-test-client');
  const server = new IntegrationTestServer('integration-test-server', PORT);
  server.listen();

  const getResult = await client.makeCall('Get', {});
  assert.deepEqual(getResult, SAMPLE_RESPONSE);

  const getDateResult = await client.makeCall('GetDate', {});
  assert.deepEqual(getDateResult, SAMPLE_RESPONSE_WITH_DATE);
}

testLogger.info('Starting integration test');
runTest()
  .then(() => {
    testLogger.info('Integration test completed successfully');
    process.exit(0);
  })
  .catch(() => {
    process.exit(1);
  });
