// Copyright (c) Wictor Wilén. All rights reserved.
// Licensed under the MIT license.

/**
 * Decorator function for Office 365 Connectors
 * @param connectEndpoint The endpoint (HTTP GET) for the Connector connect end point (typically '/api/connector/connect')
 * @param pingEndpoint The endpoint (HTTP GET) for the Ping method (typically '/api/connector/ping')
 */
export function ConnectorDeclaration(
    connectEndpoint: string,
    pingEndpoint: string) {
    return (target: any) => {
        target.__isConnector = true;
        target.__connectEndpoint = connectEndpoint;
        target.__pingEndpoint = pingEndpoint;
    };
}
