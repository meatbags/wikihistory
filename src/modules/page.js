import { parseWikiText } from './parser';

class Page {
  constructor(title, data) {
    // page data container
    this.title = title;
    this.id = data.pageid;
    this.currentRevision = 0;
    this.revisions = [];
    this.target = $('<div />', {class: 'page', id: this.id});
    $('.content').append(this.target);

    // set up first page
    this.parsePage(data);
    this.showPage();
  }

  showPage() {
    const rev = this.revisions[this.currentRevision];
    this.target.html(parseWikiText(rev.content));
  }

  parsePage(page) {
    // parse page
    for (var i=0, len=page.revisions.length; i<len; ++i) {
      this.revisions.push(page.revisions[i]);
    }
  }
}

/*
res
  continue
    - continue ||
    - rvcontinue
  limit
    - revisions 50
  query
    pages[]
      - id
      - title
      - revision
*/

export { Page };
