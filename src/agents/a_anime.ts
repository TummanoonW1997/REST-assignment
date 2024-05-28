import { Anime } from "../models/m_anime";
import { Result } from "../models/m_result";
import { DBAgent } from "./a_agent";
import { chapterAgent } from "./a_chapter";

class AnimeAgent extends DBAgent{
    constructor(){
        super('/anime');
    }

    async getAllAnimes(): Promise<Result>{
        return await super.getAllDocs();
    }

    async getAnimeSingle(id: string): Promise<Result>{
        return await super.getDocSingle(id);
    }

    async createAnime(newAni: Anime): Promise<Result>{
        if(newAni.name && newAni.studioId && newAni.year)return await super.createDoc(newAni);
        else return { code: 400, data: "invalid name, studioId or year" };
    }

    async deleteAnime(id: string): Promise<Result>{
        await chapterAgent.removeReferenceToAnime(id); //DELETE ITS REFERENCE FROM CHAPTER
        return await super.deleteDoc(id);
    }

    async updateAnime(id: string, ani: Anime): Promise<Result>{
        return await super.updateDoc(id, ani);
    }

    async removeReferenceToStudio(studioId: string): Promise<Result>{
        const snapshot = await this.getDB().query(this.getRefPath()).filter('studioId', '==', studioId).get();
        const arr:Array<Anime> = snapshot.getValues();
        for(var i=0; i < arr.length; i++){
            const item: Anime = arr[i];
            item.studioId = null;
            await this.updateAnime(item.id, item);
        }
        return { code: 200, data: arr };
    }
}

export const animeAgent: AnimeAgent = new AnimeAgent();