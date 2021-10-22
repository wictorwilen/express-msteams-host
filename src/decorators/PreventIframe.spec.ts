// Copyright (c) Wictor Wilén. All rights reserved.
// Licensed under the MIT license.

import * as decorators from "./index";

describe("PreventIframe", () => {

    it("Should export the PreventIframe function", () => {
        expect(decorators.PreventIframe).toBeInstanceOf(Function);
    });

    it("Should return a function, with metadata", () => {
        // eslint-disable-next-line no-new-func
        const fn = new Function();
        const retVal = decorators.PreventIframe(
            "url1")(fn);
        expect(retVal).toBeUndefined();
        expect(fn).toBeDefined();
        expect((fn as any).__addCsp).toBeDefined();
        expect((fn as any).__addCsp).toEqual(["url1"]);
    });

    it("Should return a function, with metadata, twice", () => {
        // eslint-disable-next-line no-new-func
        const fn = new Function();
        const retVal = decorators.PreventIframe(
            "url1")(fn);
        decorators.PreventIframe(
            "url2")(fn);
        expect(retVal).toBeUndefined();
        expect(fn).toBeDefined();
        expect((fn as any).__addCsp).toBeDefined();
        expect((fn as any).__addCsp).toEqual(["url1", "url2"]);
    });
});
