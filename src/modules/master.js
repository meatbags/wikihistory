import { APIHandler } from './api';
import { Page } from './page';

class Master {
  constructor() {
    this.api = new APIHandler();
    this.pages = {};
    this.users = {};

    // test
    this.getSample('Bjork');
    //this.getSample('Donald Trump');
  }

  getPage(title) {
    this.api.getPage(title)
      .then((res) => { this.onResponse(res); })
      .catch((err) => { console.warn('Err', err); });
  }

  getSample(title) {
    this.api.sampleRequest(title)
      .then((res) => { this.onResponse(res); })
      .catch((err) => { console.warn('Err', err); });
  }

  onResponse(res) {
    console.log(res);
    const key = this.api.formatTitle(res.query.pages[0].title);
    if (!this.pages[key]) {
      this.pages[key] = new Page(res.query.pages[0]);
    } else {
      this.pages[key].parsePage(res.query.pages[0]);
    }
  }
}

export { Master };
