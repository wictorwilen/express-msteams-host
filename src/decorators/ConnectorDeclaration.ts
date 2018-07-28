// Copyright (c) Wictor Wilén. All rights reserved. 
// Licensed under the MIT license.

/**
 * Decorator function for Office 365 Connectors
 * @param connectEndpoint The endpoint (HTTP GET) for the Connector connect end point (typically '/api/connector/connect')
 * @param pingEndpoint The endpoint (HTTP GET) for the Ping method (typically '/api/connector/ping')
 * @param connectPage The absolute url of the web page to be used when configuring/connecting the Connector
 * @param connectedPage The absolute url of the web page that the user will be redirected after a successful Connector configuration
 */
export function ConnectorDeclaration(
    connectEndpoint: string,
    pingEndpoint: string,
    connectPage: string,
    connectedPage: string) {
    return (target: any) => {
        target.isConnector = true;
        target.connectEndpoint = connectEndpoint;
        target.pingEndpoint = pingEndpoint;
        target.connectPage = connectPage;
        target.connectedPage = connectedPage;
    }
}