# Destination Framework

Painless API Creation Framework for Node.js w/ Database Agnostic Adapters.

### Installation

```bash
npm install destination
```

### Usage

Include the Destination Framework

```js
var Destination = require('destination');
```

Install an [Adapter](#adapters), and start an objective:

```js
var Objective = Destination.start(/* Express Application (app, generally) */, {
  name: 'adapter name such as (mongodb)',
  ... Adapter Settings ...
});
```

Start defining objective Models, Property schema curtesy of [Validator](https://github.com/Nijikokun/Validator#implementations).

```js
var User = Objective.define('User', {
  // Definition is a collection?
  //
  // When collection is a string... it is used as the collection name 
  // rather than the name passed above.
  //
  // Example:
  //
  //     collection: 'users',
  //
  collection: true,

  // Routing System
  routing: {
    fetch: { by: 'name' },
    fetchAll: false,
    create: true,
    update: false,
    remove: false,
    
    // Some more complex, built in:
    
    // Update or Create
    upsert: false,
    
    // Remove all entries
    empty: false,
    
    // Count of all entries
    count: false
  },

  // Validator Schema
  name: {
    type: String,
    length: {
      min: 3,
      max: 24
    }
  },

  password: {
    type: String,
    length: {
      min: 3,
      max: 36
    }
  }
});
```

Models currently only have two keywords in the root document:

- collection
- routing

Anything else is used as a property schema, processed and parsed by [Validator](https://github.com/Nijikokun/Validator) upon requests, 
refer to validator for schema documentation.

It's extremely simple. I promise. Now you listen:

```js
Objective.listen(1337);
```

You don't even have to use the Objective variable to listen, you can use your application framework to do it and it will still work. :)

### Adapters

- [destination-mongodb](https://github.com/Nijikokun/destination-mongodb) by Nijikokun


### Todo

- Find a way to support any application framework instead of Express.
