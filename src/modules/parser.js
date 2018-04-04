const keys = {
  '{{': '<div>',
  '}}': '</div',
  '\\[\\[': '<a>',
  '\\]\\]': '</a>'
};

const parseWikiText = (wikitext, wrapperClass) => {
  // wikitext -> jquery object
  const wrapper = $('<div />', {class: wrapperClass});
  for (var key in keys) {
    if (keys.hasOwnProperty(key)) {
      wikitext = wikitext.replace(new RegExp(key, 'g'), keys[key]);
    }
  }
  wrapper.html(wikitext);

  return wrapper;
};

export { parseWikiText };
