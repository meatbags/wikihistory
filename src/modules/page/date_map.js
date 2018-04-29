import { clamp } from '../utils';

class DateMap {
  constructor(revs) {
    this.latest = revs.length ? revs[0].timestamp : null;
    this.earliest = revs.length ? revs[revs.length - 1].timestamp : null;
    this.threshold = 10;

    // chart
    this.mapFrequency(revs);
  }

  getRevisionIndices(y, m, d) {
    if (this.freq[y] && this.freq[y][m] && this.freq[y][m][d]) {
      return this.freq[y][m][d].indices;
    } else {
      return [];
    }
  }

  mapFrequency(revs) {
    // get daily revision frequency
    this.freq = {total: 0};

    for (var i=0, len=revs.length; i<len; ++i) {
      const date = new Date(revs[i].timestamp);
      const y = date.getFullYear();
      const m = date.getMonth();
      const d = date.getDate();

      this.freq[y] = this.freq[y] === undefined ? {total: 0} : this.freq[y];
      this.freq[y][m] = this.freq[y][m] === undefined ? {total: 0} : this.freq[y][m];
      this.freq[y].total += 1;
      this.freq[y][m].total += 1;
      this.freq.total += 1;

      // set day
      if (this.freq[y][m][d] === undefined) {
        const sel = `#${y}-${m}-${d}`;
        this.freq[y][m][d] = {total: 1, selector: sel, indices:[i]};
      } else {
        this.freq[y][m][d].total += 1;
        this.freq[y][m][d].indices.push(i);
      }
    }
  }

  chart(item, y, m, d) {
    // colour chart item (day)
    var c = 1.0 - (clamp(item.total / this.threshold, 0.0, 1.0) * 0.9 + 0.1);
    c = Math.round(c * 255);
    c = c < 16 ? '0' + c.toString(16) : c.toString(16);
    c = `#${c}${c}${c}`;
    const $e = $(item.selector);
    $e.css({background: c});
    const title = `${item.total} ${(item.total > 1) ? 'edits' : 'edit'}, ${(new Date(y, m, d)).toDateString()}`;
    $e.prop('title', title);
  }

  chartFrequency(target) {
    // colour time chart
    for (var y in this.freq) {
      for (var m in this.freq[y]) {
        for (var d in this.freq[y][m]) {
          this.chart(this.freq[y][m][d], y, m, d);
        }
      }
    }
  }
}

export { DateMap };
