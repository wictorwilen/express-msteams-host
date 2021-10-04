// Copyright (c) Wictor Wilén. All rights reserved.
// Licensed under the MIT license.

import * as decorators from "./index";

describe("ConnectorDeclaration", () => {

    it("Should export the ConnectorDeclaration function", () => {
        expect(decorators.ConnectorDeclaration).toBeInstanceOf(Function);
    });

    it("Should return a function, with metadata", () => {
        // eslint-disable-next-line no-new-func
        const fn = new Function();
        const retVal = decorators.ConnectorDeclaration(
            "connect",
            "ping")(fn);
        expect(retVal).toBeUndefined();
        expect(fn).toBeDefined();
        expect((fn as any).__isConnector).toBeTruthy();
        expect((fn as any).__connectEndpoint).toEqual("connect");
        expect((fn as any).__pingEndpoint).toEqual("ping");
    });
});
