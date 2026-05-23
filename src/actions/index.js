// Built-in actions
const log = require('./log');
const http = require('./http');
const transform = require('./transform');

module.exports = {
  'log': log,
  'http.get': http.get,
  'http.post': http.post,
  'http.put': http.put,
  'http.delete': http.delete,
  'transform': transform,
  // More actions will be loaded from integrations
};
