import axios from 'axios';
import Logger from '@danielemeryau/logger';

import parseDates from './src/parseDates';

export default class DumbNodeRPCBaseClient {
  private apiUrl: string;
  private logger: Logger;
  constructor(apiUrl: string, loggerName: string) {
    this.apiUrl = apiUrl;
    this.logger = new Logger(loggerName);
  }

  async makeCall(serviceName: string, request: any) {
    this.logger.debug(serviceName, request);
    const result = await axios.post(`${this.apiUrl}/${serviceName}`, request);
    return parseDates(result.data);
  }
}
