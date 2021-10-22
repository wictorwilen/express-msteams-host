// Copyright (c) Wictor Wilén. All rights reserved.
// Licensed under the MIT license.

/**
 * Decorator function for Messaging Extensions
 * @param name Name of the messaging extension matching the commandId to filter commands on, or skip for catch-all scenarios
 */
export function MessageExtensionDeclaration(name?: string): PropertyDecorator {

    return (target: any, propertyKey: string | symbol): void => {
        if (target.__messageExtensions === undefined) {
            target.__messageExtensions = [];
        }
        target.__messageExtensions.push({
            propertyKey,
            name
        });
    };
}
