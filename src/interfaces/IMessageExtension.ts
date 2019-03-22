// Copyright (c) Wictor Wilén. All rights reserved.
// Licensed under the MIT license.

import { TurnContext, InvokeResponse } from "botbuilder";
import { MessagingExtensionQuery, InvokeResponseTyped, MessagingExtensionResponse } from "botbuilder-teams";

/**
 * Interface definition for Message Extensions
 */
export interface IMessageExtension {
    /**
     * Handler for Messaging Extension queries
     * @param turnContext the Turn Context
     * @param query the query
     */
    onQuery(turnContext: TurnContext, query: MessagingExtensionQuery): Promise<InvokeResponseTyped<MessagingExtensionResponse>>;

    /**
     * Handler for retrieving the settings URL
     * @param turnContext the turn context
     */
    onQuerySettingsUrl(turnContext: TurnContext): Promise<InvokeResponseTyped<{ composeExtension: { type: string, suggestedActions: { actions: Array<{ type: string, title: string, value: string }> } } }>>;

    /**
     * Handler for updating messaging extension settings
     * @param turnContext the turn context
     */
    onSettingsUpdate(turnContext: TurnContext): Promise<InvokeResponse>;

}
