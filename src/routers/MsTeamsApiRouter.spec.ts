// Copyright (c) Wictor Wilén. All rights reserved.
// Licensed under the MIT license.

import * as express from "express";
import { MsTeamsApiRouter } from "../index";
import * as request from "supertest";
import { Storage } from "botbuilder";
import { stub } from "jest-auto-stub";
import { BotDeclaration } from "../decorators";

@BotDeclaration("/api/messages", stub<Storage>(), "appid", "appPassword")
class TestClass {

}

// mock the bot framework adapter
jest.mock("botbuilder", () => ({
    BotFrameworkAdapter: jest.fn().mockReturnValue({
        processActivity: (req: express.Request, res: express.Response, logic: any) => {
            res.send();
            res.end();
            return Promise.resolve();
        }
    })
}));

describe("MsTeamsApiRouter", () => {
    let app: express.Express;

    beforeAll(() => {
        app = express();
        app.use(MsTeamsApiRouter({ test: TestClass }));
    });

    it("Should export the MsTeamsApiRouter function", () => {
        expect(MsTeamsApiRouter).toBeInstanceOf(Function);
    });

    it("Should return 200 when calling endpoint with POST", async () => {
        const response = await request(app).post("/api/messages").send({ type: "message" });
        expect(response).toBeDefined();
        expect(response.statusCode).toEqual(200);
    });

    it("Should return 404 when calling endpoint with GET", async () => {
        const response = await request(app).get("/api/messages");
        expect(response).toBeDefined();
        expect(response.statusCode).toEqual(404);
    });

});
