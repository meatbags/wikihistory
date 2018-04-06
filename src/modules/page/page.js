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

    // show first page
    this.target.html(
      this.revisions[this.currentRevision].getParsedContent()
    );
  }

  showPage() {
    //const rev = this.revisions[this.currentRevision];
    //this.target.html(this.parser.parse(this.title, rev.content, 'page__inner'));
  }

  addPageData(page) {
    for (var i=0, len=page.revisions.length; i<len; ++i) {
      this.revisions.push(
        new Revision(this.title, page.revisions[i])
      );
    }
  }
}

export { Page };
