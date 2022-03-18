const { Pool } = require('pg');
let pool = new Pool({
    connectionString: process.env.PG_URL,
    ssl: process.env.DATABASE_URL ? true : false
});

// on ajoute cette option pour que heroku ne rejette pas les connexions non https à la D

//avec un Pool, plus besoin de se connecter avant l'export, c'est géré directement sous le capot par le Pool lui-même
module.exports = pool;
