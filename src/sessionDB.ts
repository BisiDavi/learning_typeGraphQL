const sessionPool = require('pg').Pool;

export const sessionDBAccess = new sessionPool({
  user:"DOVIE",
  host: "localhost",
  port: 5432,
  database:"typegraphql_db"
})