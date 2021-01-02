var tsconfig = require('../../tsconfig.json');
var resolve = require('path').resolve;

var pairs = tsconfig.compilerOptions.paths;
var alias = {}

Object.keys(pairs).forEach(function(key) {
  var _key = key.split(/\//)[0];
  var _values = pairs[key];
  var _new_values = [];

  if (Object.prototype.toString.call(_values) === '[object Array]') {
    _values.forEach(function(value) {
      _new_values = value.split(/\//)[0];
    });
  } else if( (Object.prototype.toString.call(_values) === '[object String]') ) {
    _new_values = _values;
  }
  alias[_key] = _new_values;
})

module.exports = {
  aliasFactory: function(path) {
    Object.keys(alias).forEach(function(key) {
      alias[key] = resolve(path, alias[key])
    })
    return alias
  }
};
