import * as uuid from 'uuid';

export const ID = {
    generateID(): string{
        return uuid.v4();
    },
    isID(id: string): boolean{
        return uuid.validate(id);
    }
};