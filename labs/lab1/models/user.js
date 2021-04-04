class User {

    constructor(id, login, fullname, role, registeredAt, avaUrl, isEnabled) {
        this.id = id;  // number
        this.login = login;  // string
        this.fullname = fullname;  // string
        this.role = role; //number 0 || 1
        this.registeredAt = registeredAt;// Date ISO 8601
        this.avaUrl = avaUrl;//strign (URL)
        this.isEnabled = isEnabled; //bool
    }
 };
 
 module.exports = User;