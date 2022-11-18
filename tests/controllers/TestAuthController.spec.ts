import {describe, expect, it} from "@jest/globals";
import request from "supertest"
import {app} from "../../src/util/App";

describe("Authentication", () => {

    it("Login incorrect", async () => {
        const response = await request(app)
            .post("/auth/login")
            .send({
                email: "carlos.walter@gmail.com",
                password: "12345"
            })
            .set('Accept', 'application/json');

        expect(response.text).toEqual(`{"message":"Email or password incorrect"}`)
        expect(response.status).toEqual(400);

    })
    it("Login success", async () => {
        const response = await request(app)
            .post("/auth/login")
            .send({
                email: "carlos.walter@gmail.com",
                password: "123456"
            })
            .set('Accept', 'application/json');

        expect(response.text).toContain("token")
        expect(response.status).toEqual(200);

    })
})