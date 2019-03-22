// Copyright (c) Wictor Wilén. All rights reserved.
// Licensed under the MIT license.

/**
 * Decorator function for Office 365 Connectors
 * @param connectEndpoint The endpoint (HTTP GET) for the Connector connect end point (typically '/api/connector/connect')
 * @param pingEndpoint The endpoint (HTTP GET) for the Ping method (typically '/api/connector/ping')
 * @param configurationPage The absolute url of the web page to be used when configuring/connecting the Connector.
 */
export function ConnectorDeclaration(
    connectEndpoint: string,
    pingEndpoint: string,
    configurationPage: string) {
    return (target: any) => {
        target.isConnector = true;
        target.connectEndpoint = connectEndpoint;
        target.pingEndpoint = pingEndpoint;
        target.configurationPage = configurationPage;
    };
}
