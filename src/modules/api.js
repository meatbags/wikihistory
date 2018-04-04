import { config } from './config';
import { Page } from './page';
import { samples } from './samples';

class API {
  constructor() {
    // api interface
    // NOTE use action=parse to get html in .content, setting rvprop=content reduces rate limit / 10 (500 -> 50)
    this.pages = {};
    this.users = {};
    this.endpoint = config.endpoint;
    this.action = '?action=query';
    this.props = '&prop=revisions&rvprop=content|ids|user|userid|flags|tags|timestamp|comment|user&rvlimit=5';
    this.format = '&format=json&formatversion=2';
  }

  parseResponse(key, res) {
    if (!this.pages[key]) {
      this.pages[key] = new Page(res.query.pages[0]);
    } else {
      this.pages[key].parsePage(res.query.pages[0]);
    }
  }

  getPage(title) {
    // build request string, get page
    const key = this.formatTitle(title);
    const req = `${this.endpoint}${this.action}&titles=${title.replace(/ /g, '%20')}${this.props}${this.format}`;

    // request
    $.ajax({
      type: 'POST',
      url: 'call_api.php',
      dataType: 'json',
      data: {request: req},
      success: (res) => {
        this.parseResponse(key, res);
      },
      error: (err) => {
        console.warn('Error', err);
      }
    });
  }

  sampleRequest(title) {
    const key = this.formatTitle(title);

    if (samples[key]) {
      this.parseResponse(key, samples[key]);
    } else {
      console.log('No sample found:', title, key);
    }
  }

  formatTitle(title) {
    return title.toLowerCase().replace(/ /g, '_');
  }

  getMore() {
    // get more revisions of previous request
  }
}

export { API };
