const fs = require('fs');
 
class JsonStorage {
 
    // filePath - path to JSON file
    constructor(filePath) {
        this.filePath = filePath;
    }
 
    readItems() {
        const jsonText = fs.readFileSync(this.filePath);
        const jsonArray = JSON.parse(jsonText);
        return jsonArray;
    }
    readId(){
        let jsonText = fs.readFileSync('./data/nextId.json');
        return JSON.parse(jsonText);
    }
    writeId(items){
        fs.writeFileSync('./data/nextId.json', items);
    }
    writeItems(items){
        fs.writeFileSync(this.filePath, items);
    }
};

 
module.exports = JsonStorage;
