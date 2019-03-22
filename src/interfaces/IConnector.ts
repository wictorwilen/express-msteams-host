// Copyright (c) Wictor Wilén. All rights reserved.
// Licensed under the MIT license.

import { Request } from "express";

/**
 * Interface defining an Office 365 Connector
 */
export interface IConnector {
    /**
     * Method used to connect the Connector to a Group/Team
     * A successul connect returns a HTTP 200 OK
     * @param req The HTTP request (POST)
     */
    Connect(req: Request): void;

    /**
     * Default method for invoking the Connector
     * HTTP succesful response should be HTTP 202 Accepted
     * @param req The HTTP request (POST or GET)
     */
    Ping(req: Request): void;
}
