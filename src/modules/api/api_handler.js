import { config, samples } from '../config';

class APIHandler {
  constructor() {
    // NOTE use action=parse to get html in .content, setting rvprop=content reduces rate limit / 10 (500 -> 50) ?
    this.endpoint = config.endpoint;
    this.action = '?action=query';
    this.props = '&prop=revisions&rvprop=content|ids|user|userid|flags|tags|timestamp|comment|user&rvlimit=5';
    this.format = '&format=json&formatversion=2';
  }

  getPage(title) {
    // build request string, get page
    const req = `${this.endpoint}${this.action}&titles=${title.replace(/ /g, '%20')}${this.props}${this.format}`;
    console.log('Request:', req);
    return new Promise((resolve, reject) => {
      $.ajax({
        type: 'POST',
        url: 'call_api.php',
        dataType: 'json',
        data: {request: req},
        success: (res) => { resolve(res); },
        error: (err) => { reject(err); }
      })
    });
  }

  sampleRequest(title) {
    const key = this.formatTitle(title);
    return new Promise((resolve, reject) => {
      if (samples[key]) {
        resolve(samples[key]);
      } else {
        reject(key);
      }
    });
  }

  formatTitle(title) {
    return title.toLowerCase().replace(/ /g, '_');
  }
}

export { APIHandler };
