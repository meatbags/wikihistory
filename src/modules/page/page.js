import { Revision } from './revision';

class Page {
  constructor(data) {
    // page data container
    this.id = data.pageid;
    this.title = data.title;
    this.currentRevision = 0;
    this.revisions = [];
    this.root = $('#content-root');
    this.target = $('<div />', {class: 'page', id: this.id});
    this.root.append(this.target);

    // set up page
    this.addPageData(data);
  }

  addPageData(page) {
    // NOTE testing, oldest VS newest
    const a = new Revision(this.title, page.revisions[0]);
    const b = new Revision(this.title, page.revisions[page.revisions.length - 1]);
    this.revisions.push(a, b);
    this.target.html(this.revisions[this.currentRevision].getHtml());
    a.compareRevision(b);
  }
}

export { Page };
