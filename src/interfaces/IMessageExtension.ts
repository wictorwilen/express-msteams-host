// Copyright (c) Wictor Wilén. All rights reserved.
// Licensed under the MIT license.

import * as builder from "botbuilder";
import * as teamBuilder from "botbuilder-teams";

export interface IMessageExtension {
    onQuery(
        event: builder.IEvent,
        query: teamBuilder.ComposeExtensionQuery,
        callback: (err: Error, result: teamBuilder.IComposeExtensionResponse, statusCode: number) => void): void;

    onQuerySettingsUrl(
        event: builder.IEvent,
        query: teamBuilder.ComposeExtensionQuery,
        callback: (err: Error, result: teamBuilder.IComposeExtensionResponse, statusCode: number) => void): void;

    onSettingsUpdate(
        event: builder.IEvent,
        query: teamBuilder.ComposeExtensionQuery,
        callback: (err: Error, result: teamBuilder.IComposeExtensionResponse, statusCode: number) => void): void;

}
