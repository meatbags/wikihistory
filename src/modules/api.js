import { Page } from './page';

class API {
  constructor() {
    // api interface
    // NOTE use action=parse to get html in .content, setting rvprop=content reduces rate limit / 10 (500 -> 50)
    this.pages = {};
    this.users = {};
    this.endpoint = 'https://en.wikipedia.org/w/api.php';
    this.action = '?action=query';
    this.props = '&prop=revisions&rvprop=content|ids|user|userid|flags|tags|timestamp|comment|user&rvlimit=5';
    this.format = '&format=json&formatversion=2';
  }

  parsePage(key, page) {
    // create page, user
    if (!this.pages[key]) {
      this.pages[key] = new Page(key);
    }
    this.pages[key].parsePage(page);
  }

  getPage(title) {
    // build request string, get page
    const key = title.replace(/ /g, '%20');
    const req = `${this.endpoint}${this.action}&titles=${key}${this.props}${this.format}`;

    // send request
    $.ajax({
      type: 'POST',
      url: 'call_api.php',
      dataType: 'json',
      data: {request: req},
      success: (page) => { this.parsePage(key, page); },
      error: (err) => { console.warn('Error', err); }
    });
  }

  getMore() {
    // get more revisions of previous request
  }
}

export { API };
