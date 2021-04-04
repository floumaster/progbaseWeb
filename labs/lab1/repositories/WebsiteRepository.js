const JsonStorage = require('../jsonStorage');
const Website = require('../models/website');
class UserRepository {

    constructor(filePath) {
        this.storage = new JsonStorage(filePath);
    }

    addWebsite(entityModel) {
        const items = this.storage.readItems();
        let jsonvalue = this.storage.readId();
        entityModel.id = jsonvalue.id;
        jsonvalue.id++;
        this.storage.writeId(JSON.stringify(jsonvalue));
        items.push(entityModel);
        this.storage.writeItems(JSON.stringify(items, null, 4));
        return jsonvalue.id--;
    }
    getWebsites() {
        const items = this.storage.readItems();
        const arr = [];
        for(let i of items){
            arr.push(new Website(i.id, i.name, i.address, i.visits_per_day, i.count_of_ad_bunners, i.date_of_creating))
        }
        return arr;
    }
    getWebsitesById(entityId) {
        const items = this.storage.readItems();
        for (let i of items) {
            if (entityId === i.id) {
                return new Website(i.id, i.name, i.address, i.visits_per_day, i.count_of_ad_bunners, i.date_of_creating);
            }
        }
    }
    updateWebsite(entityModel) {
        let items = this.storage.readItems();
        for (let i = 0; i < items.length; i++) {
            if (entityModel.id == items[i].id) {
                items[i] = entityModel;
                this.storage.writeItems(JSON.stringify(items, null, 4));
                return items[i];
            }
        }
    }
    deleteWebsites(entityId) {
        let items = this.storage.readItems();
        for (let i = 0; i < items.length; i++) {
            if (entityId === items[i].id) {
                items.splice(i, i + 1);
                this.storage.writeItems(JSON.stringify(items, null, 4));
                let jsonvalue = this.storage.readId();
                jsonvalue.id--;
                this.storage.writeId(JSON.stringify(jsonvalue));
                return entityId;
            }
        }
    }
};


module.exports = UserRepository;
