>[![npm](https://img.shields.io/npm/v/sql-strip-comments.svg)](https://www.npmjs.com/package/sql-strip-comments) [![npm](https://img.shields.io/npm/dm/sql-strip-comments.svg)](https://www.npmjs.com/package/sql-strip-comments) [![ghit.me](https://ghit.me/badge.svg?repo=decemberster/sql-strip-comments)](https://ghit.me/repo/decemberster/sql-strip-comments)

Remove line (```-- comment text \n```) and block (```\* comment text *\```) comments from sql code. Comments in string literals are not treated as comments. Nested block comments are not supported.

### Install
```
$ npm install sql-strip-comments --save
```

### Usage
```js
const strip = require("sql-strip-comments");

let sql='SELECT * FROM customers; -- test comments';
console.log(1, strip(sql));
// SELECT * FROM customers; 
 
sql='SELECT * FROM customers; /* -- test comments */';
console.log(2, strip(sql));
// SELECT * FROM customers; 
 
sql=`
SELECT 
    "comments can be one line (-- comment text 
) and multiline (/* comment text */)" AS literal, 
    * 
FROM 
    customers; /* -- test comments */`;
console.log(3, strip(sql));
// SELECT "comments can be one line (-- comment text 
// ) and multiline (/* comment text */)" AS literal, * FROM customers;

```
