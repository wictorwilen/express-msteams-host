// Copyright (c) Wictor Wilén. All rights reserved.W
// Licensed under the MIT license.

/**
 * Decorator function for Outgoing Webhooks
 * @param endpoint The endpoint which the Webhook should listen to (typically '/api/webhook')
 */
export function OutgoingWebhookDeclaration(endpoint: string) {
    return (target: any) => {
        target.__isOutgoingWebhook = true;
        target.__serviceEndpoint = endpoint;
    };
}
