import { Parser } from './parser';
import * as Analysis from './analysis';

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
    this.parse();
  }

  parse() {
    // parse wikitext, prepare for analysis
    this.parsed = this.parser.parse(this.title, this.content, 'page__inner');
    this.sections = {};
    this.parsed.find('.section').each((i, e) => {
      const title = $(e).data('title');
      this.sections[title] = $(e).text().trim();
    });
  }

  getHtml() {
    return this.parsed;
  }

  compare(rev) {
    // compare revisions, mark changes, analyse
    const test1 = 'a b c d e f';
    const test2 = 'a b c d e f';
    Analysis.editDistance(test1, test2);
  }
}

export { Revision };
