import Master from './modules/master';

class App {
  constructor() {
    this.master = new Master();
  }
}

window.onload = () => {
  const app = new App();
}
