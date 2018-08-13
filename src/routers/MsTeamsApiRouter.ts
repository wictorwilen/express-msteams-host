// Copyright (c) Wictor Wilén. All rights reserved.
// Licensed under the MIT license.

import { Router } from "express";
import { IBot } from "../interfaces/IBot";
import { IOutgoingWebhook } from "../interfaces/IOutgoingWebhook";
import { IConnector } from "../interfaces/IConnector";
import * as teamBuilder from "botbuilder-teams";
import * as debug from "debug";

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

                const bot: IBot = new component(new teamBuilder.TeamsChatConnector(component.botSettings));
                router.post(component.serviceEndpoint, (req: any, res: any) => {
                    return bot.Connector.listen()(req, res);
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
                    Promise.all(connector.Ping(req)).then((p) => {
                        log(`Connector ping succeeded (POST)`);
                        res.redirect("/");
                    }).catch((reason) => {
                        log(reason);
                    });
                });

                // GET option
                router.get(component.pingEndpoint, (req, res) => {
                    Promise.all(connector.Ping(req)).then((p) => {
                        log(`Connector ping succeeded (GET)`);
                        res.redirect("/");
                    }).catch((reason) => {
                        log(reason);
                    });
                });

                // Connector connect page - used for configuration
                router.get(component.connectEndpoint, (req, res) => {
                    if (!req.query.state) {
                        res.redirect("/");
                        return;
                    }
                    res.render(component.connectPage, {
                        webhookUrl: req.query.webhook_url,
                        user: req.query.user_objectId,
                        appType: req.query.app_type,
                        groupName: req.query.group_name,
                        state: req.query.state,
                    });
                });

                // Connector connect post back - used when adding the connector
                router.post(component.connectEndpoint, (req, res) => {
                    connector.Connect(req);
                    res.redirect(component.connectedPage);
                });

            } else {
                // component is not of a recognized type
            }
        }
    }
    return router;
};
