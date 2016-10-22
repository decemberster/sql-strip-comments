```
const strip = require('sql-strip-comments');

let sql='SELECT * FROM customers; -- test comments';
console.log(strip(sql));
// SELECT * FROM customers;

let sql='SELECT * FROM customers; /* -- test comments */ ';
console.log(strip(sql));
// SELECT * FROM customers;

let sql=`
SELECT "comments can be one line (-- comment text
) and multiline (/* comment text */)" FROM customers; /* -- test comments */`;
console.log(strip(sql));
// SELECT "comments can be one line (-- comment text
// ) and multiline (/* comment text */)" FROM customers;
```
