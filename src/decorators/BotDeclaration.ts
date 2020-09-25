// Copyright (c) Wictor Wilén. All rights reserved.
// Licensed under the MIT license.

import { Storage } from "botbuilder";
import "reflect-metadata";

export interface IBotDeclarationSettings {
    endpoint: string;
    storage: Storage;
    appId: string | undefined;
    appPassword: string | undefined;
    namespace?: string | undefined;
}

/**
 * Decorator function for Bots
 * @param endpoint The endpoint to expose for the bot (typically '/api/messages')
 * @param storage The Storage to use for the bot (ex: new MemoryStorage())
 * @param appId The App Id for the bot
 * @param appPassword The app password for the bot
 * @param namespace (Optional) Namespace to be appended to storage keys, defaults to empty string
 */
export function BotDeclaration(
    endpoint: string,
    storage: Storage,
    appId: string | undefined,
    appPassword: string | undefined,
    namespace?: string | undefined) {
    // tslint:disable-next-line: ban-types
    return (target: Function) => Reflect.defineMetadata("msteams:bot", <IBotDeclarationSettings>{ endpoint, storage, appId, appPassword, namespace }, target);
}
