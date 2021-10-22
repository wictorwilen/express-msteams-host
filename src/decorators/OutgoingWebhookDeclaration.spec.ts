// Copyright (c) Wictor Wilén. All rights reserved.
// Licensed under the MIT license.

import * as decorators from "./index";

describe("ConnectorDeclaration", () => {

    it("Should export the OutgoingWebhookDeclaration function", () => {
        expect(decorators.OutgoingWebhookDeclaration).toBeInstanceOf(Function);
    });

    it("Should return a function, with metadata", () => {
        // eslint-disable-next-line no-new-func
        const fn = new Function();
        const retVal = decorators.OutgoingWebhookDeclaration(
            "endpoint")(fn);
        expect(retVal).toBeUndefined();
        expect(fn).toBeDefined();
        expect((fn as any).__isOutgoingWebhook).toBeTruthy();
        expect((fn as any).__serviceEndpoint).toEqual("endpoint");
    });
});
