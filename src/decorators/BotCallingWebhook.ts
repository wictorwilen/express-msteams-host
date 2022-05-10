// Copyright (c) Wictor Wilén. All rights reserved.
// Licensed under the MIT license.
import * as express from "express";
import "reflect-metadata";

/**
 * Decorator for methods to mark the webhook for the calling API
 * @param endpoint Endpoint of the calling API webhook
 * @deprecated
 */
export function BotCallingWebhook(endpoint: string) {
    return <T extends express.RequestHandler>(target: any, propertyKey: string | symbol, descriptor: TypedPropertyDescriptor<T>): TypedPropertyDescriptor<T> => {
        Reflect.defineMetadata("msteams:calling", endpoint, target, propertyKey);
        return descriptor;
    };
}
