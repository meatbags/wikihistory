import { Parser } from './parser';

class Page {
  constructor(data) {
    // page data container
    this.id = data.pageid;
    this.title = data.title;
    this.currentRevision = 0;
    this.revisions = [];
    this.target = $('<div />', {class: 'page', id: this.id});
    $('.content').append(this.target);
    this.parser = new Parser();

    // set up first page
    this.parsePage(data);
    this.showPage();
  }

  showPage() {
    const rev = this.revisions[this.currentRevision];
    this.target.html(this.parser.parse(this.title, rev.content, 'page__inner'));
  }
  
  parsePage(page) {
    // parse page
    for (var i=0, len=page.revisions.length; i<len; ++i) {
      this.revisions.push(page.revisions[i]);
    }
  }
}

export { Page };
