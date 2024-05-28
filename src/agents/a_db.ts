import {AceBase} from 'acebase';

export class Database extends AceBase{
    constructor(dbName: string){
        super(dbName);

        this.ready(() => {
            console.log('DB READY!');
        });
    }
}

export const db = new Database('db');

