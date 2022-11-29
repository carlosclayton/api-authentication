import {Users} from "../models/Users";
import {buildMapper} from "dto-mapper";

export class UserMap {

    static toDTO({
                     id,
                     name,
                     username,
                     email,
                     avatar,
                     role,
                     created_at,
                 }: Users) {
        const mapper = buildMapper(Users)
        return  mapper.serialize({
            id,
            name,
            username,
            email,
            avatar,
            role,
            created_at
        })
    }
}