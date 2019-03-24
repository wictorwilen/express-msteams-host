// Copyright (c) Wictor Wilén. All rights reserved.
// Licensed under the MIT license.

import { Middleware, TurnContext } from "botbuilder";
import { IMessageExtension, IBot } from "../interfaces";
import { MessagingExtensionQuery, ActivityTypesEx } from "botbuilder-teams";
import * as debug from "debug";
const log = debug("msteams");

/**
 * Bot Framework Middleware for managing Messaging Extensions on bots
 */
export class MessagingExtensionMiddleware implements Middleware {

    /**
     * private property for managing messaging extensions associated with the middleware
     */
    private MessageExtensions: Array<{ propertyKey: string, name: string }> = [];

    /**
     * Constructor
     * @param bot the Bot implementation using
     */
    constructor(private bot: IBot) {
        const obj = <object>this.bot;
        for (const p in obj) {
            if (p === "__messageExtensions") {
                this.MessageExtensions = obj[p];
                log(`Found ${this.MessageExtensions.length} MessagingExtension(s) on the Bot object`);
            }
        }
    }

    /**
     * onTurn implementation for the middleware
     * @param context the Turn Context
     * @param next the next function to invoke
     */
    public async onTurn(context: TurnContext, next: () => Promise<void>): Promise<void> {
        switch (context.activity.name) {
            case "composeExtension/query":
                {
                    const me = this.MessageExtensions.find((x: { propertyKey: string, name: string }) => {
                        return x.name === context.activity.value.commandId;
                    });
                    if (me) {
                        log(`Invoking onQuery on ${me.name}`);
                        const messageExtension: IMessageExtension = <IMessageExtension>this.bot[me.propertyKey];
                        if (messageExtension) {
                            const invokeResponse = await messageExtension.onQuery(context, <MessagingExtensionQuery>context.activity.value);
                            await context.sendActivity({ value: invokeResponse, type: ActivityTypesEx.InvokeResponse });
                            return;
                        } else {
                            throw new Error(`MessageExtension ${me.name} is not initialized`);
                        }
                    }
                }
                break;
            case "composeExtension/querySettingUrl":
                {
                    const me = this.MessageExtensions.find((x: { propertyKey: string, name: string }) => {
                        return x.name === context.activity.value.commandId;
                    });
                    if (me) {
                        log(`Invoking onQuerySettingsUrl on ${me.name}`);
                        const messageExtension: IMessageExtension = <IMessageExtension>this.bot[me.propertyKey];
                        if (messageExtension) {
                            const invokeResponse = await messageExtension.onQuerySettingsUrl(context);
                            await context.sendActivity({ value: invokeResponse, type: ActivityTypesEx.InvokeResponse });
                            return;
                        } else {
                            throw new Error(`MessageExtension ${me.name} is not initialized`);
                        }
                    }
                }
                break;
            case "composeExtension/setting":
                {
                    const me = this.MessageExtensions.find((x: { propertyKey: string, name: string }) => {
                        return x.name === context.activity.value.commandId;
                    });
                    if (me) {
                        log(`Invoking onSettingsUpdate on ${me.name}`);
                        const messageExtension: IMessageExtension = <IMessageExtension>this.bot[me.propertyKey];
                        if (messageExtension) {
                            const invokeResponse = await messageExtension.onSettingsUpdate(context);
                            await context.sendActivity({ value: invokeResponse, type: ActivityTypesEx.InvokeResponse });
                            return;
                        } else {
                            throw new Error(`MessageExtension ${me.name} is not initialized`);
                        }
                    }
                }
                break;
            default:
                // nop
                break;
        }
        return next();
    }

}
