import { EmbedBuilder } from "@discordjs/builders";
import { Message } from "discord.js";
import fs from 'fs'
import { customClient } from "../interfaces";

export const name = 'messageCreate';
export const once = false;
export const needClient = true;

export async function execute(client: customClient, message: Message): Promise<void>{
	if(message.channelId !== "1005387938068189184") return;
    if(message.author.id === client.user?.id) return;

    const number = parseInt(message.content);
    // delete stuff like "bruh"
    if(isNaN(number)) {
        await message.delete();
        return;
    }

    const lastInt = parseInt(fs.readFileSync('counting.txt').toString());
    // delete incorrect counting
    if(lastInt+1 !== number) {
        message.react('🚫');
        const embed = new EmbedBuilder()
            .setTitle("Incorrect counting")
            .setDescription(`<@!${message.author.id}> ruined it!\nStart from 0 now!`)
            .setColor(0xaaaaaa);
        await message.channel.send({ embeds: [embed.toJSON()] });

        fs.writeFileSync('counting.txt', "0");
        return;
    }

    fs.writeFileSync('counting.txt', number.toString());
    message.react('✅');
}