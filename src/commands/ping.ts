import { MessageComponentInteraction } from "discord.js";
import { EmbedBuilder, SlashCommandBuilder } from '@discordjs/builders';
import { customClient } from "../interfaces";

export const data = new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Sends latency info');
export const needClient = true;

export async function execute(
    interaction: MessageComponentInteraction,
    client: customClient
): Promise<void> {
    const embed = new EmbedBuilder()
        .setTitle("Latency")
        .setDescription(`🏓**Latency** is \`${Date.now() - interaction.createdTimestamp}ms\`.\n🏸**API Latency** is \`${Math.round(client.ws.ping)}ms\`.`)
        .setColor(0xaaaaaa);
    
    interaction.reply({ embeds: [embed.toJSON()], ephemeral: true });
}