import { makeEmbed } from '../../lib/embed';

const amogus = {
	id: 'amogus', // Unique command identifier
	name: ['amogus'], // Command names
	description: 'NOT THE IMPOSTOR', // Command description
	run: async (client, message, args) => {
		let designator = "amogus";
		if(args.length > 0) {
			designator = args.join(" ");
			if(Math.random() > 0.7) {
				return message.channel.send(designator + " is not sus");
			}else {
				return message.channel.send(designator + " is sus");
			}
		}else {
			return message.channel.send("sus");
		}
	}
};

export const command = amogus;
