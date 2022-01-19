const db = require('../../utils/db');
module.exports = {
    async findAdminByMail(usn) {
        let row = await db('admin').where('Email', usn);
        if (row.length === 0)
            return null;
        return row;
    },
    async addAdmin(user) {
        await db('admin').insert(user);
    },


    async getAllAdmins() {
        const rows = await db.select('*').from('admin').orderBy('CreatedAt');
        // console.log(rows.length);
        return rows;
    },

    async getAdminByID(adminID) {
        const row = await db.select('*').from('admin').where({ 'AdminID': adminID });
        // console.log(row);
        return row;
    },

    async getAdminByEmail(email) {
        const row = await db.select('*').from('admin').where({ 'Email': email });
        // console.log(row);
        return row;
    },

    async updateUserByID(adminID, data) {
        const rs = await db('admin').where('AdminID', '=', adminID).update('Fullname', data.Fullname);
        console.log(rs);
        return rs == 1 ? true : false;
    },

    async deleteUserByID(userID) {
        const rs = await db('user').where('UserID', '=', userID).del(['userID'], { includeTriggerModifications: true })
        console.log(rs);
        return rs == 1 ? true : false;
    },

    // ========================================================================
    // ========================================================================
}