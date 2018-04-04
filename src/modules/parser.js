import { config } from './config';

class Parser {
  constructor() {
    this.urlBase = config.urlBase;
    this.replace = {
      "{{": ["<div>"],
      "}}": ["</div>"],
      "\\[\\[": ["<a>"],
      "\\]\\]": ["</a>"],
      "===": ["<div class='subsection-title'>", "</div>"],
      "==": ["<div class='section-title'>", "</div>"],
      "'''''": ["<span class='bold italics'>", "</span>"],
      "''": ["<span class='italics'>", "</span>"]
    };
  }

  parse(title, wikitext, wrapperClass) {
    // wikitext -> jquery object
    const wrapper = $('<div />', {class: wrapperClass});

    // replace
    for (var key in this.replace) {
      if (this.replace.hasOwnProperty(key)) {
        if (this.replace[key].length == 1) {
          wikitext = wikitext.replace(new RegExp(key, 'g'), this.replace[key][0]);
        } else {
          const len = this.replace[key].length;
          let n = 0;
          wikitext = wikitext.replace(new RegExp(key, 'g'), (x) => {
            const i = n++ % len;
            return this.replace[key][i];
          });
        }
      }
    }

    // build object
    wrapper.html(wikitext);
    wrapper.prepend($('<div />', {html: title, class:'main-title'}));
    this.buildLinks(wrapper.find('a'));

    return wrapper;
  }

  replaceNth(str, pattern, replace, n) {
    return str.replace(pattern, )
  }

  buildLinks(tags) {
    tags.each((i, e) => {
      const inner = e.innerHTML.split('|');
      e.href = this.urlBase + inner[0].replace(/ /g, '_');
      e.innerHTML = (inner.length > 1) ? inner[1] : e.innerHTML;
      e.target = '_blank';
    });
  }
}

export { Parser };
