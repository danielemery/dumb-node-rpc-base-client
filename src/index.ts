import axios from 'axios';
import Logger from '@danielemeryau/logger';

const dateFormat = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/;

function parseDates(part: any): any {
  if (typeof part === 'object' && part !== null) {
    return Object.keys(part).reduce((acc, key) => {
      return {
        ...acc,
        [key]: parseDates(part[key]),
      };
    }, {});
  } else if (typeof part === 'string' && dateFormat.test(part)) {
    return new Date(part);
  }
  return part;
}

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
