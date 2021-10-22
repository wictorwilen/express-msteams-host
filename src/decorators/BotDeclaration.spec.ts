// Copyright (c) Wictor Wilén. All rights reserved.
// Licensed under the MIT license.

import * as decorators from "./index";
import { Storage } from "botbuilder";
import { stub } from "jest-auto-stub";

describe("BotDeclaration", () => {

    it("Should export the BotDeclaration function", () => {
        expect(decorators.BotDeclaration).toBeInstanceOf(Function);
    });

    it("Should return a function, with metadata", () => {
        const storage = stub<Storage>();
        // eslint-disable-next-line no-new-func
        const fn = new Function();
        const retVal = decorators.BotDeclaration(
            "endpoint",
            storage,
            "c25537ca-753f-441a-81c3-475c5976629f",
            "password")(fn);
        expect(retVal).toBeUndefined();
        expect(fn).toBeDefined();
        expect(Reflect.hasMetadata("msteams:bot", fn)).toBeTruthy();
        expect(Reflect.getMetadata("msteams:bot", fn)).toEqual({
            endpoint: "endpoint",
            appId: "c25537ca-753f-441a-81c3-475c5976629f",
            appPassword: "password",
            certificatePrivateKey: undefined,
            certificateThumbprint: undefined,
            namespace: undefined,
            storage: {}
        });
    });
});
