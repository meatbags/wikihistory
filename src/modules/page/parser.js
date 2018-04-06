import { config } from '../config';

class Parser {
  constructor() {
    this.urlBase = config.urlBase;
    this.replace = {
      "\n": ["<br />"],
      "{{": ["<div class='tag'>"],
      "}}": ["</div>"],
      "\\[\\[": ["<a>"],
      "\\]\\]": ["</a>"],
      "===": ["<div class='section-title italics'>", "</div>"],
      "==": ["<div class='section-title'>", "</div>"],
      "'''''": ["<span class='bold italics'>", "</span>"],
      "''": ["<span class='italics'>", "</span>"]
    };
    this.tags = {
      "efn": "note-ref",
      "notelist": "notelist",
      "cite": "cite",
      "citation": "cite",
      "reflist": "reflist",
      "quote": "quote",
      "official website": "ext-link"
    };
    this.remove = ["thumb", "about||", "expand section", "use", "infobox", "video game reviews"];
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
    wrapper.prepend($('<div />', {html: title, class:'section-title main-title'}));
    this.build(wrapper);

    return wrapper;
  }

  build(wrapper) {
    // tags -> classes
    wrapper.find('.tag').each((i, e) => {
      const lower = e.innerHTML.toLowerCase();
      for (var key in this.tags) {
        if (this.tags.hasOwnProperty(key)) {
          if (lower.indexOf(key) == 0) {
            e.classList.add(this.tags[key]);
          }
        }
      }
      for (var i=0, len=this.remove.length; i<len; ++i) {
        if (lower.indexOf(this.remove[i]) == 0) {
          $(e).remove();
        }
      }
    });

    // construct
    this.parseLinks(wrapper);
    this.parseNotes(wrapper);
    this.parseExternalLinks(wrapper);
    this.parseReferences(wrapper);
    this.parseQuotes(wrapper);
    this.parseSections(wrapper);
  }

  parseSections(wrapper) {
    const sections = wrapper.find('.section-title');
    const last = sections.length - 1;
    const open = '{{{';
    const close = '}}}';

    // use replace to avoid malformed html
    sections.each((i, e) => {
      // close
      if (i != 0) {
        $(e).before(close);
      }
      if (i == last) {
        wrapper.append(close);
      }

      // open
      $(e).before(open);
    });

    const openRegex = new RegExp(open, 'g');
    const closeRegex = new RegExp(close, 'g');
    const html = wrapper.html().replace(openRegex, '<div class="section">').replace(closeRegex, '</div>').replace(/<br><br><br>/g, '<br>').replace(/<br><br>/g, '<br>');
    wrapper.html(html);
    wrapper.find('.section-title').each((i, e) => {
      const $e = $(e);
      const title = $e.text().trim().replace(/ /g, '-');
      $e.parent().data('title', title);
    });
  }

  parseNotes(wrapper) {
    // create notes and link in document
    const noteList = wrapper.find('.notelist').html('');
    let notes = 0;
    wrapper.find('.note-ref').each((i, e) => {
      const $e = $(e);
      const letter = this.getLetter(++notes);
      const id = `note-${letter}`;
      const linkId = `link-${id}`;
      const link = $('<sup />').append($('<a />', {html: `[${letter}]`, href: `#${id}`, id: linkId}));
      let html = $e.html().split('|');
      html = html.splice(1, html.length - 1).join('&nbsp;')
      const note = $('<div />', {class: 'note', html: html, id: id});
      const noteLink = $('<a />', {html: `${letter}.`}).attr('href', `#${linkId}`);
      note.prepend(noteLink);
      $e.before(link).remove();
      noteList.append(note);
    });
  }

  parseQuotes(wrapper) {
    wrapper.find('.quote').each((i, e) => {
      $(e).before($('<blockquote />', {html: $(e).html().split('|')[1]})).remove();
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

  parseReferences(wrapper) {
    const refList = wrapper.find('.reflist').html('<div class="col"></div><div class="col"></div><div class="col"></div>');
    const columnSize = Math.ceil(wrapper.find('.cite').length / 3);
    let citations = 0;
    let col = 0;

    wrapper.find('ref').each((i, e) => {
      const $e = $(e);
      const $c = $e.find('.cite');
      const html = ($c.length) ? $c.html() : $e.html();

      // unique reference
      if (html.trim() != '') {
        const num = ++citations;
        col += (num % columnSize == 0) ? 1 : 0;
        const id = `ref-${num}`;
        const cite = $('<div />', {class: 'citation', id:id, html: `${num}.&nbsp;<span class='refs'></span>&nbsp;` + this.referenceText(html)});
        const linkId = id + '1';
        const link = $('<sup />').append($('<a />', {html: `[${num}]`, id:linkId, href: `#${id}`}));

        cite.data('number', num);
        if ($e.attr('name')) {
          cite.attr('name', $e.attr('name'));
        }

        cite.find('.refs').append($('<a />', {href: `#${linkId}`, class:'r', html: '<sup>^</sup>'}));
        $e.html('').append(link);
        refList.find('.col').eq(col).append(cite);
      } else {
        $e.addClass('ref-defer');
      }
    });

    // connect non-unique references
    wrapper.find('.ref-defer').each((i, e) => {
      const $e = $(e);
      const name = $e.attr('name');

      if (name != '') {
        const selector = `[name='${name}']`;
        const c = refList.find(selector);
        const rs = c.find('.r');
        const numRefs = rs.length;
        if (numRefs == 1) {
          rs.html('<sup>^a</sup>');
        }
        const linkId = c.attr('id') + '-' + numRefs;
        const link = $('<sup />').append($('<a />', {html: `<sup>[${c.data('number')}]</sup>`, href: `#${c.attr('id')}`, id: linkId}));
        $e.append(link);
        c.find('.refs').append($('<a />', {href: `#${linkId}`, class:'r', html: '<sup>' + this.getLetter(numRefs + 1) + '</sup>'}))
      }
    });
  }

  parseExternalLinks(wrapper) {
    wrapper.find('.ext-link').each((i, e) => {
      const link = $(e).html().split('|');
      $(e).before($('<a />', {href: link[1], html: link[0]})).remove();
    });
  }

  referenceText(html) {
    const ref = {};
    let res = '';
    html = html.split('|');

    if (html.length == 1) {
      return html[0];
    }

    html = html.splice(1, html.length - 1);

    for (var i=0, len=html.length; i<len; ++i) {
      const pair = html[i].split('=');
      if (pair.length > 1) {
        if (pair.length > 2) {
          pair[1] = pair.splice(1, pair.length - 1).join('=');
        }

        ref[pair[0]] = pair[1].trim();
      }
    }

    // name
    if (ref.last || ref.first || ref.first1 || ref.last1) {
      res += (ref.last) ? ref.last + ((ref.first) ? ', ' : ' '): ((ref.last1) ? ref.last1 + ((ref.first || ref.first1) ? ', ' : ' '): '');
      res += (ref.first) ? ref.first + ' ' : ((ref.first1) ? ref.first1 + ' ' : '');
      res += (ref.date) ? `(${ref.date}) ` : '';
      res += (ref.url) ? `<a href="${ref.url}">${ref.title || "Link"}</a> ` : '';
    } else {
      res += (ref.url) ? `<a href="${ref.url}">${ref.title || "Link"}</a> ` : '';
    }

    // source
    res += (ref.website) ? ref.website + ' ' : '';
    res += (ref.publisher) ? ref.publisher + ' ' : '';
    res += (ref.work) ? ref.work + ' ' : '';

    // accessed
    res += (ref.accessdate) ? ref.accessdate : ((ref['access-date']) ? ref['access-date'] : '');

    return res;
  }

  getLetter(n) {
    return String.fromCharCode(97 + ((n - 1) % 26));
  }
}

export { Parser };
