// Copyright (c) Wictor Wilén. All rights reserved.
// Licensed under the MIT license.

import { Router } from "express";
import * as path from "path";

/**
 * Page Router options
 */
export interface IMsTeamsPageRouterOptions {
    /**
     * root location of files
     */
    root: string;

    /**
     * All components
     */
    components: any;
}

/**
 * Express router for pages to be hosted in Microsoft Teams.
 * Pages MUST have extension of html and end with Tab, Config, Remove, Connector or ConnectorConnected
 * @param options Page Router options
 */
export const MsTeamsPageRouter = (options: IMsTeamsPageRouterOptions): Router => {
    const router = Router();

    // This is used to prevent your tabs from being embedded in other systems than Microsoft Teams
    router.use((req: any, res: any, next: any) => {
        // TODO: add the current host
        res.setHeader("Content-Security-Policy", "frame-ancestors teams.microsoft.com *.teams.microsoft.com *.skype.com *.sharepoint.com outlook.office.com " + req.headers.host);
        res.setHeader("X-Frame-Options", "ALLOW-FROM https://teams.microsoft.com/."); // IE11
        next();
    });

    // Automatically read the pages to protect from the PreventIframe decorators
    for (const app in options.components) {
        if (options.components.hasOwnProperty(app)) {
            const component = options.components[app];
            if (component.__addCsp__) {
                const arr: string[] = component.__addCsp__;
                arr.forEach((page) => {
                    router.get(page, (req: any, res: any, next: any) => {
                        res.sendFile(path.join(options.root, req.path));
                    });
                });
            }
        }
    }

    // Fallback
    router.use((req: any, res: any, next: any) => {
        res.removeHeader("Content-Security-Policy");
        res.removeHeader("X-Frame-Options"); // IE11
        return next();
    });

    return router;
};
