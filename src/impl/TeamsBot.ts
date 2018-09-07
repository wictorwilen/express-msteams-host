import { IBot } from "../interfaces/IBot";
import * as builder from "botbuilder";
import * as teamBuilder from "botbuilder-teams";
import { IMessageExtension } from "../interfaces";
import * as debug from "debug";

const log = debug("msteams");

/**
 * Implementation for the IBot interface
 *
 * Instantiates a Bot Framework.
 */
export class TeamsBot implements IBot {
    /**
     * The Teams Chat Connector
     */
    public readonly Connector: teamBuilder.TeamsChatConnector;

    /**
     * Private property for storing MessageExtensions
     */
    private MessageExtensions: Array<{ propertyKey: string, name: string }>;

    /**
     * Default consturctor
     * @param connector the Teams Chat Connector
     */
    public constructor(connector: teamBuilder.TeamsChatConnector) {
        this.Connector = connector;
        // _messageExtensions is set by the MessageExtensionDeclaration
        this.MessageExtensions = (<any>this)._messageExtensions ? (<any>this)._messageExtensions : [];
    }

    /**
     * Registers message extensions with the Bot Connector.
     * All properties marked with the MessageExtensionDecorator will be registered
     */
    protected registerMessageExtensions() {
        // TODO: add a parameter so that additional, non-decorated, message extensions can be added

        this.MessageExtensions.forEach((e: { propertyKey: string, name: string }) => {
            log(`Connecting the Message Extensions: ${e.name}`);

            const ex = this[e.propertyKey] as IMessageExtension;
            this.Connector.onQuery(e.name, ex.onQuery);
        });

        this.Connector.onQuerySettingsUrl((
            event: builder.IEvent,
            query: teamBuilder.ComposeExtensionQuery,
            callback: (err: Error, result: teamBuilder.IComposeExtensionResponse, statusCode?: number) => void) => {
            const me = this.MessageExtensions.find((x: { propertyKey: string, name: string }) => {
                return x.name === query.commandId;
            });
            if (me) {
                (<IMessageExtension>this[me.propertyKey]).onQuerySettingsUrl(event, query, callback);
            }
        });

        this.Connector.onSettingsUpdate((
            event: builder.IEvent,
            query: teamBuilder.ComposeExtensionQuery,
            callback: (err: Error, result: teamBuilder.IComposeExtensionResponse, statusCode?: number) => void) => {
            const me = this.MessageExtensions.find((x: { propertyKey: string, name: string }) => {
                return x.name === query.commandId;
            });
            if (me) {
                (<IMessageExtension>this[me.propertyKey]).onSettingsUpdate(event, query, callback);
            }
        });

    }
}
