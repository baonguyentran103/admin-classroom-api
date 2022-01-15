const db = require('../../utils/db');

module.exports = {
    async getGrade(id) {
        row = await db('gradestruct').where('ClassID', id).orderBy('Rank', 'asc');
        console.log(row);
        return row;
    },
    async createGrade(data) {
        row = await db('gradestruct').insert(data);
        return row;
    },
    async editGrade(id, rank, data) {
        result = await db('gradestruct').where('ClassID', id).where('Rank', rank).update({ Name: data.Name, Grade: data.Grade, IsShowed: data.IsShowed });
        return result;
    },
    async getGradeByRank(id, rank) {
        row = await db('gradestruct').where('ClassID', id).where('Rank', rank);
        return row;
    },
    async deleteGrade(id, rank) {
        row = await db('gradestruct').where('ClassID', id).where('Rank', rank).del();
        return row;
    }
}