import { Result } from "../models/m_result";
import { CreateUserDto } from "../models/m_user";
import { DBAgent } from "./a_agent";

class UserAgent extends DBAgent{
    constructor(){
        super('/users');
    }

    async getAllUsers(): Promise<Result>{ //get all users
        const result = await super.getAllDocs();
        if(result.code == 200) for(const key in result.data) delete result.data[key].password;
        return result;
    }

    async getUserSingle(userId: string): Promise<Result>{
        const result: Result = await super.getDocSingle(userId);
        if(result.code == 200) delete result.data.password;
        return result;
    }

    async createUser(userDto: CreateUserDto): Promise<Result>{
        if(userDto.login && userDto.password)return await super.createDoc(userDto);
        else return { code: 400, data: "invalid login or password" };
    }

    async deleteUser(id: string): Promise<Result>{
        return super.deleteDoc(id);
    }
}

export const userAgent: UserAgent = new UserAgent();