# schema-prefix-uri

returns json-schema with any id's or $ref's prefixed as a uri

## install

with [npm](http://npmjs.org), do:

```
npm i --save schema-prefix-uri
```

## example

```
var schemaPrefixUri = require('schema-prefix-uri');


var agentSchema = {
  id: "Agent",
  oneOf: [{
    $ref: "Person",
  }, {
    $ref: "http://other.org/Group",
  }]
};

var prefix = "http://example.org/";

var prefixedAgentSchema = schemaPrefixUri(prefix, agentSchema);

console.log(JSON.stringify(prefixedAgentSchema, null, 2));
//{
//  "id": "http://example.org/Agent",
//  "oneOf": [
//    {
//      "$ref": "http://example.org/Person"
//    },
//    {
//      "$ref": "http://other.org/Group"
//    }
//  ]
//}
```

## license

AGPLv3
