// Copyright (c) Wictor Wilén. All rights reserved.
// Licensed under the MIT license.

/**
 * Decorator function for Messaging Extensions
 * @param name Name of the messaging extension
 */
export function MessageExtensionDeclaration(name: string): PropertyDecorator {

    return (target: any, propertyKey: string | symbol): void => {
        if (target._messageExtensions === undefined) {
            target._messageExtensions = [];
        }
        target._messageExtensions.push({
            propertyKey: propertyKey,
            name: name,
        });
    };
}
