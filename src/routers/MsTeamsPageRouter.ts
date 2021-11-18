// Copyright (c) Wictor Wilén. All rights reserved.
// Licensed under the MIT license.

import { Router } from "express";
import * as path from "path";
import * as debug from "debug";

/**
 * Page Router options
 */
export interface IMsTeamsPageRouterOptions {
    /**
     * root location of files
     */
    root: string;

    /**
     * All components, used to detect presence of `PreventIframe` files
     */
    components: any;
}

/**
 * Express router for pages to be hosted in Microsoft Teams.
 * @param options Page Router options
 */
export const MsTeamsPageRouter = (options: IMsTeamsPageRouterOptions): Router => {
    const router = Router();
    const log = debug.default("msteams");

    // This is used to prevent your tabs from being embedded in other systems than Microsoft Teams
    router.use((req: any, res: any, next: any) => {
        res.setHeader("Content-Security-Policy", "frame-ancestors 'self' teams.microsoft.com *.teams.microsoft.com *.skype.com *.sharepoint.com outlook.office.com *.teams.microsoft.us local.teams.office.com *.office.com " + req.headers.host);
        res.setHeader("X-Frame-Options", "ALLOW-FROM https://teams.microsoft.com/."); // IE11
        next();
    });

    // Automatically read the pages to protect from the PreventIframe decorators
    for (const app in options.components) {
        if (Object.prototype.hasOwnProperty.call(options.components, app)) {
            const component = options.components[app];
            if (component.__addCsp) {
                const arr: string[] = component.__addCsp;
                if (arr.length) {
                    arr.forEach((page) => {
                        log(`Adding CSP policy for ${page}`);
                        router.get(page, (req: any, res: any) => {
                            res.sendFile(path.join(options.root, req.path));
                        });
                    });
                }
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
