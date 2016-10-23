'use strict';

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