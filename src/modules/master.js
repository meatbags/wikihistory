import { APIHandler } from './api';
import { Page } from './page';
import { Interface } from './ui';

class Master {
  constructor() {
    this.api = new APIHandler();
    this.ui = new Interface();
    this.pages = {};
    this.users = {};

    // test
    this.title = 'A Wind Named Amnesia';
    this.key = this.api.formatTitle(this.title);
    this.getSampleMeta(this.title);
  }

  getMeta(title) {
    // get meta
    this.api.getRevMeta(title).then((r) => {
      console.log(r);
    }).catch((e) => {
      console.warn(e);
    });
  }

  getPage(title) {
    // get page via API
    this.api.getRevContent(title).then((res) => {
      this.onResponse(res);
    }).catch((err) => {
      console.warn('Err', err);
    });
  }

  getSampleMeta(title) {
    // get meta via sample dir
    this.api.getSampleMeta(title).then((res) => {
      this.onResponse(res);
    }).catch((err) => {
      console.warn('Err', err);
    });
  }

  getSamplePage(title) {
    // get page via sample dir
    this.api.getSampleContent(title).then((res) => {
      this.onResponse(res);
    }).catch((err) => {
      console.warn('Err', err);
    });
  }

  onResponse(res) {
    // send response to page
    const key = this.api.formatTitle(res.query.pages[0].title);

    if (!this.pages[key]) {
      this.pages[key] = new Page(res.query.pages[0]);
    } else {
      this.pages[key].addPageData(res.query.pages[0]);
    }

    this.afterResponse();
  }

  afterResponse() {
    this.ui.setTarget(this.pages[this.key]);
    this.ui.generateHeatmap();
  }
}

export { Master };
