const express = require('express');
// const jwt = require('jsonwebtoken');
// const passport = require('../../module/passport/index');
const router = express.Router();
const userService = require('./user.service');



/* Get list of users */
router.get('/', async function (req, res, next) {

    // maybe add search function
    const typeSearch = req.query.typeSearch; // 'single' or 'multiple'
    const email = req.query.email;

    // search by email
    if (typeof (typeSearch) != "undefined" && typeSearch === 'single' && typeof (email) != "undefined") {
        const result = await userService.getUserByEmail(email);
        res.json(result);
        return;
    }

    const result = await userService.getAllUsers();
    res.json(result);
});

/* Get users by ID */
router.get('/:id', async function (req, res, next) {
    const userID = req.params.id;
    const result = await userService.getUserByID(userID);
    res.json(result);
});

/* Add user*/
router.post('/', async (req, res, next) => {
    const rs = await userService.createUser(req.body);
    res.json(rs);
});

/* Update user by ID */
router.put('/:id', async (req, res, next) => {
    const userID = req.params.id;
    const result = await userService.updateUserByID(userID, req.body);
    res.json(result);
});

/* Delete user by ID */
router.delete('/:id', async (req, res, next) => {
    const userID = req.params.id;
    const result = await userService.deleteUserByID(userID);
    res.json(result);
});

// ==================== ======================= ==================================
// ==================== API for classes of user ==================================


router.get('/:userID/class-user', async (req, res, next) => {
    const userID = req.params.userID;
    const role = req.query.role;

    if (role) {
        let result = [];
        if (role === 'teacher') {
            result = await userService.getCreateedClassesOfUserByUserID(userID, role);
        }
        else if (role === 'student') {
            result = await userService.getJoinedClassesOfUserByUserID(userID, role);
        }

        res.json(result);
        return;
    }


    const result = await userService.getClassesOfUserByUserID(userID);
    res.json(result);
});


router.get('/:userID/class-user/:classID', async (req, res, next) => {
    const userID = req.params.userID;
    const classID = req.params.classID;
    const result = await userService.getClassDetailByUserIDandClassID(userID, classID);
    res.json(result);
});


router.post('/:userID/class-user', async (req, res, next) => {
    const userID = req.params.userID;
    const rawData = req.body;

    if (rawData) {
        // user join class by code (role student)
        if (rawData.role === 'student') {
            const result = await userService.addUserToClass(userID, rawData);
            res.json(result);
            return;
        }
        // user create class (role teacher)
        else if (rawData.role === 'teacher') {
            const result = await userService.createClassForUser(userID, rawData);
            res.json(result);
            return;
        }
    }

    res.json({ msg: 'failure', error: "Something was wrong!" })
})

router.put('/:userID/class-user/:classID', async (req, res, next) => {
    const userID = req.params.userID;
    const classID = req.params.classID;
    const rawData = req.body;

    console.log('params: ', userID, classID);
    console.log('rawData: ', rawData);

    const result = await userService.updateInfoClassOfUser(userID, classID, rawData);

    res.json(result);
})

router.delete('/:userID/class-user/:classID', async (req, res, next) => {
    const userID = req.params.userID;
    const classID = req.params.classID;

    const result = await userService.deleteClassOfUser(userID, classID);
    res.json(result);
});

module.exports = router;


// resource note

// users <-----------------------------------------------------
// REST API
// urlAPI/users/        -> list (GET)
// urlAPI/users/:id     -> get user by id (GET)
// urlAPI/users/        -> add user (POST)
// urlAPI/users/:id     -> update/edit user by id (PUT) - dataUser
// urlAPI/users/:id     -> delete user by id (DELETE) - dataUser

// urlAPI/users/:id/class-user?role=teacher/student                     -> list class of user (GET)
//                                                                          query 'role' to get user's joined/created class

// urlAPI/users/:userID/class-user/                                     -> (POST)   add user to exists class (need class code - student) / create new class (teacher)
// urlAPI/users/:userID/class-user/                                     -> (PUT)    edit class that user created (role: only teacher)
// urlAPI/users/:userID/class-user/                                     -> (DELETE) delete class that user create (teacher) or remove user from class that user joined
// urlAPI/users/:userID/class-user/joined-classes/:classID/people       -> 2 lists: teachers & students


// classes <-----------------------------------------------------

// GET, POST, PUT, DELETE