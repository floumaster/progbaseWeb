//models/user.js

/**
 * @typedef User
 * @property {integer} id
 * @property {string} login.required - unique username
 * @property {string} fullname - user`s fullname
 * @property {integer} role - user`s role
 * @property {string} registeredAt - the day when user registered in the system
 * @property {string} avaUrl - url of the picture
 * @property {boolean} isEnabled - is user enabled
 */
class User {

    constructor(id, login, fullname, role, registeredAt, avaUrl, isEnabled) {
        this.id = id; // number
        this.login = login; // string
        this.fullname = fullname; // string
        this.role = role; //number 0 || 1
        this.registeredAt = registeredAt; // Date ISO 8601
        this.avaUrl = avaUrl; //strign (URL)
        this.isEnabled = isEnabled; //bool
    }
};

module.exports = User;