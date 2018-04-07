import { clamp } from '../maths';
const TOKEN_SAME = '==';
const TOKEN_LEFT = '<<';
const TOKEN_RIGHT = '>>';
const TOKEN_UNIQUE = '+';

class Analyser {
  constructor() {
    this.tokens = [];
    this.words = {
      unique: 0,
      total: 0,
      shifted: 0
    };
  }

  reset() {
    this.tokens = [];
    this.words.unique = 0;
    this.words.total = 0;
    this.words.shifted = 0;
  }

  show(wrapper, text) {
    // insert edit tags
    const html = wrapper.html();
    let index = 0;

  }

  getAmountChanged() {
    return (this.words.total) ? this.words.unique / this.words.total : 0;
  }

  analyse(s1, s2) {
    // analyse difference between strings
    const a = this.stringToValueArray(s1);
    const b = this.stringToValueArray(s2);

    // map words to edit tokens
    this.reset();
    this.words.total = Math.max(a.length, b.length);
    let index = 0;
    for (var i=0, len=a.length; i<len; ++i) {
      if (b.length) {
        if (this.eq(a[i], b[index])) {
          this.tokens.push(TOKEN_SAME);
          b.splice(index, 1);
          index = clamp(index, 0, b.length - 1);
        } else {
          const ai = a[i]
          let success = false;

          // check backward
          for (var j=index-1; j>-1; --j) {
            if (this.eq(ai, b[j])) {
              this.tokens.push(TOKEN_RIGHT);
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
                this.tokens.push(TOKEN_LEFT);
                b.splice(j, 1);
                index = clamp(index + 1, 0, b.length - 1);
                success = true;
                this.words.shifted++;
                break;
              }
            }
          }

          if (!success) {
            this.tokens.push(TOKEN_UNIQUE);
            index = clamp(index + 1, 0, b.length - 1);
            this.words.unique++;
          }
        }
      } else {
        this.tokens.push(TOKEN_UNIQUE);
        this.words.unique++;
      }
    }
  }

  stringToValueArray(string) {
    return this.sanitise(string).split(' ').map(this.getFuzzyValues);
  }

  sanitise(string) {
    // whitelist letters numbers & spaces
    return string.replace(/[^a-z0-9 ]+/ig, '').toLowerCase();
  }

  getFuzzyValues(word) {
    // get single values for word
    let n1 = 0;
    let n2 = 0;
    for (var i=0, len=word.length; i<len; ++i) {
      const char = word[i].charCodeAt();
      n1 += char;
      n2 ^= (i % 3) ? char : -char; // defuzz anagrams (close enough)
    }

    return [n1, n2];
  }

  eq(a, b) {
    // fuzzy word comparison
    return (a[0] == b[0] && a[1] == b[1]);
  }
}

export { Analyser };
