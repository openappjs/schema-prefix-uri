var test = require('tape');

var schemaPrefixUri;

var personPrePrefix = {
  id: "Person",
};
var groupPrePrefix = {
  id: "Group",
};
var resourcePrePrefix = {
  id: "Resource",
};
var documentPrePrefix = {
  id: "Document",
};
var agentPrePrefix = {
  id: "Agent",
  oneOf: [{
    $ref: "Person",
  }, {
    $ref: "Group",
  }]
};
var thingPrePrefix = {
  id: "Thing",
  anyOf: [{
    $ref: "Resource",
  }, {
    $ref: "Document",
  }]
}

var personPostPrefix = {
  id: "http://example.org/Person",
};
var groupPostPrefix = {
  id: "http://example.org/Group",
};
var resourcePostPrefix = {
  id: "http://example.org/Resource",
};
var documentPostPrefix = {
  id: "http://example.org/Document",
};
var agentPostPrefix = {
  id: "http://example.org/Agent",
  oneOf: [{
    $ref: "http://example.org/Person",
  }, {
    $ref: "http://example.org/Group",
  }]
};
var thingPostPrefix = {
  id: "http://example.org/Thing",
  anyOf: [{
    $ref: "http://example.org/Resource",
  }, {
    $ref: "http://example.org/Document",
  }]
}

var prefix = "http://example.org/";

test("require module", function (t) {
  schemaPrefixUri = require('../');
  t.ok(schemaPrefixUri);
  t.end();
});

test("non schemas", function (t) {
  t.equal(schemaPrefixUri(prefix, true), null, "true is not schema");
  t.equal(schemaPrefixUri(prefix, false), null, "false is not schema");
  t.equal(schemaPrefixUri(prefix, null), null, "null is not schema");
  t.equal(schemaPrefixUri(prefix, undefined), null, "undefined is not schema");
  t.equal(schemaPrefixUri(prefix, [1,2,3]), null, "array is not schema");
  t.equal(schemaPrefixUri(prefix, "123"), null, "string is not schema");
  t.equal(schemaPrefixUri(prefix, 123), null, "number is not schema");
  t.end();
});

test("empty schema", function (t) {
  t.deepEqual(schemaPrefixUri(prefix, {}), {}, "empty schema is correctly prefixed");
  t.end();
});

test("schemas", function (t) {
  t.deepEqual(schemaPrefixUri(prefix, personPrePrefix), personPostPrefix, "person schema is correctly prefixed");
  t.deepEqual(schemaPrefixUri(prefix, groupPrePrefix), groupPostPrefix, "group schema is correctly prefixed");
  t.deepEqual(schemaPrefixUri(prefix, resourcePrePrefix), resourcePostPrefix, "resource schema is correctly prefixed");
  t.deepEqual(schemaPrefixUri(prefix, documentPrePrefix), documentPostPrefix, "document schema is correctly prefixed");
  t.deepEqual(schemaPrefixUri(prefix, agentPrePrefix), agentPostPrefix, "agent schema is correctly prefixed");
  t.deepEqual(schemaPrefixUri(prefix, thingPrePrefix), thingPostPrefix, "thing schema is correctly prefixed");
  t.end();
});
