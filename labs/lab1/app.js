const UserRepository = require('./repositories/userRepository');
const userRepository = new UserRepository("data/users.json");
const WebsiteRepository = require('./repositories/WebsiteRepository');
const websiteRepository = new WebsiteRepository("./data/Websites.json");
const Websites = require('./models/website');
const moment = require('moment');
const readlineSync = require('readline-sync');

while(1)
{
    const data = readlineSync.question('Enter your command: ');
    try{
    const text = data.toString().trim();
    const cmd = text.split('/');
    const available_start_cmd = ['get', 'delete', 'update', 'post'];
    const available_get_cmd = ['users', 'websites'];
    if (cmd.length < 2 || !available_start_cmd.includes(cmd[0])) {
        throw new Error('Invalid command');
    }
    if (cmd[0] === 'get') {
        if (!available_get_cmd.includes(cmd[1])) {
            throw new Error('Invalid command');
        }
        if (cmd[1] === 'users') {
            if (cmd.length === 2) {
                console.log('Success! We are finding all users!');
                const users = userRepository.getUsers();
                if(users.length === 0){
                    console.log('There are no users');
                }
                else{
                    console.log(users);
                }
            }
            else {
                if (!isNaN(cmd[2])) {
                    const uid = parseInt(cmd[2]);
                    console.log(`Success! We are finding id ${uid}!`);
                    const user = userRepository.getUserById(uid);
                    if(user === null){
                        console.log(`There is no user with id ${uid}`);
                    }
                    else{
                        console.log(user);
                    }
                }
                else {
                    throw new Error('Invalid id');
                }
            }
        }
        if (cmd[1] === 'websites') {
            if (cmd.length === 2) {
                console.log('Success! We are finding all websites!');
                const websites = websiteRepository.getWebsites();
                if(websites.length === 0){
                    console.log('There are no websites');
                }
                else{
                    console.log(websites);
                }
            }
            else {
                if (!isNaN(cmd[2])) {
                    const wid = parseInt(cmd[2]);
                    console.log(`Success! We are finding website with id ${wid}!`);
                    const website = websiteRepository.getWebsitesById(wid);
                    if(website === undefined){
                        console.log(`There is no website with id ${wid}`);
                    }
                    else{
                        console.log(website);
                    }
                }
                else {
                    throw new Error('Invalid id');
                }
            }
        }
    }
    if (cmd[0] === 'delete') {
        if (cmd.length !== 3 || cmd[1] !== 'websites') {
            throw new Error('Invalid command');
        }
        if (isNaN(cmd[2])) {
            throw new Error('Invalid id');
        }
        const wdid = parseInt(cmd[2]);
        console.log(`Success! We are deleting website with id ${wdid}!`);
        const del = websiteRepository.deleteWebsites(wdid);
        if(del === undefined){
            console.log(`There is no website with id ${wdid}`);
        }
        else{
            console.log(`Website with id ${wdid} has been deleted`);
        }
    }
    if (cmd[0] === 'update') {
        let date_of_creating = new Date;
        if (cmd[1] !== 'websites') {
            throw new Error('Invalid command');
        }
        const id = parseInt(cmd[2]);
        if(websiteRepository.getWebsitesById(id)===undefined){
            throw new Error('Invalid id');
        }
        const name = readlineSync.question('Input name of the website: ');
        const address = readlineSync.question('Input address of the website: ');
        if (!address.includes('.')) {
            throw new Error('Invalid address');
        }
        const visits_per_day = readlineSync.question('Input visits_per_day of the website: ');
        if (isNaN(visits_per_day)) {
            throw new Error('Invalid visits_per_day');
        }
        const count_of_ad_bunners = readlineSync.question('Input count_of_ad_bunners of the website: ');
        if (isNaN(count_of_ad_bunners)) {
            throw new Error('Invalid count_of_ad_bunners');
        }
        date_of_creating = readlineSync.question('Input date_of_creating of the website: ');
        if (!moment(date_of_creating, moment.ISO_8601).isValid()) {
            throw new Error('Invalid date');
        }
        console.log(`Success! We are updating website with id ${id}!`);
        const site = new Websites(parseInt(id), name, address, parseInt(visits_per_day), parseInt(count_of_ad_bunners), date_of_creating);
        const result = websiteRepository.updateWebsite(site);
        if(result!== undefined){
            console.log(`Website with id ${id} has been updated`);
        }
    }
    if (cmd[0] === 'post') {
        let date_of_creating = new Date;
        if (cmd[1] !== 'websites' || cmd.length !== 2) {
            throw new Error('Invalid command');
        }
        const name = readlineSync.question('Input name of the website: ');
        const address = readlineSync.question('Input address of the website: ');
        if (!address.includes('.')) {
            throw new Error('Invalid address');
        }
        const visits_per_day = readlineSync.question('Input visits_per_day of the website: ');
        if (isNaN(visits_per_day)) {
            throw new Error('Invalid visits_per_day');
        }
        const count_of_ad_bunners = readlineSync.question('Input count_of_ad_bunners of the website: ');
        if (isNaN(count_of_ad_bunners)) {
            throw new Error('Invalid count_of_ad_bunners');
        }
        date_of_creating = readlineSync.question('Input date_of_creating of the website: ');
        if (!moment(date_of_creating, moment.ISO_8601).isValid()) {
            throw new Error('Invalid date');
        }
        console.log(`Success! We are adding a new website!`);
        const site = new Websites(0, name, address, parseInt(visits_per_day), parseInt(count_of_ad_bunners), date_of_creating);
        const addres = websiteRepository.addWebsite(site);
        if(addres!== undefined){
            console.log(`A new website has been added`);
        }
    }
    }
    catch(err){
        console.error(err);
    }
}
