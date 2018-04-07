import { Revision } from './revision';

class Page {
  constructor(data) {
    // page data container
    this.id = data.pageid;
    this.title = data.title;
    this.currentRevision = 0;
    this.revisions = [];
    this.target = $('<div />', {class: 'page', id: this.id});
    $('.content').append(this.target);

    // set up page
    this.addPageData(data);
  }

  addPageData(page) {
    // sample page
    const a = new Revision(this.title, page.revisions[0]);
    const b = new Revision(this.title, page.revisions[1]);
    this.revisions.push(a, b);
    this.target.html(
      this.revisions[this.currentRevision].getHtml()
    );
    a.comparePrevious(b);
  }
}

export { Page };
