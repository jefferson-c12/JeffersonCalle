import fs from 'fs';

class container {
    name = "";
    constructor(name) {
    this.name = `./${name}.txt`;
    }

    async getAll() {
        try {
            const data = await fs.promises.readFile(this.name, "utf-8");
            return data;
        } catch (err) {
            await fs.promises.writeFile(this.name, JSON.stringify([], null, 3));
            return [];
        }   
    }
    async save(data) {
        try {
            const items = await this.getAll();
            let id;
            if (items.length === 0) {
                id = 1;
            } else {
                id = items[items.length - 1].id + 1;
            }
            data.id = id;
            items.push(data);
            await fs.promises.writeFile(this.name, JSON.stringify(items, null, 3));
        } catch (err) {
            console.log(err);
        }
    }
    async getById(id) {
        try {
            const items = await this.getAll();
            const item = items.find((item) => item.id === id);
            return item;
        } catch (err) {
            console.log(err);
        }
    }

    async deleteById(id) {
        try {
            const items = await this.getAll();
            const newitems = items.filter((item) => item.id !== id);
            await fs.promises.writeFile(this.name, JSON.stringify(newitems, null, 3));
        } catch (err) {
            console.log(err);
        }
    }

    async deleteAll(){
        try {
            await fs.promises.writeFile(this.name, JSON.stringify([], null, 3));
        } catch (err) {
            console.log(err);
        }
    }
}