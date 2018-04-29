import { Revision } from './revision';
import { DateMap } from './date_map';

class Page {
  constructor(data) {
    // props
    this.currentRevision = 0;

    // parse meta
    this.meta(data);

    // doc
    this.root = $('#content-root');
    this.target = $('<div />', {class: 'page', id: this.id});
    this.root.append(this.target);

    // set up page
    // this.addPageData(data);
  }

  meta(data) {
    this.id = data.pageid;
    this.title = data.title;
    this.revisions = data.revisions;

    // dates
    this.dateMap = new DateMap(this.revisions);
  }

  getRevisionsByDate(y, m, d) {
    return this.dateMap.getRevisionIndices(y, m, d).map((i) => {
      return this.revisions[i];
    });
  }

  getDateMap() {
    return this.dateMap;
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
