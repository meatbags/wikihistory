import { Timeline } from './timeline';

class Interface {
  constructor() {
    this.target = null;
    this.root = $('#ui-root');
    this.timeline = new Timeline();
    this.events();
  }

  setTarget(target) {
    // new target
    this.target = target;
    this.timeline.setTarget(target);
    this.timeline.generateHeatmap();
  }

  events() {
    this.root.on('click', '.day', (e) => {
      if (this.target && e.currentTarget.title) {
        this.timeline.toggleListRevisions(e.currentTarget);
      }
    });
    this.root.on('click', '.revision-list__inner .item .close', (e) => {
      this.timeline.removeListRevision($(e.currentTarget).parent().parent());
    });
  }
}

export { Interface };
