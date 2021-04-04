const user_rep = require('../repositories/userRepository.js');
const userRepository = new user_rep("data/users.json");
module.exports = {
    getUsers(req, res) {
        res.set("Content-type", "application/json");
        let page = Number.parseInt(req.param("page") || 1); //2
        let records = Number.parseInt(req.param("per_page") || 5); //3
        if (!Number.isInteger(page) || !Number.isInteger(records)) {
            res.statusCode = 404;
            res.send(JSON.stringify({ error: "param should be an integer" }));
        }
        if (records > 100) {
            res.statusCode = 404;
            res.send(JSON.stringify({ error: "page size should be less than 100" }));
        }
        let arr = userRepository.getUsers();
        let record_count = arr.length; //6
        let page_count = Math.ceil(record_count / records); //6/3 = 2
        if (page > page_count) {
            res.statusCode = 404;
            res.send(JSON.stringify({ error: "Page was not found" }));
        } else {
            let left;
            let right;
            if (page_count < page) // 2<=1
            {
                left = (page_count - 1) * records;
                right = record_count;
            } else { //2>1
                left = (page - 1) * records; // 0
                right = left + records; //0+3
            }
            const newArr = arr.slice(left, right);
            res.send(JSON.stringify(newArr, null, 4));
        }
    },
    getUserById(req, res) {
        res.set("Content-type", "application/json");
        const user = userRepository.getUserById(req.params.id);
        if (user === null) {
            res.statusCode = 404;
            res.send(JSON.stringify({ error: "User with this id wasnt found" }));
        } else {
            res.send(JSON.stringify(user, null, 4));
        }
    }
};