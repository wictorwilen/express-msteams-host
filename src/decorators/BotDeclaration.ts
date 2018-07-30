// Copyright (c) Wictor Wilén. All rights reserved.
// Licensed under the MIT license.

import { IChatConnectorSettings } from "botbuilder";

/**
 * Decorator function for Bots
 * @param endpoint The endpoint to expose for the bot (typically '/api/messages')
 * @param appId The App Id for the bot
 * @param appPassword The app password for the bot
 */
export function BotDeclaration(
    endpoint: string,
    appId: string | undefined,
    appPassword: string | undefined) {
    return (target: any) => {
        target.isBot = true;
        target.botSettings = <IChatConnectorSettings>{
            appId: appId,
            appPassword: appPassword,
        };
        target.serviceEndpoint = endpoint;
    };
}
