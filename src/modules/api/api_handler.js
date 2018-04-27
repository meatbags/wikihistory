import { config, samples, metaSamples } from '../config';

class APIHandler {
  constructor() {
    // NOTE use action=parse to get html in content
    // setting rvprop=content reduces rate limit by 10 times
    this.endpoint = config.endpoint;
    this.action = '?action=query';
    this.props = {
      meta: '&prop=revisions&rvprop=ids|user|userid|flags|tags|timestamp|comment|user',
      content: '&prop=revisions&rvprop=content|ids|user|userid|flags|tags|timestamp|comment|user'
    };
    this.limit = {
      meta: '&rvlimit=max',
      content: '&rvlimit=5'
    };
    this.format = '&format=json&formatversion=2';
  }

  getRevMeta(title) {
    // build request string, get meta
    const props = `${this.props.meta}${this.limit.meta}`;
    const req = `${this.endpoint}${this.action}&titles=${title.replace(/ /g, '%20')}${props}${this.format}`;
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

  getRevContent(title) {
    // build request string, get page
    const props = `${this.props.content}${this.limit.content}`;
    const req = `${this.endpoint}${this.action}&titles=${title.replace(/ /g, '%20')}${props}${this.format}`;
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

  getSampleContent(title) {
    const key = this.formatTitle(title);
    return new Promise((resolve, reject) => {
      if (samples[key]) {
        resolve(samples[key]);
      } else {
        reject(key);
      }
    });
  }

  getSampleMeta(title) {
    const key = this.formatTitle(title);
    return new Promise((resolve, reject) => {
      if (metaSamples[key]) {
        resolve(metaSamples[key]);
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
