// Copyright (c) Wictor Wilén. All rights reserved.
// Licensed under the MIT license.

import { TurnContext } from "botbuilder";

/**
 * Interface for defining a Bot
 */
export interface IBot {
    /**
     * Turn Handler
     * @param context the TurnContext
     */
    onTurn(context: TurnContext): Promise<any>;
}
