const bcrypt = require('bcryptjs');
const userModel = require('./user.model')
const classService = require('../classroom/class.service')

module.exports = {
    async getAllUsers() {
        return await userModel.getAllUsers();
    },

    async getUserByID(userID) {
        return await userModel.getUserByID(userID);
    },

    async getUserByEmail(email) {
        return userModel.getUserByEmail(email);
    },

    async createUser(data) {
        const handlePassword = bcrypt.hashSync(data.password, 10);
        // check valiation of dateOfBirth, email, fullName in UI
        let user = {
            UserID: data.id,
            Password: handlePassword,
            Email: data.email,
            FullName: data.fullName,
            DateOfBirth: (data.dateOfBirth && data.dateOfBirth.length !== 0) ? data.dateOfBirth : null,
            AvartarURL: data.avartarURL,
        };
        // console.log(user);
        await userModel.addUser(user);
        delete user.Password;
        let returnJson = {
            msg: 'success',
            error: '',
            user
        }
        return returnJson;
    },

    async updateUserByID(userID, data) {
        let returnJson = 'Success';
        if (data.userID && data.userID.length > 0 && userID != data.userID) {
            const tmp = await this.getUserByID(data.userID);
            if (tmp.length === 0) {
                await userModel.updateUserID(userID, data.userID);
            }
            else returnJson = 'ID existed';
        }
        else {
            await userModel.updateBanUser(userID, data.baned);
        }
        return returnJson;
    },

    async deleteUserByID(userID) {
        let returnJson = {
            msg: 'failure',
            error: 'Something was wrong!'
        }
        if (await userModel.deleteUserByID(userID)) {
            returnJson.error = '';
            returnJson.msg = 'success';
        }
        return returnJson;
    },

    async getClassesOfUserByUserID(userID) {
        return await userModel.getClassesOfUserByUserID(userID);
    },

    async getCreateedClassesOfUserByUserID(userID, role) {
        return await userModel.getClassesOfUserByUserIDandRole(userID, role);
    },

    async getJoinedClassesOfUserByUserID(userID, role) {
        return await userModel.getClassesOfUserByUserIDandRole(userID, role);
    },

    async getClassDetailByUserIDandClassID(userID, classID) {
        // handle exception

        // information for home page of class details
        const classInfo = await userModel.getClassDetailByUserIDandClassID(userID, classID);

        // note: lesson/exercise, people, grade

        return classInfo;
    },

    async addUserToClass(userID, rawData) {
        let returnJson = {
            msg: 'failure',
            error: 'Something was wrong!',
        }
        // console.log(rawData, userID);
        // check class is exists?
        const classInput = await classService.getClassByCode(rawData.classCode);
        // console.log(classInput);

        if (classInput.length === 0) {
            returnJson.error = "Class is not exists!";
            return returnJson;
        }

        // check whether user is in class with this coresponding role??
        const classesOfUser = await userModel.getClassesOfUserByUserID(userID);
        for (let i in classesOfUser) {
            if (classesOfUser[i].Code === rawData.classCode) {
                returnJson.error = "User joined this class!";
                return returnJson;
            }
        }

        const handleData = {
            UserID: userID,
            ClassID: classInput[0].ClassID,
            Role: rawData.role
        }
        // console.log(handleData)

        if (await userModel.addUserToClass(handleData)) {
            returnJson.msg = 'success';
            returnJson.error = '';
        }
        return returnJson;
    },

    async createClassForUser(userID, rawData) {
        let returnJson = {
            msg: 'failure',
            error: 'Something was wrong!'
        }
        // console.log(rawData);

        // create class
        rawData.userID = userID;
        const response = await classService.createClass(rawData);

        const handleClassUserData = {
            UserID: userID,
            ClassID: response.classID,
            Role: rawData.role
        }
        console.log(handleClassUserData)

        // add to class_user and return
        if (await userModel.addUserToClass(handleClassUserData)) {
            returnJson.msg = 'success';
            returnJson.error = '';
        }
        return returnJson;
    },

    async updateInfoClassOfUser(userID, classID, rawData) {
        // check user's role in class is teacher, only teacher can edit info of class
        const classInfo = await (await this.getClassDetailByUserIDandClassID(userID, classID)).classInfo;
        // console.log(classInfo)

        if (!classInfo || classInfo.Role === 'student') {
            return { msg: "failure", error: "You don't have permission!" };
        }

        const rs = await classService.updateClassByID(classID, rawData);
        return { msg: 'success', error: rs ? '' : rs };
    },

    async deleteClassOfUser(userID, classID) {
        let returnJson = { msg: "failure", error: "You don't have permission!" };

        // get user's role in class 
        const classInfo = await (await this.getClassDetailByUserIDandClassID(userID, classID));
        console.log(classInfo);


        // remove user from their joined class, if they are student in class
        if (classInfo && classInfo.length !== 0 && classInfo[0].Role === 'student') {
            const rs = await userModel.removeUserFromJoinedClass(userID, classID);
            if (rs) {
                returnJson.msg = "success";
                returnJson.error = ""
            }
            else {
                returnJson.msg = "failure";
                returnJson.error = "Something was wrong!"
            }
        }
        else if (classInfo && classInfo.Role === 'teacher') {
            // remove user from their joined class, if they are student in class
            console.log('remove class');
            returnJson.msg = "success";
            returnJson.error = ""
            // ??? need to ask another teacher to confirm
            // if all agree, remove anther teacher from this class and remove it
        }

        return returnJson;
    },

}