// Copyright (c) Wictor Wilén. All rights reserved.
// Licensed under the MIT license.

import { MessageExtensionDeclaration } from "./index";
import * as decorators from "./index";

class TestClass {
    @MessageExtensionDeclaration("name")
    // eslint-disable-next-line no-new-object
    public extension = new Object();
}

class TestClass2 {
    @MessageExtensionDeclaration("name1")
    // eslint-disable-next-line no-new-object
    public extension1 = new Object();

    @MessageExtensionDeclaration("name2")
    // eslint-disable-next-line no-new-object
    public extension2 = new Object();
}

describe("MessageExtensionDeclaration", () => {

    it("Should export the MessageExtensionDeclaration function", () => {
        expect(decorators.PreventIframe).toBeInstanceOf(Function);
    });

    it("Should return a function, with metadata", () => {

        const testClass = new TestClass();
        expect(testClass).toBeDefined();
        expect(testClass.extension).toBeDefined();
        expect((testClass as any).__messageExtensions).toBeDefined();
        expect((testClass as any).__messageExtensions).toEqual([{ name: "name", propertyKey: "extension" }]);
    });

    it("Should return a function, with metadata, with multiple declarations", () => {

        const testClass = new TestClass2();
        expect(testClass).toBeDefined();
        expect(testClass.extension1).toBeDefined();
        expect(testClass.extension2).toBeDefined();
        expect((testClass as any).__messageExtensions).toBeDefined();
        expect((testClass as any).__messageExtensions).toEqual([{ name: "name1", propertyKey: "extension1" }, { name: "name2", propertyKey: "extension2" }]);
    });

});
