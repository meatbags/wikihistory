import * as Module from './modules/master';

class App {
  constructor() {
    this.master = new Module.Master();
  }
}

window.onload = () => {
  const app = new App();
}
