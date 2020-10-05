import { Client, Intents, Message } from 'discord.js';
const client: Client = new Client({
	messageCacheLifetime: 200,
	messageCacheMaxSize: 200,
	messageSweepInterval: 180,
	ws: { intents: Intents.NON_PRIVILEGED },
});
import * as config from './config';
client.on('ready', () => console.log(`${client.user.tag} is ready to honk.`));
client.on('message', async (message: Message) => {
	if (message.author.bot || !message.guild) return;
	if (message.content.toLowerCase().includes('honk')) {
		const args = message.content.trim().split(/ +/g);
		const honkArgs = args.filter((arg: string) =>
			arg.toLowerCase().includes('honk'),
		);
		let shouldIHonk: boolean;
		let honkAmount: number = 0;
		honkArgs.map((arg: string) => {
			if (arg.startsWith(`<:`) && arg.endsWith(`>`)) return;
			else {
				shouldIHonk = true;
				honkAmount++;
				return;
			}
		});
		if(shouldIHonk == true && honkAmount >= 7) {
			message.reply(`I can't honk that many times. ${honkAmount} is too many honks.`);
			try {
				await message.delete();
			} catch {};
		}
		if (shouldIHonk == true)
			return message.reply(
				`honk. ${
					honkAmount == 1 ? '' : `[x${honkAmount}]`
				}`.trim(),
			);
	}
});
client.login(config.token);
