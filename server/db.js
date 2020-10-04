const Pool = require("pg").Pool

const pool = new Pool (
    {
    user: "postgres",
    password:  "Hello_World",
    host: "localhost",
    post: 5432,
    database: "jwttutorial"
    }
)

module.exports = pool;