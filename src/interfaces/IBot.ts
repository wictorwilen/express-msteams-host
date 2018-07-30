// Copyright (c) Wictor Wilén. All rights reserved.
// Licensed under the MIT license.

import * as teamBuilder from "botbuilder-teams";

export interface IBot {
    /**
     * Exposes the Bot Framework Connector
     */
    readonly Connector: teamBuilder.TeamsChatConnector;
}
