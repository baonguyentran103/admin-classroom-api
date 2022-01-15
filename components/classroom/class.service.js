const classModel = require('./class.model');
const { v4: uuidv4,
    version: uuidVersion,
    validate: uuidValidate } = require('uuid');


module.exports = {
    async getAllClasses() {
        const result = await classModel.getAllClasses();
        return result;
    },

    async getClassByID(id) {
        let result = [];
        if (uuidValidate(id)) {
            result = await classModel.getClassByID(id);
        }
        return result;
    },

    async getClassByCode(classCode) {
        let result = [];
        if (uuidValidate(classCode)) {
            result = await classModel.getClassByCode(classCode);
        }
        return result;
    },

    async createClass(data) {
        // genrate ID, link to join class, code
        // validation
        let classData = {
            Name: data.name,
            Part: data.part,
            Title: data.title,
            Room: data.room,
            Auther: data.userID,
        }
        classData.ClassID = uuidv4();
        classData.LinkToJoinClass = process.env.URL_LOCAL_API + '/join-class/confirm/' + classData.ClassID;
        classData.Code = uuidv4();

        console.log(classData)
        await classModel.createClass(classData);

        let returnJson = {
            msg: 'success',
            error: '',
            classID: classData.ClassID
        }
        return returnJson;
    },

    async updateClassByID(id, data) {
        let returnJson = {
            msg: 'failure',
            error: 'Something was wrong!'
        }
        if (uuidValidate(id)) {
            const classData = {
                Name: data.name,
                Part: data.part,
                Title: data.title,
                Room: data.room
            }
            if (await classModel.updateClassByID(id, classData)) {
                returnJson.error = '';
                returnJson.msg = 'success';
            }
        }
        return returnJson;
    },

    async deleteClassByID(id) {
        let returnJson = {
            msg: 'failure',
            error: 'Something was wrong!'
        }
        if (uuidValidate(id)) {
            if (await classModel.deleteClassByID(id)) {
                returnJson.error = '';
                returnJson.msg = 'success';
            }
        }
        return returnJson;
    },

    async getAllPeopleInClass(classID) {
        if (uuidValidate(classID)) {
            console.log(classID);
            return await classModel.getAllPeopleInClass(classID);
        }
        return {
            msg: 'failure',
            error: 'Something was wrong!'
        };
    },
    async getAllStudentInClass(classID) {
        if (uuidValidate(classID)) {
            console.log(classID);
            return await classModel.getAllStudentInClass(classID);
        }
        return {
            msg: 'failure',
            error: 'Something was wrong!'
        };
    },
    async addStudentToClassbyCSV(classID, StudenID) {
        const data = {
            ClassID: classID,
            UserID: StudenID,
            Role: 'student'
        }
        const check = await classModel.getSpecificStudentInClass(classID, StudenID);
        var res = 'User aldready in class.'; 
        if (check.length > 0) {
            return res;
        }
        else{
            await classModel.addStudentToClassbyCSV(data);
            res = 'Success';
            return res;
        }
    },

}