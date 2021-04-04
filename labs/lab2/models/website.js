//models/website.js

/**
 * @typedef Website
 * @property {integer} id
 * @property {string} name.required - unique name
 * @property {string} address.required - unique address
 * @property {integer} visits_per_day - amount of visits per day
 * @property {integer} count_of_ad_bunners - amount of bunners on pages
 * @property {string} date_of_creating - the date of creating website
 */

class Website {

    constructor(id, name, address, visits_per_day, count_of_ad_bunners, date_of_creating) {
        this.id = id; // id
        this.name = name || "some name"; // string
        this.address = address || "someaddress.ru"; // string
        this.visits_per_day = visits_per_day || 0; //number
        this.count_of_ad_bunners = count_of_ad_bunners || 0; //number
        this.date_of_creating = date_of_creating || "2020-11-11"; // Date ISO 8601
    }
};

module.exports = Website;