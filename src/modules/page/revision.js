import { Parser } from './parser';
import { Analyser } from './analyser';

class Revision {
  constructor(title, data) {
    this.title = title;
    this.revid = data.revid;
    this.parentid = data.parentid;
    this.user = data.user;
    this.userid = data.anon ? -1 : data.userid;
    this.timestamp = data.timestamp;
    this.comment = data.comment | '';
    this.content = data.content;
    this.parser = new Parser();
    this.analyser = new Analyser();
    this.parse();
  }

  parse() {
    // parse wikitext, prepare for analysis
    this.parsed = this.parser.parse(this.title, this.content, 'page__inner');
    this.sections = {};
    this.parsed.find('.section').each((i, e) => {
      const id = 'section-' + $(e).data('title');
      const key = '#' + id;
      const p = $(e).find('.section-paragraph');
      p.attr('id', id);
      this.sections[key] = p.text().trim();
    });
  }

  comparePrevious(rev) {
    // compare revisions, mark changes, analyse
    for (var key in this.sections) {
      if (this.sections.hasOwnProperty(key)) {
        if (rev.sections.hasOwnProperty(key)) {
          this.analyser.analyse(this.sections[key], rev.sections[key]);
          this.analyser.mark($(key));
        } else {
          // new section
          const parent = $(key).parent();
          parent.addClass('new');
          if (parent.data('anchor')) {
            $(parent.data('anchor')).addClass('new');
          }
        }
      }
    }
  }

  getHtml() {
    return this.parsed;
  }
}

export { Revision };
