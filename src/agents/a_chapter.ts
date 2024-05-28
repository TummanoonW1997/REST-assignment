import { Chapter } from "../models/m_chapter";
import { Result } from "../models/m_result";
import { DBAgent } from "./a_agent";

class ChapterAgent extends DBAgent{
    constructor(){
        super('/chapters');
    }

    async getAllChapters(): Promise<Result>{
        return await super.getAllDocs();
    }

    async getChapterSingle(id: string): Promise<Result>{
        return await super.getDocSingle(id);
    }

    async createChapter(newChapt: Chapter): Promise<Result>{
        if(newChapt.name && newChapt.studioId && newChapt.animeId && newChapt.duration) return await super.createDoc(newChapt);
        else return { code: 400, data: "invalid name, studioId, animeId, or duration" };
    }

    async deleteChapter(id: string): Promise<Result>{
        return await super.deleteDoc(id);
    }

    async updateChapter(id: string, chapt: Chapter): Promise<Result>{
        return await super.updateDoc(id, chapt);
    }

    async removeReferenceToStudio(studioId: string): Promise<Result>{
        const snapshot = await this.getDB().query(this.getRefPath()).filter('studioId', '==', studioId).get();
        const arr:Array<Chapter> = snapshot.getValues();
        for(var i=0; i < arr.length; i++){
            const item: Chapter = arr[i];
            item.studioId = null;
            await this.updateChapter(item.id, item);
        }
        return { code: 200, data: arr };
    }

    async removeReferenceToAnime(animeId: string): Promise<Result>{
        const snapshot = await this.getDB().query(this.getRefPath()).filter('animeId', '==', animeId).get();
        const arr:Array<Chapter> = snapshot.getValues();
        for(var i=0; i < arr.length; i++){
            const item: Chapter = arr[i];
            item.animeId = null;
            await this.updateChapter(item.id, item);
        }
        return { code: 200, data: arr };
    }
}

export const chapterAgent: ChapterAgent = new ChapterAgent();