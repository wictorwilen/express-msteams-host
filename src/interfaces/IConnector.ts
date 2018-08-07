// Copyright (c) Wictor Wilén. All rights reserved.
// Licensed under the MIT license.

import { Request } from "express";


/**
 * Interface defining an Office 365 Connector
 */
export interface IConnector {
    /**
     * Method used to connect the Connector to a Group/Team
     * @param req The HTTP request (POST)
     */
    Connect(req: Request): void;

    /**
     * Default method for invoking the Connector
     * @param req The HTTP request (POST or GET)
     * @returns an array of Promises for all Connector connections
     */
    Ping(req: Request): Array<Promise<void>>;
}
