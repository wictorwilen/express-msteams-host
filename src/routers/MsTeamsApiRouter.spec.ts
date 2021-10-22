// Copyright (c) Wictor Wilén. All rights reserved.
// Licensed under the MIT license.

import * as express from "express";
import { MsTeamsApiRouter } from "../index";
import * as request from "supertest";
import { Storage } from "botbuilder";
import { stub } from "jest-auto-stub";
import { BotCallingWebhook, BotDeclaration, ConnectorDeclaration, MessageExtensionDeclaration, OutgoingWebhookDeclaration } from "../decorators";

class ExtensionClass {

}
@BotDeclaration("/api/messages", stub<Storage>(), "appid", "appPassword")
class TestClass {

    @MessageExtensionDeclaration("test")
    protected extension: ExtensionClass;

    @BotCallingWebhook("/api/calling")
    public calling(req: express.Request, res: express.Response) {
        res.send("OK");
        res.end();
    }
}

@BotDeclaration("/api/messages", stub<Storage>(), () => "appid", () => "appPassword")
class TestClass2 {

}

@BotDeclaration("/api/messages", stub<Storage>(), undefined, undefined, "privateKey", "thumbprint")
class TestClass3 {

}

@BotDeclaration("/api/messages", stub<Storage>(), undefined, undefined, () => "privateKey", () => "thumbprint")
class TestClass4 {

}
@OutgoingWebhookDeclaration("/api/outgoing")
class TestClass5 {
    public requestHandler(req: express.Request, res: express.Response) {
        res.send("OK");
        res.end();
    }
}

@ConnectorDeclaration("/api/connector", "/api/connector/ping")
class TestClass6 {
    public Ping(req: express.Request, res: express.Response) {

    }

    public Connect(req: express.Request, res: express.Response) {

    }
}

const mockUse = jest.fn();
// mock the bot framework adapter
jest.mock("botbuilder", () => ({
    BotFrameworkAdapter: jest.fn().mockReturnValue({
        processActivity: (_req: express.Request, res: express.Response, _logic: any) => {
            res.send();
            res.end();
            return Promise.resolve();
        },
        use: () => { mockUse(); return Promise.resolve(); }
    })
}));

describe("MsTeamsApiRouter", () => {
    let app: express.Express;
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("Should export the MsTeamsApiRouter function", () => {
        expect(MsTeamsApiRouter).toBeInstanceOf(Function);
    });

    describe("Appid: Using strings in declaration", () => {
        beforeAll(() => {
            app = express();
            app.use(MsTeamsApiRouter({ test: TestClass }));
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

    describe("AppId: Using functions in declaration", () => {
        beforeAll(() => {
            app = express();
            app.use(MsTeamsApiRouter({ test: TestClass2 }));
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

    describe("Cert: Using strings in declaration", () => {
        beforeAll(() => {
            app = express();
            app.use(MsTeamsApiRouter({ test: TestClass3 }));
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

    describe("Cert: Using functions in declaration", () => {
        beforeAll(() => {
            app = express();
            app.use(MsTeamsApiRouter({ test: TestClass4 }));
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

    describe("Messaging Extensions", () => {
        it("Should add one messaging extension", async () => {
            app = express();
            app.use(MsTeamsApiRouter({ test: TestClass }));
            expect(mockUse).toBeCalledTimes(1);
        });
    });

    describe("Calling webhook", () => {
        beforeAll(() => {
            app = express();
            app.use(MsTeamsApiRouter({ test: TestClass }));
        });
        it("Should have one calling webhook", async () => {
            const response = await request(app).post("/api/calling").send({});
            expect(response).toBeDefined();
            expect(response.statusCode).toEqual(200);
        });
    });

    describe("Outgoing webhook", () => {
        beforeAll(() => {
            app = express();
            app.use(MsTeamsApiRouter({ test: TestClass5 }));
        });
        it("Should have one calling webhook", async () => {
            const response = await request(app).post("/api/outgoing").send({});
            expect(response).toBeDefined();
            expect(response.statusCode).toEqual(200);
        });
    });

    describe("Connector", () => {
        beforeAll(() => {
            app = express();
            app.use(MsTeamsApiRouter({ test: TestClass6 }));
        });
        it("Should return 202 OK for GET on Ping endpoint", async () => {
            const response = await request(app).get("/api/connector/ping");
            expect(response).toBeDefined();
            expect(response.statusCode).toEqual(202);
        });
        it("Should return 202 OK for POST on Ping endpoint", async () => {
            const response = await request(app).post("/api/connector/ping").send({});
            expect(response).toBeDefined();
            expect(response.statusCode).toEqual(202);
        });
        it("Should return 200 OK for POST on Connect endpoint", async () => {
            const response = await request(app).post("/api/connector").send({});
            expect(response).toBeDefined();
            expect(response.statusCode).toEqual(200);
        });

    });

});
