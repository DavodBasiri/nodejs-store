const crypto = require("crypto");
const key = crypto.randomBytes(32).toString("hex").toUpperCase();
console.log(key);
// F50F1FD3AC71BF569D250E0D38C3DF5C77FA9EDD1FC306C28D43AC58D0662A8C

// 27AA69AED607F0F9E6A0A75C1AEFD5BED6300F40E77221BD8E722D397ACFE567