import {describe, expect, it, beforeAll} from "@jest/globals";
import request from "supertest"
import {app} from "../../src/util/App";
import {Users} from "../../src/models/Users";
import {Role} from "../../src/types/Role";


describe("UsersTest", () => {
    let validToken: string;
    let invalidToken: string = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2Njg3ODQxMDksImV4cCI6MTY2ODg3MDUwOSwic3ViIjoiN2FmMjFiYTItZTRhNC00Nzc1LWE0MDMtODA4YjgwNTQzNDZlIn0.VRnjrr18EINHFw0MD0AVEeFTpx1uHLEUW-JYMjk3OdN";
    let data: Users;
    let validId: string;
    let invalidId: string = "7af21ba2-e4a4-4775-a403-808b80543460"

    beforeAll(async () => {
        const result = await request(app)
            .post("/auth/login")
            .send({
                email: "carlos.walter@gmail.com",
                password: "123456"
            })
            .set('Accept', 'application/json');
        const {token} = result.body
        const {user} = result.body
        validId = user.id
        validToken = token

        data = {
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
            .send(data)
            .set('Accept', 'application/json')

        expect(response.text).toEqual(`{"message":"Token missing"}`)
        expect(response.status).toEqual(401);
    })

    it("Test invalid token", async () => {

        const response = await request(app)
            .post("/users")
            .send(data)
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${invalidToken}`);

        expect(response.text).toEqual(`{"message":"Invalid token"}`)
        expect(response.status).toEqual(401);
    })

    it("Test User already exist", async () => {

        const response = await request(app)
            .post("/users")
            .send(data)
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${validToken}`);

        expect(response.text).toEqual(`{"message":"User already exist"}`)
        expect(response.status).toEqual(400);

    })

    it("Test create new user", async () => {

        const response = await request(app)
            .post("/users")
            .send({
                name: "João Maria",
                email: "joao.maria@gmail.com",
                username: "joao.maria",
                password: "123456",
                driver_licence: "123456",
                role: Role.USER
            })
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${validToken}`);

        expect(response.text).toEqual(`{"message":"User created"}`)
        expect(response.status).toEqual(200);

    })
    it("Test list all users", async () => {

        const response = await request(app)
            .get("/users")
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${validToken}`);

        expect(response.text).toContain("username")
        expect(response.status).toEqual(200);

    })
    it("Test find user", async () => {

        const response = await request(app)
            .get(`/users/${validId}`)
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${validToken}`);

        expect(response.text).toContain("username")
        expect(response.status).toEqual(200);

    })

    it("Test update user", async () => {

        const response = await request(app)
            .put(`/users/${validId}`)
            .send({
                name: "João da Silva Costa",
                email: "joao.silva@gmail.com",
                username: "joao.silva",
                password: "123456",
                driver_licence: "123456",
                role: Role.USER
            })
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${validToken}`);

        expect(response.text).toEqual(`{"message":"User updated"}`)
        expect(response.status).toEqual(200);

    })

    it("Test user not found", async () => {

        const response = await request(app)
            .get(`/users/${invalidId}`)
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${validToken}`);

        expect(response.text).toEqual(`{"message":"User not found"}`)
        expect(response.status).toEqual(400);

    })

    it.skip("Test user destroy", async () => {

        const response = await request(app)
            .delete(`/users/${validId}`)
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${validToken}`);

        expect(response.text).toEqual(`{"message":"User deleted"}`)
        expect(response.status).toEqual(200);

    })

})