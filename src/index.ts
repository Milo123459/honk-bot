import { Client, Intents, Message } from 'discord.js';
const client: Client = new Client({
	messageCacheLifetime: 200,
	messageCacheMaxSize: 200,
	messageSweepInterval: 180,
	ws: { intents: Intents.NON_PRIVILEGED },
});
import * as config from "./config";
client.on('ready', () => console.log(`${client.user.tag} is ready to honk.`));
client.on('message', async (message: Message) => {
	if (message.author.bot || !message.guild) return;
	if (message.content.toLowerCase().includes('honk')) {
		const args = message.content.trim().split(/ +/g);
		const honkArgs = args.filter((arg: string) =>
			arg.toLowerCase().includes('honk'),
		);
		let shouldIHonk: boolean;
		honkArgs.map((arg: string) => {
			if (arg.startsWith(`<:`) && arg.endsWith(`>`)) return;
			else return (shouldIHonk = true);
		});
		if (shouldIHonk == true)
			return message.channel.send(`${message.member || message.author}, honk.`);
	}
});
client.login(config.token);
