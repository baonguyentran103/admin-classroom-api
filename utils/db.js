const knex = require('knex')({
    client: 'mysql2',
    connection: {
      host: 'us-cdbr-east-04.cleardb.com',
      user: 'b5a2d28914aa40',
      password: '73bfaa14',
      database: 'heroku_504b086ac68d780',
    },
    pool: {
      min: 0,
      max: 50
    }
  });
  
  module.exports = knex;