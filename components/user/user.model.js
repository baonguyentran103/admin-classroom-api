const db = require('../../utils/db');
module.exports = {
    async findUserByMail(usn) {
        let row = await db('user').where('Email', usn);
        if (row.length === 0)
            return null;
        return row;
    },
    async addUser(user) {
        await db('user').insert(user);
    },


    async getAllUsers() {
        const rows = await db.select('*').from('user').orderBy('CreatedAt');;
        // console.log(rows.length);
        return rows;
    },

    async getUserByID(userID) {
        const row = await db.select('*').from('user').where({ 'UserID': userID });
        // console.log(row);
        return row;
    },

    async getUserByEmail(email) {
        const row = await db.select('*').from('user').where({ 'Email': email });
        // console.log(row);
        return row;
    },

    async updateUserID(userID, userID2) {
        const rs = await db('user').where('UserID', '=', userID).update('UserID', userID2);
        return rs;
    },
    async updateBanUser(userID, baned) {
        const rs = await db('user').where('UserID', '=', userID).update('Baned', baned);
        return rs;
    },

    async deleteUserByID(userID) {
        const rs = await db('user').where('UserID', '=', userID).del(['userID'], { includeTriggerModifications: true })
        console.log(rs);
        return rs == 1 ? true : false;
    },

    // ========================================================================
    // ========================================================================

    async getClassesOfUserByUserID(userID) {
        const row = await db.select(['c.*', 'cu.*'])
            .from('user as u')
            .join('class_user as cu', 'u.UserID ', '=', ' cu.UserID')
            .join('class as c', 'c.ClassID', '=', ' cu.ClassID')
            .where('u.UserID', '=', userID)
        // console.log(row);
        return row;
    },

    async getClassesOfUserByUserIDandRole(userID, role) {
        const row = await db.select(['c.*', 'cu.*', 'u2.FullName as AuthorName'])
            .from('user as u')
            .join('class_user as cu', 'u.UserID ', '=', ' cu.UserID')
            .join('class as c', 'c.ClassID', '=', ' cu.ClassID')
            .join('user as u2', 'c.Auther', '=', ' u2.UserID')
            .where('u.UserID', '=', userID)
            .andWhere('cu.Role', '=', role)
        // console.log(row);
        return row;
    },

    async getClassDetailByUserIDandClassID(userID, classID) {
        const row = await db.select(['c.*', 'cu.*'])
            .from('user as u')
            .join('class_user as cu', 'u.UserID ', '=', ' cu.UserID')
            .join('class as c', 'c.ClassID', '=', ' cu.ClassID')
            .where('u.UserID', '=', userID)
            .andWhere('cu.ClassID', '=', classID)
        // console.log(row);
        return row;
    },

    async addUserToClass(data) {
        const row = await db('class_user').insert(data);
        //console.log(row);
        return row.length === 1 ? true : false;
    },

    async removeUserFromJoinedClass(userID, classID) {
        const rs = await db('class_user').where('UserID', '=', userID).andWhere('classID', '=', classID).del(['userID'], { includeTriggerModifications: true })
        console.log(rs);
        return rs == 1 ? true : false;
    },

}