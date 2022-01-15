const gradeStructModel = require("./gradeStruct.model");

module.exports = {
    async getGradeStruct(id) {
        let rows = await gradeStructModel.getGrade(id);
        return rows;
    },
    async putGradeStruct(id, rank, data) {
        const data2 = {
            ...data,
            ClassID: id,
            Rank: rank
        }
        console.log("data", data, data2);
        let rows = await gradeStructModel.getGradeByRank(id, rank);
        console.log("row", rows);
        let res = null;
        if (rows.length === 0) {
            res = await gradeStructModel.createGrade(data2);
        }
        else {
            res = await gradeStructModel.editGrade(id, rank, data);
        }
        return res;
    },
    async deleteGradeStruct(id, rank) {

        let rows = await gradeStructModel.deleteGrade(id, rank);
       
        return rows;
    }
}