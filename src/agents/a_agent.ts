import { Database, db } from "./a_db";
import { ID } from './a_id';
import { Result } from "../models/m_result";

export class DBAgent {
    private db: Database;
    private refPath: string;

    constructor(refPath: string) {
        this.db = db;
        this.refPath = refPath;
    }

    getDB(): Database{
        return this.db;
    }

    getRefPath(): string{
        return this.refPath;
    }

    async getAllDocs(): Promise<Result> {
        const snapshot = await this.db.ref(this.refPath).get();
        if (snapshot.exists())return { code: 200, data: snapshot.val() };
        else return { code: 200, data: {} };
    }

    async getDocSingle(id: string): Promise<Result> {
        if (ID.isID(id)) {
            const snapshot = await this.db.ref(this.refPath + "/" + id).get();
            if (snapshot.exists()) return { code: 200, data: snapshot.val()};
            else return { code: 404 };
        } else {
            return { code: 400, data: 'invalid ID' };
        }
    }

    async createDoc(doc: any): Promise<Result> {
        const newDoc = {
            id: ID.generateID(),
            ...doc
        };
        await this.db.ref(this.refPath + "/" + newDoc.id).set(newDoc);
        return { code: 201, data: newDoc };
    }

    async updateDoc(id: string, doc: any): Promise<Result>{
        if (ID.isID(id)) {
            const result = await this.getDocSingle(id);
            if (result.code == 200) { //THE DOC EXISTS
                const snapshot = await this.db.ref(this.refPath + "/" + id).update(doc);
                return { code: 200, data: snapshot.exists() }
            } else {
                return { code: 404 }
            }
        } else {
            return { code: 400, data: 'invalid ID' };
        }
    }

    async deleteDoc(id: string): Promise<Result> {
        if (ID.isID(id)) {
            const result = await this.getDocSingle(id);
            if (result.code == 200) { //THE DOC EXISTS
                const snapshot = await this.db.ref(this.refPath + "/" + id).remove();
                return { code: 204, data: snapshot.exists() }
            } else {
                return { code: 404 }
            }
        } else {
            return { code: 400, data: 'invalid ID' };
        }
    }
}