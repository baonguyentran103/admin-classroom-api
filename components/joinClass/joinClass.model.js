const db = require('../../utils/db');
module.exports = {
    async getInvatationByEmailandClassID(email, classID) {
        return await db('invitation').select('*').where('Email', '=', email).andWhere('ClassID', '=', classID);
    },

    async addUserToClass(data) {
        const row = await db('class_user').insert(data);
        //console.log(row);
        return row.length === 1 ? true : false;


    },

    async deleteInvitation(email, classID) {
        const rs = await db('invitation').where('Email', '=', email).andWhere('ClassID', '=', classID).delete(['Email'], { includeTriggerModifications: true });
        return rs == 1 ? true : false;
    },

    async addInvitation(data) {
        const row = await db('invitation').insert(data);
        return row.length === 1 ? true : false;
    }

}