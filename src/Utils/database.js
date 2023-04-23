const fs = require('fs');
const path = require('path');
const jwt = require('jsonwebtoken');

let d = __dirname.split('\\');
let dir = path.join(d[0], d[1], d[2], 'AppData', 'Roaming', '.task');
if(!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
}
let file = path.join(dir, 'db.tsk');

class DB {
    constructor(){
        this.create();
    }
    create(){
        if(!fs.existsSync(file)){
            fs.writeFileSync(file, this.cipher({}), 'utf8');
        }
    }
    read(){
        let data = fs.readFileSync(file, 'utf8');
        return data;
    }
    write(data){
        fs.writeFileSync(file, this.cipher(data), 'utf8')
    }
    cipher(data){
        return jwt.sign({data:JSON.stringify(data)}, 'secret')
    }
    parse(data){
        try {
            return JSON.parse(jwt.verify(data, 'secret').data);
        } catch (error) {
            return false;
        }
    }
    async get(key){
        if(!key) return;
        let raw = this.read();
        let data = this.parse(raw);
        if(!data) return;
        return data[key];
    }
    set(key, value){
        if(!key || !value) return;
        let raw = this.read();
        let data = this.parse(raw);
        if(!data) return;
        data[key] = value;
        this.write(data);
    }
}

module.exports = new DB();