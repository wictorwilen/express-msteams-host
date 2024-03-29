// Copyright (c) Wictor Wilén. All rights reserved.
// Licensed under the MIT license.

import { Router } from "express";
import { IOutgoingWebhook } from "../interfaces/IOutgoingWebhook";
import { IConnector } from "../interfaces/IConnector";
import * as debug from "debug";
import { BotFrameworkAdapter } from "botbuilder";
import { ConversationState, ActivityHandler, UserState } from "botbuilder-core";
import { MessagingExtensionMiddleware } from "botbuilder-teams-messagingextensions";
import "reflect-metadata";
import { IBotDeclarationSettings } from "../decorators/BotDeclaration";

const getMethodsNames = (obj: object) => {
    return Object.getOwnPropertyNames(obj).filter((key) => typeof obj[key] === "function").concat(Object.getPrototypeOf(obj) ? getMethodsNames(Object.getPrototypeOf(obj)) : []);
};

/**
 * Express router for Microsoft Teams Connectors, Bots and Outgoing Webhooks
 * @param components Imported module with all implementations
 */
export default (components: any): Router => {
    const router = Router();
    const log = debug.default("msteams");
    for (const app in components) {
        if (Object.prototype.hasOwnProperty.call(components, app)) {
            const component = components[app];
            if (Reflect.hasMetadata("msteams:bot", component)) {
                const botSettings: IBotDeclarationSettings = Reflect.getMetadata("msteams:bot", component);
                // if (component["__isBot"]) {
                log(`Creating a new bot instance at ${botSettings.endpoint}`);
                const adapter = new BotFrameworkAdapter({
                    appId: typeof botSettings.appId === "function" ? botSettings.appId() : botSettings.appId,
                    appPassword: typeof botSettings.appPassword === "function" ? botSettings.appPassword() : botSettings.appPassword,
                    certificatePrivateKey: typeof botSettings.certificatePrivateKey === "function" ? botSettings.certificatePrivateKey() : botSettings.certificatePrivateKey,
                    certificateThumbprint: typeof botSettings.certificateThumbprint === "function" ? botSettings.certificateThumbprint() : botSettings.certificateThumbprint
                });
                // Create the conversation state
                const conversationState: ConversationState = new ConversationState(botSettings.storage, botSettings.namespace);

                // Create the user state
                const userState: UserState = new UserState(botSettings.storage, botSettings.namespace);

                // generic error handler
                adapter.onTurnError = async (context, error) => {
                    log(`[onTurnError]: ${error}`);
                    await context.sendActivity("Oops. Something went wrong!");
                    await conversationState.delete(context);
                };
                // Create the Bot
                // eslint-disable-next-line new-cap
                const bot: ActivityHandler = new component(conversationState, userState, adapter);

                // add the Messaging Extension Middleware
                for (const p in bot) {
                    if (p === "__messageExtensions") {
                        const messageExtensions: { propertyKey: string, name: string }[] = bot[p];
                        log(`Found ${messageExtensions.length} MessagingExtension(s) on the Bot object`);
                        messageExtensions.forEach((me) => {
                            log(`Adding Messaging extension: ${me.name}`);
                            adapter.use(new MessagingExtensionMiddleware(me.name, bot[me.propertyKey]));
                        });
                    }
                }

                // add the bot to the router
                router.post(botSettings.endpoint, (req: any, res: any) => {
                    adapter.processActivity(req, res, async (turnContext): Promise<any> => {
                        try {
                            await bot.run(turnContext);
                        } catch (err) {
                            adapter.onTurnError(turnContext, err);
                        }
                    });
                });

                getMethodsNames(bot).forEach((m: string) => {
                    if (Reflect.hasMetadata("msteams:calling", bot, m)) {
                        const path = Reflect.getMetadata("msteams:calling", bot, m);
                        log(`Adding Bot Calling webhook at ${path}`);
                        router.post(path, (req, res) => {
                            bot[m](req, res);
                        });
                    }
                });

            } else if (component.__isOutgoingWebhook) {
                log(`Creating a new outgoing webhook instance at ${component.__serviceEndpoint}`);
                // eslint-disable-next-line new-cap
                const outgoingWebhook: IOutgoingWebhook = new component();
                router.post(component.__serviceEndpoint, (req, res, next) => {
                    outgoingWebhook.requestHandler(req, res, next);
                });
            } else if (component.__isConnector) {
                log(`Creating a new connector instance at ${component.__connectEndpoint}`);
                // eslint-disable-next-line new-cap
                const connector: IConnector = new component();
                // Connector Ping endpoint
                // POST option
                router.post(component.__pingEndpoint, (req, res) => {
                    connector.Ping(req);
                    res.sendStatus(202);
                });
                // GET option
                router.get(component.__pingEndpoint, (req, res) => {
                    connector.Ping(req);
                    res.sendStatus(202);
                });
                // Connector connect post back - used when adding the connector
                router.post(component.__connectEndpoint, (req, res) => {
                    connector.Connect(req);
                    res.sendStatus(200);
                });
            } else {
                // component is not of a recognized type
            }
        }
    }
    return router;
};
