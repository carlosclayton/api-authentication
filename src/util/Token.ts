import {sign} from "jsonwebtoken";
import auth from "../config/auth";
import {Users} from "../models/Users";

export class Token {

    constructor(private user: Users) {
    }

    getToken(){
        return sign({}, auth.tokenHash, {
            subject: this.user.id,
            expiresIn: auth.tokenExpiresIn
        })
    }

    getRefreshToken(){
        let {email} = this.user;

        return sign({email}, auth.refreshTokenHash, {
            subject: this.user.id,
            expiresIn: auth.refreshTokenExpiresIn
        })
    }
}


