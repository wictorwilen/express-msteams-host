// Copyright (c) Wictor Wilén. All rights reserved.
// Licensed under the MIT license.

import express from "express";
import * as decorators from "./index";
import { BotCallingWebhook } from "./index";

class TestClass {

    @BotCallingWebhook("/endpoint")
    onIcomingCall(req: express.Request, res: express.Response, next: express.NextFunction) {

    }
}

describe("BotCallingWebhook", () => {

    it("Should export the BotCallingWebhook function", () => {
        expect(decorators.BotCallingWebhook).toBeInstanceOf(Function);
    });

    it("Should have a method, with metadata", () => {

        const testClass = new TestClass();
        expect(testClass).toBeDefined();
        expect(testClass.onIcomingCall).toBeDefined();
        expect(Reflect.hasMetadata("msteams:calling", testClass, "onIcomingCall")).toBeTruthy();
        expect(Reflect.getMetadata("msteams:calling", testClass, "onIcomingCall")).toEqual("/endpoint");
    });
});
