// Copyright (c) Wictor Wilén. All rights reserved.
// Licensed under the MIT license.

/**
 * Interface defining an Office 365 Connector
 */
export interface IConnector {
    /**
     * Method used to connect the Connector to a Group/Team
     * @param body The HTTP request body
     */
    Connect(body: any): void;

    /**
     * Default method for invoking the Connector
     */
    Ping(): Array<Promise<void>>;
}
