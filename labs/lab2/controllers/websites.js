const moment = require('moment');
const site_rep = require('../repositories/WebsiteRepository.js');
const websiteRepository = new site_rep("data/Websites.json");
module.exports = {
    getWebsites(req, res) {
        res.set("Content-Type", "application/json");
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
        let arr = websiteRepository.getWebsites();
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
    getWebsitesById(req, res) {
        res.set("Content-Type", "application/json");
        const website = websiteRepository.getWebsitesById(req.params.id)
        if (website === null) {
            res.statusCode = 404;
            res.send(JSON.stringify({ error: 'Website with this id wasnt found' }));
        } else {
            res.send(JSON.stringify(website, null, 4));
        }
    },
    addWebsite(req, res) {
        res.set("Content-Type", "application/json");
        if (!(req.body.name !== undefined && req.body.address !== undefined &&
                (typeof req.body.name === "string") && (typeof req.body.address === "string") &&
                (typeof req.body.visits_per_day === "number" || typeof req.body.visits_per_day === "undefined") &&
                (typeof req.body.count_of_ad_bunners === "number" || typeof req.body.count_of_ad_bunners === "undefined") &&
                (moment(req.body.date_of_creating, moment.ISO_8601).isValid() || typeof req.body.date_of_creating === "undefined"))) {
            res.statusCode = 400;
            res.send(JSON.stringify({ error: 'Bad request' }));
        } else {
            res.statusCode = 201;
            res.send(JSON.stringify(websiteRepository.getWebsitesById(websiteRepository.addWebsite(req.body)), null, 4));
        }
    },
    updateWebsite(req, res) {
        res.set("Content-Type", "application/json");
        if (!(req.body.name !== undefined && req.body.address !== undefined &&
                (typeof req.body.name === "string") && (typeof req.body.address === "string") &&
                (typeof req.body.visits_per_day === "number" || typeof req.body.visits_per_day === "undefined") &&
                (typeof req.body.count_of_ad_bunners === "number" || typeof req.body.count_of_ad_bunners === "undefined") &&
                (moment(req.body.date_of_creating, moment.ISO_8601).isValid() || typeof req.body.date_of_creating === "undefined"))) {
            res.statusCode = 400;
            res.send(JSON.stringify({ error: 'Bad request' }));
        } else {
            const website = websiteRepository.updateWebsite(req.body)
            if (website === null) {
                res.statusCode = 404;
                res.send(JSON.stringify({ error: 'Any website wasnt updated' }));
            } else {
                res.statusCode = 200;
                res.send(JSON.stringify(website, null, 4));
            }
        }
    },
    deleteWebsites(req, res) {
        res.set("Content-Type", "application/json");
        const website = websiteRepository.deleteWebsites(req.params.id)
        if (website === null) {
            res.statusCode = 404;
            res.send(JSON.stringify({ error: 'Website with this id wasnt found' }));
        } else {
            res.send(JSON.stringify(website, null, 4));
        }
    }
};