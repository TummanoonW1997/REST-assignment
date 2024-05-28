import { Result } from "../models/m_result";
import { Studio } from "../models/m_studio";
import { DBAgent } from "./a_agent";
import { animeAgent } from "./a_anime";
import { chapterAgent } from "./a_chapter";

class StudioAgent extends DBAgent{
    constructor(){
        super('/studios');
    }

    async getAllStudios(): Promise<Result>{
        return await super.getAllDocs();
    }

    async getStudioSingle(id: string): Promise<Result>{
        return await super.getDocSingle(id);
    }

    async createStudio(newStu: Studio): Promise<Result>{
        if(newStu.name && newStu.website) return await super.createDoc(newStu);
        else return { code: 400, data: "invalid name or website" };
    }

    async deleteStudio(id: string): Promise<Result>{
        await animeAgent.removeReferenceToStudio(id); //DELETE ITS REFERENCE FROM ANIME AND CHAPTER
        await chapterAgent.removeReferenceToStudio(id);
        
        return await super.deleteDoc(id);
    }

    async updateStudio(id: string, stu: Studio): Promise<Result>{
        return await super.updateDoc(id, stu);
    }
}

export const studioAgent: StudioAgent = new StudioAgent();