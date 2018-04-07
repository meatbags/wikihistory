const TOKEN_MATCH = 'M';
const TOKEN_LEFT = 'L';
const TOKEN_RIGHT = 'R';
const TOKEN_NEW = 'N';

function toNumber(text) {
  let n1 = 0;
  let n2 = 0;
  for (var i=0, len=text.length; i<len; ++i) {
    const char = text[i].charCodeAt();
    n1 += char;
    n2 ^= (i % 3) ? char : -char;
  }
  return [n1, n2];
}

function eq(a, b) {
  return (a[0] == b[0] && a[1] == b[1]);
}

function editDistance(s1, s2) {
  // get word -> number arrays
  s1 = s1.replace(/[^a-z0-9 ]+/ig, '').toLowerCase();
  s2 = s2.replace(/[^a-z0-9 ]+/ig, '').toLowerCase();
  var a = s1.split(' ').map(toNumber);
  var b = s2.split(' ').map(toNumber);

  // map word edit tokens
  let created = 0;
  let shifted = 0;
  let index = 0;
  for (var i=0, len=a.length; i<len; ++i) {
    if (b.length) {
      const ai = a[i];

      if (eq(ai, b[index])) {
        a[i] = TOKEN_MATCH;
        b.splice(index, 1);
        index = Math.min(index, b.length - 1);
      } else {
        let success = false;

        // check backward
        for (var j=index-1; j>-1; --j) {
          if (eq(ai, b[j])) {
            a[i] = TOKEN_RIGHT;
            b.splice(j, 1);
            index = Math.min(b.length - 1, index);
            success = true;
            break;
          }
        }

        // check forward
        if (!success) {
          for (var j=index + 1, jmax=b.length; j<jmax; ++j) {
            if (eq(ai, b[j])) {
              a[i] = TOKEN_LEFT;
              b.splice(j, 1);
              index = Math.min(b.length - 1, index);
              success = true;
              break;
            }
          }
        }

        if (!success) {
          a[i] = TOKEN_NEW;
          index = Math.min(b.length - 1, index);
        }
      }
    } else {
      a[i] = TOKEN_NEW;
    }
  }

  console.log(s1, a);
  console.log(s2, b);
}

export { editDistance };
