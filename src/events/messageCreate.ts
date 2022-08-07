import { Message } from "discord.js";
import { readdirSync } from 'fs'
import { customClient, Handler } from "../interfaces";
import { join } from 'path'

export const name = 'messageCreate';
export const once = false;
export const needClient = true;

export async function execute(client: customClient, message: Message): Promise<void>{
    const handlersPath = join(__dirname, '..', 'handlers');
    const handlerFiles = readdirSync(handlersPath).filter(file => file.endsWith('.js'));
    for(const file of handlerFiles){
        const filePath = join(handlersPath, file);
        const handler: Handler = require(filePath).default;
        await handler(client, message);
    }
}