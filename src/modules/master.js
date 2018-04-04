import { API } from './api';

class Master {
  constructor() {
    this.api = new API();

    // test
    this.api.sampleRequest('Dark Souls');
  }
}

export { Master };
