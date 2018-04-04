import { APIHandler } from './api';
import { Page } from './page';

class Master {
  constructor() {
    this.api = new APIHandler();
    this.pages = {};
    this.users = {};

    // test
    //this.api.getPage('Dark Souls');

    this.api.sampleRequest('Dark Souls')
      .then((res) => { this.parseResponse(res); })
      .catch((err) => { console.warn('Err', err); });
  }

  parseResponse(res) {
    const key = this.api.formatTitle(res.query.pages[0].title);
    if (!this.pages[key]) {
      this.pages[key] = new Page(res.query.pages[0]);
    } else {
      this.pages[key].parsePage(res.query.pages[0]);
    }
  }
}

export { Master };
