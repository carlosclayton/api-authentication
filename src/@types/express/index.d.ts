import {Role} from "../../types/Role";

export {}
declare global{
    namespace Express{
        export interface Request{
            id: string;
        }
    }
}
