import { clamp } from '../maths';
const TOKEN_SAME = '==';
const TOKEN_LEFT = '<<';
const TOKEN_RIGHT = '>>';
const TOKEN_UNIQUE = '+';

class Analyser {
  constructor() {
    this.regex = {
      splitText: /[^a-z0-9]/ig,
      prefixOk: /[^a-zA-Z]/
    };
    this.tokens = [];
    this.words = {
      added: 0,
      deleted: 0,
      shifted: 0,
      total: 0
    };
  }

  reset() {
    this.tokens = [];
    this.words.added = 0;
    this.words.deleted = 0;
    this.words.shifted = 0;
    this.words.total = 0;
  }

  getAmountChanged() {
    if (this.words.total) {
      return [
        this.words.added / this.words.total,
        this.words.deleted / this.words.total,
        this.words.shifted / this.words.total
      ];
    } else {
      return [0, 0, 0];
    }
  }

  mark(elem) {
    // mark element with edit tags
    let index = 0;
    let html = elem.text();
    const noIndex = [];
    const spanClose = '</span>';

    for (var i=0, len=this.tokens.length; i<len; ++i) {
      const str = this.tokens[i][0];
      const token = this.tokens[i][1];
      let nextIndex = this.getNextIndex(html, str, index);

      if (nextIndex != -1) {
        const span = this.tokenTag(token) + str + spanClose;
        html = this.replaceAfterIndex(html, str, span, nextIndex);
        index = nextIndex + span.length;
      } else {
        noIndex.push(str);
      }
    }

    if (noIndex.length) {
      console.warn(elem.parent().attr('id'), 'Null index:', noIndex.length, noIndex.join('__'));
    }
    elem.html(html);
  }

  getNextIndex(text, str, index) {
    let found = false;
    let next = 0;

    while (!found) {
      next = text.indexOf(str, index);

      // check if not substring
      if (next <= 0) {
        found = true;
      } else {
        if (text[next - 1].search(this.regex.prefixOk) != -1) {
          found = true;
        } else {
          index = next + 1;
        }
      }
    }

    return next;
  }

  replaceAfterIndex(s, search, replace, index) {
    return s.substring(0, index) + s.substring(index, s.length).replace(search, replace);
  }

  sanitisedWordArray(string) {
    const arr = string.split(this.regex.splitText);

    for (var i=arr.length-1; i>-1; --i) {
      if (arr[i].length == 0) {
        arr.splice(i, 1);
      }
    }

    return arr;
  }

  analyse(s1, s2) {
    // analyse difference between strings
    const keys = this.sanitisedWordArray(s1);
    const a = keys.map(this.getWordValue);
    const b = this.sanitisedWordArray(s2).map(this.getWordValue);
    //console.log(keys);

    // map words to edit tokens
    this.reset();
    this.words.total = Math.max(a.length, b.length);
    let index = 0;

    for (var i=0, len=a.length; i<len; ++i) {
      const key = keys[i];

      if (b.length) {
        const ai = a[i];
        if (this.eq(ai, b[index])) {
          this.tokens.push([key, TOKEN_SAME]);
          b.splice(index, 1);
          index = clamp(index, 0, b.length - 1);
        } else {
          let success = false;

          // check backward
          for (var j=index-1; j>-1; --j) {
            if (this.eq(ai, b[j])) {
              this.tokens.push([key, TOKEN_RIGHT]);
              b.splice(j, 1);
              index = clamp(index, 0, b.length - 1);
              success = true;
              this.words.shifted++;
              break;
            }
          }

          // check forward
          if (!success) {
            for (var j=index + 1, jmax=b.length; j<jmax; ++j) {
              if (this.eq(ai, b[j])) {
                this.tokens.push([key, TOKEN_LEFT]);
                b.splice(j, 1);
                index = clamp(index + 1, 0, b.length - 1);
                success = true;
                this.words.shifted++;
                break;
              }
            }
          }

          if (!success) {
            this.tokens.push([key, TOKEN_UNIQUE]);
            index = clamp(index + 1, 0, b.length - 1);
            this.words.added++;
          }
        }
      } else {
        this.tokens.push([key, TOKEN_UNIQUE]);
        this.words.added++;
      }
    }

    // unmatched words from second string
    this.words.deleted = b.length;
  }

  getWordValue(word) {
    // get single values for word (fuzzy)
    word = word.toLowerCase();
    let n1 = 0;
    let n2 = 0;
    for (var i=0, len=word.length; i<len; ++i) {
      const char = word[i].charCodeAt();
      n1 += char;
      n2 ^= (i % 3) ? char : -char; // defuzz anagrams a bit (good enough)
    }

    return [n1, n2];
  }

  tokenTag(token) {
    if (token == TOKEN_UNIQUE) {
      return '<span class="new">';
    } else if (token == TOKEN_LEFT) {
      return '<span class="shift-left">';
    } else if (token == TOKEN_RIGHT) {
      return '<span class="shift-right">';
    } else {
      return '<span class="mark">';
    }
  }

  eq(a, b) {
    // fuzzy word comparison
    return (a[0] == b[0] && a[1] == b[1]);
  }
}

export { Analyser };
