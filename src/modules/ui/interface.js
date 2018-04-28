class Interface {
  constructor() {
    this.root = $('#ui-root');
  }

  generateHeatmap(dateMap) {
    // get limits
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

    for (var y=y1; y<=y2; ++y) {
      const year = $('<div />', {class: 'year'});
      const label = $('<div />', {class: 'timeline-labels__label', html: y});
      const startDay = new Date(y, 0, 1).getDay();
      const mstart = (y == y1) ? m1 : 0;
      const mstop = (y == y2) ? m2 : 11;
      let daysInYear = startDay;

      // add padding days
      for (var i=0; i<startDay; ++i) {
        year.append($('<div />', {class: 'day hidden'}));
      }

      for (var m=mstart; m<=mstop; ++m) {
        let date = 1;
        const days = new Date(y, m + 1, 0).getDate();
        daysInYear += days;
        for (var d=0; d<days; ++d) {
          const uid = `${y}-${m}-${date++}`;
          year.append($('<div />', {id: uid, class: 'day'}));
        }
      }

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
  }
}

export { Interface };
