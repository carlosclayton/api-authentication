import {describe, expect, it, beforeAll} from "@jest/globals";
import request from "supertest"
import {app} from "../../src/util/App";
import {Users} from "../../src/models/Users";
import {Role} from "../../src/types/Role";


describe("UsersTest", () => {
    let validToken: string;
    let invalidToken: string = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2Njg3ODQxMDksImV4cCI6MTY2ODg3MDUwOSwic3ViIjoiN2FmMjFiYTItZTRhNC00Nzc1LWE0MDMtODA4YjgwNTQzNDZlIn0.VRnjrr18EINHFw0MD0AVEeFTpx1uHLEUW-JYMjk3OdN";
    let user: Users;

    beforeAll(async () => {
        const result = await request(app)
            .post("/auth/login")
            .send({
                email: "carlos.walter@gmail.com",
                password: "123456"
            })
            .set('Accept', 'application/json');
         const {token} = result.body
        validToken = token

        user = {
            name: "Carlos Walter",
            email: "carlos.walter@gmail.com",
            username: "carlos.walter",
            password: "123456",
            driver_licence: "123456",
            role: Role.ADMIN
        }
    })

    it("Test token is missing", async () => {

        const response = await request(app)
            .post("/users")
            .send(user)
            .set('Accept', 'application/json')

        expect(response.text).toEqual(`{"message":"Token missing"}`)
        expect(response.status).toEqual(401);
    })

    it("Test invalid token", async () => {

        const response = await request(app)
            .post("/users")
            .send(user)
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${invalidToken}`);

        expect(response.text).toEqual(`{"message":"Invalid token"}`)
        expect(response.status).toEqual(401);
    })

    it("Test User already exist", async () => {

        const response = await request(app)
            .post("/users")
            .send(user)
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${validToken}`);

        expect(response.text).toEqual(`{"message":"User already exist"}`)
        expect(response.status).toEqual(400);

    })
})