// Copyright (c) Wictor Wilén. All rights reserved.
// Licensed under the MIT license.

import * as express from "express";
import { MsTeamsPageRouter } from "./MsTeamsPageRouter";
import * as request from "supertest";
import { PreventIframe } from "..";
import * as path from "path";

@PreventIframe("/test.html")
class TestClass {

}

describe("MsTeamsPageRouter", () => {
    let app: express.Express;

    beforeAll(() => {
        app = express();
        app.use(MsTeamsPageRouter({ components: { test: TestClass }, root: path.join(process.cwd(), "test/") }));
        app.use("/", express.static(path.join(__dirname, "test/"), {
            index: "index.html"
        }));
    });

    it("Should export the MsTeamsPageRouter function", () => {
        expect(MsTeamsPageRouter).toBeInstanceOf(Function);
    });

    it("Should return 404, without CSP", async () => {
        const response = await request(app).get("/");
        expect(response).toBeDefined();
        expect(response.statusCode).toEqual(404);
        expect(response.headers["Content-Security-Policy"]).toBeUndefined();
    });

    it("Should return 200, with CSP", async () => {
        const req = request(app);
        const response = await req.get("/test.html");
        expect(response).toBeDefined();
        expect(response.statusCode).toEqual(200);
        // console.log(JSON.stringify(response));
        const host = (response as any).request.host;
        expect(response.headers["content-security-policy"]).toEqual("frame-ancestors 'self' teams.microsoft.com *.teams.microsoft.com *.skype.com *.sharepoint.com outlook.office.com *.teams.microsoft.us local.teams.office.com *.office.com " + host);
    });

});
