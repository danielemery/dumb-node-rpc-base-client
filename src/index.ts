import axios from 'axios';

export default class DumbNodeRPCBaseClient {
  private apiUrl: string;
  constructor(apiUrl: string) {
    this.apiUrl = apiUrl;
  }

  async makeCall(serviceName: string, request: any) {
    const result = await axios.post(`${this.apiUrl}/${serviceName}`, request);
    return result.data;
  }
}
