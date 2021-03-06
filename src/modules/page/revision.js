import { Parser } from './parser';
import { Analyser } from './analyser';

class Revision {
  constructor(title, data) {
    // revision object
    this.title = title;
    this.revid = data.revid;
    this.parentid = data.parentid;
    this.user = data.user;
    this.userid = data.anon ? -1 : data.userid;
    this.timestamp = data.timestamp;
    this.comment = data.comment || '';
    this.content = data.content || '';

    // parse given content
    if (this.content) {
      this.parse();
    }
  }

  parse() {
    // prep
    this.sections = {};
    this.parser = new Parser();
    this.analyser = new Analyser();

    // parse wikitext
    this.wrapper = this.parser.createWrapper(this.title, this.content, 'page__inner');
    this.wrapper.find('.section').each((i, e) => {
      const id = 'section-' + this.parser.sanitise($(e).data('title'));
      const p = $(e).find('.section-paragraph');
      p.attr('id', id);
      this.sections['#' + id] = p.text().trim();
    });
  }

  compareRevision(rev) {
    // compare revision, marking changes
    for (var key in this.sections) {
      if (this.sections.hasOwnProperty(key)) {
        const parent = $(key).parent();

        if (rev.sections.hasOwnProperty(key)) {
          this.analyser.analyse(this.sections[key], rev.sections[key]);
          this.analyser.markAnchor($(parent.data('anchor')));
          this.analyser.mark($(key));
        } else {
          // a new section
          parent.addClass('new');
          $(parent.data('anchor')).addClass('new');
        }
      }
    }

    // convert tags to HTML
    this.parser.parseAllTags(this.wrapper);
  }

  getHtml() {
    return this.wrapper;
  }
}

export { Revision };
