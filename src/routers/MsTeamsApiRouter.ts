// Copyright (c) Wictor Wilén. All rights reserved.
// Licensed under the MIT license.

import { Router } from "express";
import { IBot } from "../interfaces/IBot";
import { IOutgoingWebhook } from "../interfaces/IOutgoingWebhook";
import { IConnector } from "../interfaces/IConnector";
import * as debug from "debug";
import { BotFrameworkAdapter, ConversationState } from "botbuilder";
import { TeamsMiddleware } from "botbuilder-teams";
import { MessagingExtensionMiddleware } from "botbuilder-teams-messagingextensions";

/**
 * Express router for Microsoft Teams Connectors, Bots and Outgoing Webhooks
 * @param components Imported module with all implementations
 */
export default (components: any): Router => {
    const router = Router();
    const log = debug("msteams");
    for (const app in components) {
        if (components.hasOwnProperty(app)) {
            const component = components[app];
            if (component["__isBot"]) {
                log(`Creating a new bot instance at ${component.__serviceEndpoint}`);
                const adapter = new BotFrameworkAdapter(component.__botSettings);
                let conversationState: ConversationState;
                // Create the conversation state
                conversationState = new ConversationState(component.__storage);
                // generic error handler
                adapter.onTurnError = async (context, error) => {
                    log(`[onTurnError]: ${error}`);
                    await context.sendActivity(`Oops. Something went wrong!`);
                    await conversationState.delete(context);
                };
                // Create the Bot
                const bot: IBot = new component(conversationState);
                // add the Microsoft Teams middleware
                adapter.use(new TeamsMiddleware());
                // add the Messaging Extension Middleware
                for (const p in bot) {
                    if (p === "__messageExtensions") {
                        const messageExtensions: Array<{ propertyKey: string, name: string }> = bot[p];
                        log(`Found ${messageExtensions.length} MessagingExtension(s) on the Bot object`);
                        messageExtensions.forEach( (me) => {
                            log(`Adding Messaging extension: ${me.name}`);
                            adapter.use(new MessagingExtensionMiddleware(me.name, bot[me.propertyKey]));
                        });
                    }
                }

                router.post(component.__serviceEndpoint, (req: any, res: any) => {
                    adapter.processActivity(req, res, async (turnContext): Promise<any> => {
                        try {
                            await bot.onTurn(turnContext);
                        } catch (err) {
                            adapter.onTurnError(turnContext, err);
                        }
                    });
                });
            } else if (component["__isOutgoingWebhook"]) {
                log(`Creating a new outgoing webhook instance at ${component.__serviceEndpoint}`);
                const outgoingWebhook: IOutgoingWebhook = new component();
                router.post(component.__serviceEndpoint, outgoingWebhook.requestHandler);
            } else if (component["__isConnector"]) {
                log(`Creating a new connector instance at ${component.__connectEndpoint}`);
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
