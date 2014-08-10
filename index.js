var traverse = require('traverse');
var validUrl = require('valid-url');
var extend = require('xtend');

function prefixRef (prefix, ref) {
  return prefix + ref;
}

module.exports = function schemaBase(base, schema) {

  if (!schema || schema.constructor !== Object) {
    return null;
  }

  return traverse.map(schema, function (scope) {
    if (scope.$ref) {
      if (!validUrl.isUri(scope.$ref)) {
        this.update(extend(scope, {
          $ref: prefixRef(base, scope.$ref),
        }));
      }
    }
    else if (scope.id) {
      if (!validUrl.isUri(scope.id)) {
        this.update(extend(scope, {
          id: prefixRef(base, scope.id),
        }));
      }
    }
  });
};
