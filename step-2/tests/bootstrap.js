var jsdom = require('jsdom');

module.exports = function bootstrap() {
  var doc = jsdom.jsdom('<!doctype html><html><body></body></html>');
  var win = doc.defaultView;

  function propagateToGlobal(window) {
    for (var key in window) {
      if (!window.hasOwnProperty(key)) continue;
      if (key in global) continue;
      global[key] = window[key];
    }
  }

  global.document = doc;
  global.window = win;
  propagateToGlobal(win);
}
