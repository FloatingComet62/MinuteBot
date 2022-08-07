import { customClient } from "../interfaces";


export const name = 'ready';
export const once = true;
export const needClient = true;

export function execute(client: customClient): void{
	console.log(`Ready! Logged in as ${client.user?.tag}`);
}