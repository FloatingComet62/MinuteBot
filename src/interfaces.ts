import { SlashCommandBuilder } from "@discordjs/builders";
import { Client, Collection, Message, MessageComponentInteraction } from "discord.js";

export interface customClient extends Client {
    commands?: Collection<string, Command>;
}
export interface Command {
    data: SlashCommandBuilder;
    needClient: boolean;
    execute(interaction: MessageComponentInteraction, client?: customClient): Promise<void>;
}
export interface Event {
    name: string;
    once: boolean;
    needClient: boolean;
    execute(...any: any[]): Promise<void>;
}

export type Handler = (client: customClient, message: Message) => Promise<void>;