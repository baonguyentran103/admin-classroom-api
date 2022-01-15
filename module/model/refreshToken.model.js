const db = require('../../utils/db');

module.exports = {
    async findToken(token){
        let row = await db('refreshtoken').where('Token', token);
        if (row.length === 0)
          return null;
        return row;
    },
    async addToken(token){
        await db('refreshtoken').insert(token);

    },
}