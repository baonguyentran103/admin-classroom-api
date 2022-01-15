const notificationModel = require("./notification.model");

module.exports = {
    async addNoti(userID, content, link) {
        const rs = await notificationModel.addNoti(userID, notiId, content, link);
        return rs;
    },
    async editNoti(notiId) {
        const rs = await notificationModel.editNoti(notiId);
        return rs;
    },
    async getNotiOfUser(userID) {
        const rs = await notificationModel.getNotiOfUser(userID);
        return rs;
    },
}