class Website {

    constructor(id, name, address, visits_per_day, count_of_ad_bunners, date_of_creating) {
        this.id = id;  // id
        this.name = name;  // string
        this.address = address;  // string
        this.visits_per_day = visits_per_day; //number
        this.count_of_ad_bunners = count_of_ad_bunners;//number
        this.date_of_creating = date_of_creating;// Date ISO 8601
    }
};

module.exports = Website;