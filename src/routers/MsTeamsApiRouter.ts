// Copyright (c) Wictor Wilén. All rights reserved.
// Licensed under the MIT license.

import { Router } from "express";
import { IBot } from "../interfaces/IBot";
import { IOutgoingWebhook } from "../interfaces/IOutgoingWebhook";
import { IConnector } from "../interfaces/IConnector";
// import * as teamBuilder from "botbuilder-teams";
import * as debug from "debug";
import { BotFrameworkAdapter, ConversationState } from "botbuilder";
import { TeamsMiddleware } from "botbuilder-teams";
import { MessagingExtensionMiddleware } from "../impl/MessagingExtensionMiddleware";

/**
 * Express router for Microsoft Teams Connectors, Bots and Outgoing Webhooks
 * @param components Imported module with all implementations
 */
export const MsTeamsApiRouter = (components: any): Router => {
    const router = Router();
    const log = debug("msteams");

    for (const app in components) {
        if (components.hasOwnProperty(app)) {
            const component = components[app];

            if (component["isBot"]) {
                log(`Creating a new bot instance at ${component.serviceEndpoint}`);

                const adapter = new BotFrameworkAdapter(component.botSettings);

                let conversationState: ConversationState;

                // Create the conversation state
                conversationState = new ConversationState(component.storage);

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
                adapter.use(new MessagingExtensionMiddleware(bot));

                router.post(component.serviceEndpoint, (req: any, res: any) => {
                    adapter.processActivity(req, res, async (turnContext): Promise<any> => {
                        try {
                            await bot.onTurn(turnContext);
                        } catch (err) {
                            adapter.onTurnError(turnContext, err);
                        }
                    });
                });

            } else if (component["isOutgoingWebhook"]) {
                log(`Creating a new outgoing webhook instance at ${component.serviceEndpoint}`);

                const outgoingWebhook: IOutgoingWebhook = new component();
                router.post(component.serviceEndpoint, outgoingWebhook.requestHandler);

            } else if (component["isConnector"]) {
                log(`Creating a new connector instance at ${component.connectEndpoint}`);

                const connector: IConnector = new component();

                // Connector Ping endpoint
                // POST option
                router.post(component.pingEndpoint, (req, res) => {
                    connector.Ping(req);
                    res.sendStatus(202);
                });

                // GET option
                router.get(component.pingEndpoint, (req, res) => {
                    connector.Ping(req);
                    res.sendStatus(202);
                });

                // Connector connect post back - used when adding the connector
                router.post(component.connectEndpoint, (req, res) => {
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
