import axios from 'axios';
import { ILogger } from '@danielemeryau/logger';

import parseDates from './src/parseDates';

export default class DumbNodeRPCBaseClient {
  private apiUrl: string;
  private logger: ILogger;
  constructor(apiUrl: string, logger: ILogger) {
    this.apiUrl = apiUrl;
    this.logger = logger;
  }

  async makeCall(serviceName: string, request: any) {
    this.logger.debug(serviceName, request);
    const result = await axios.post(`${this.apiUrl}/${serviceName}`, request);
    return parseDates(result.data);
  }
}
