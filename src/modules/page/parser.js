import { config } from '../config';

class Parser {
  constructor() {
    this.urlBase = config.urlBase;
    this.replace = {
      "{{": ["<span class='tag'>"],
      "}}": ["</span>"],
      "\\[\\[": ["<a>"],
      "\\]\\]": ["</a>"],
      "===": ["<div class='subsection-title'>", "</div>"],
      "==": ["<div class='section-title'>", "</div>"],
      "'''''": ["<span class='bold italics'>", "</span>"],
      "''": ["<span class='italics'>", "</span>"]
    };
    this.tags = {
      "efn": "note",
      "notelist": "notelist",
      "cite": "cite",
      "Reflist": "reflist"
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
    this.build(wrapper);

    return wrapper;
  }

  build(wrapper) {
    // tags -> classes
    wrapper.find('.tag').each((i, e) => {
      for (var key in this.tags) {
        if (this.tags.hasOwnProperty(key)) {
          if (e.innerHTML.indexOf(key) == 0) {
            e.classList.add(this.tags[key]);
          }
        }
      }
    });

    // construct
    this.parseLinks(wrapper);
    this.parseNotes(wrapper);
    this.parseCitations(wrapper);
  }

  parseNotes(wrapper) {
    // create notes and link in document
    wrapper.find('.notelist').html('');
    let notes = 0;
    wrapper.find('.note').each((i, e) => {
      const $e = $(e);
      const letter = this.getLetter(++notes);
      const id = `note-${letter}`;
      const linkId = `link-${id}`;
      const link = $('<a />', {html: `[${letter}]`, class: 'super', id: linkId}).attr('href', `#${id}`);
      let h = $e.html().split('|');
      h = '&nbsp;' + h.splice(1, h.length - 1).join('');
      const note = $('<div />', {html: h, id: id});
      const noteLink = $('<a />', {html: `${letter}.`}).attr('href', `#${linkId}`);
      note.prepend(noteLink);
      $e.before(link);
      $e.remove();
      wrapper.find('.notelist').append(note);
    });
  }

  parseLinks(wrapper) {
    wrapper.find('a').each((i, e) => {
      const inner = e.innerHTML.split('|');
      e.href = this.urlBase + inner[0].replace(/ /g, '_');
      e.innerHTML = (inner.length > 1) ? inner[1] : e.innerHTML;
      e.target = '_blank';
    });
  }

  parseCitations(wrapper) {
    const c = wrapper.find('.cite');
    const columnSize = Math.ceil(c / 3);
    let citations = 0;
    c.each((i, e) => {
      
    });
  }

  getLetter(n) {
    return String.fromCharCode(97 + ((n - 1) % 26));
  }
}

export { Parser };
