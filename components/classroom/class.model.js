const db = require('../../utils/db');
module.exports = {
    async getAllClasses() {
        const rows = await db.select('*').from('class');
        //console.log(rows, typeof (rows));
        return rows;
    },

    async getClassByID(id) {
        const row = await db.from('class').where({
            'ClassID': id
        }).select('*')

        //console.log(row, typeof (row));
        return row;
    },


    async getClassByCode(classCode) {
        const row = await db.from('class').where({
            'Code': classCode
        }).select('*')

        //console.log(row, typeof (row));
        return row;
    },




    async createClass(data) {
        await db('class').insert(data);
    },

    async updateClassByID(id, data) {
        const rs = await db('class').where('ClassID', '=', id).update(data, ['classID']);
        //console.log(rs);
        return rs == 1 ? true : false;
    },

    async deleteClassByID(id) {
        const rs = await db('class').where('ClassID', '=', id).del(['classID'], { includeTriggerModifications: true })
        //console.log(rs);
        return rs == 1 ? true : false;
    },
    
    async getAllPeopleInClass(classID) {
        const rs = await db.select('*')
        .from('class_user as cu')
        .join('user as u', 'u.UserID', '=', 'cu.UserID')
        .where('cu.ClassID', '=', classID);
        // console.log(rs);
        return rs;
    },
    async getAllStudentInClass(classID) {
        const rs = await db.select('*')
        .from('class_user as cu')
        .join('user as u', 'u.UserID', '=', 'cu.UserID')
        .join('gradestruct as g', 'g.ClassID', '=', 'cu.ClassID')
        .where('cu.ClassID', '=', classID)
        .where('cu.Role', 'student');
        // console.log(rs);
        return rs;
    },
    async addStudentToClassbyCSV(data) {
        const rs = await db('class_user').insert(data);
        // console.log(rs);
        return rs;
    },
    async getSpecificStudentInClass(classID, studenID) {
        const rs = await db('class_user').where('ClassID', classID).where('UserID', studenID);
        // console.log(rs);
        return rs;
    },
    
}