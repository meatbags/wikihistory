class Timeline {
  constructor() {
    this.target = null;
    this.months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  }

  setTarget(target) {
    this.target = target;
  }

  toggleListRevisions(e) {
    // revisions to/from list
    const $e = $(e);
    const ymd = e.id.split('-');
    const uid = `revli-${ymd[0]}${ymd[1]}${ymd[2]}`;
    $e.toggleClass('active');

    // reset highlight
    $('.revision-list__inner .item.newest').removeClass('newest');

    // toggle
    if ($e.hasClass('active')) {
      const revs = this.target.getRevisionsByDate(ymd[0], ymd[1], ymd[2]);
      if (revs.length) {
        this.addListRevisions(revs, uid, e.id);
      }
    } else {
      $('#' + uid).remove();
    }
  }

  getDateTitle(timestamp) {
    const d = new Date(timestamp);
    const day = d.getDate();
    return `${day < 10 ? '0' + day : day} ${this.months[d.getMonth()]} ${d.getFullYear()}`;
  }

  addListRevisions(revs, uid, parentId) {
    // construct
    const title = `${this.getDateTitle(revs[0].timestamp)} (${revs.length})`;
    const content = revs.map((e) => {
      var rev = $('<div />', {id: e.revid, class: 'item__content__rev'})
        .append($('<div />', {
          class: 'info',
          html: `<span class='bold'>${e.user}</span>&nbsp;<span class='tiny'>${e.comment}</span>`
        }))
        .append($('<div />', {
          class: 'status',
          html: 'pending'
        }));
      rev.data('id', e.revid);
      rev.data('timestamp', e.timestamp);

      return rev;
    });
    const $wrapper = $('<div />', {id: uid, class: 'item newest'})
      .append($('<div />', {class: 'item__title', html: title}).append($('<div />', {class: 'close', html:'x'})))
      .append($('<div />', {class: 'item__content'}).append(content));

    // data tags
    $wrapper.data('timestamp', revs[0].timestamp);
    $wrapper.data('parent', '#' + parentId)

    // order by time descending
    const ms = new Date(revs[0].timestamp).getTime();
    const items = $('.revision-list__inner .item');

    if (items.length) {
      let found = false;

      for (var i=0, len=items.length; i<len; ++i) {
        const ms2 = (new Date($(items[i]).data('timestamp'))).getTime();
        if (ms > ms2) {
          found = true;
          $(items[i]).before($wrapper);
          break;
        }
      }

      if (!found) {
        $('.revision-list__inner').append($wrapper);
      }
    } else {
      $('.revision-list__inner').append($wrapper);
    }
  }

  removeListRevision(rev) {
    $(rev.data('parent')).removeClass('active');
    rev.remove();
  }

  generateHeatmap() {
    // get limits
    const dateMap = this.target.getDateMap();
    const from = new Date(dateMap.earliest);
    const to = new Date();
    const y1 = from.getFullYear();
    const y2 = to.getFullYear();
    const m1 = from.getMonth();
    const m2 = to.getMonth();

    // doc
    const target = $('.timeline-heatmap');
    const labelTarget = $('.timeline-labels');
    target.html("");
    labelTarget.html("");

    // sizing
    const daySize = 10;
    let heatmapWidth = 0;
    let evenMonth = false;

    for (var y=y1; y<=y2; ++y) {
      const year = $('<div />', {class: 'year'});
      const label = $('<div />', {class: 'timeline-labels__label', html: y});
      const startDay = new Date(y, 0, 1).getDay();
      const mstart = (y == y1) ? m1 : 0;
      const mstop = (y == y2) ? m2 : 11;
      let daysInYear = startDay;

      // add offset days
      for (var i=0; i<startDay; ++i) {
        year.append($('<div />', {class: 'day hidden'}));
      }

      // iterate months, add days
      for (var m=mstart; m<=mstop; ++m) {
        let date = 1;
        const days = new Date(y, m + 1, 0).getDate();
        daysInYear += days;
        for (var d=0; d<days; ++d) {
          const uid = `${y}-${m}-${date++}`;
          const classes = 'day' + (evenMonth ? '' : ' alt');
          year.append($('<div />', {id: uid, class: classes}));
        }
        evenMonth = (evenMonth == false);
      }

      // resize elements
      const w = daySize * Math.ceil(daysInYear / 7);
      heatmapWidth += w;
      year.css({width: w});
      label.css({width: w});
      target.append(year);
      labelTarget.append(label);
    }

    // set css
    target.css({width: heatmapWidth});
    labelTarget.css({width: heatmapWidth});

    // show frequency
    dateMap.chartFrequency(this.heatMap);

    // go to end of timeline
    $('.heatmap').scrollLeft(heatmapWidth);
  }
}

export { Timeline };
