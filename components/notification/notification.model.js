const db = require('../../utils/db');
const { v4: uuidv4 } = require('uuid');
module.exports = {
    async addNoti(userID, content, link) {
        let created = new Date(); 
        const data = {
            UserID: userID,
            NotiID: uuidv4(),
            Content: content,
            LinkToClass: link,
            CreateAt: created.now(),
            Status: 0
        }
        const rs = await db('notification').insert(data);
        return rs;
    },
    async editNoti(notiId) {
        const rs = await db('notification').where('NotiID', notiId).update('Status', 1);
        return rs;
    },
    async getNotiOfUser(userID) {
        const rs = await db('notification').where('userID', userID).orderBy('CreateAt', 'desc');
        return rs;
    },
};

