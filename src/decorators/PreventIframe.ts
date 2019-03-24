// Copyright (c) Wictor Wilén. All rights reserved.W
// Licensed under the MIT license.

/**
 * Decorator that instructs the page router to add files to the list of files to be protected by a content security policy that does not allow iframes outside of Microsoft Teams
 * @param endpoint The Url
 */
export function PreventIframe(url: string) {
    return (target: any): void => {
        if (target.__addCsp === undefined) {
            target.__addCsp = [];
        }
        target.__addCsp.push(url);
    };
}
