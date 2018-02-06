import API from './api';

class Master {
  constructor() {
    this.api = new API();

    // test

    this.api.getPage('Dark Souls');
  }
}

export default Master;
