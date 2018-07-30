// Copyright (c) Wictor Wilén. All rights reserved.
// Licensed under the MIT license.

import * as Express from "express";

/**
 * Interface for defining an Outgoing Webhook
 */
export interface IOutgoingWebhook {
    /**
     * Handles requests to the Outgoing Webhook
     * @param req The Express HTTP request
     * @param res The Express HTTP response
     * @param next The Express next function
     */
    requestHandler(req: Express.Request, res: Express.Response, next: Express.NextFunction);
}
