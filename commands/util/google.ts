import { makeEmbed } from '../../lib/embed';

const GOOGLE_URL: string = "https://www.google.com/search?q=";

const google = {
    id: 'google', // Unique command identifier
    name: ['google', 'lmgtfy'], // Command names
    description: 'Google it', // Command description
    run: async (client, message, args) => {
        let googleEmbed;

        if(message.reference !== null && message.reference.messageId !== null)
        {
            // Search by replied message
            const messageReference = await message.channel.messages.fetch(message.reference.messageId);

            if(messageReference.content.length > 0)
            {
                let query: string = encodeURIComponent(messageReference.content).replace(/%20/g, '+');
    
                // Build URL
                const url: string = GOOGLE_URL + query;

                // Search by replied message
                googleEmbed = makeEmbed({
                    title: 'Google it',
                    description: `[Here you go!](${url})`,
                });

                await messageReference.reply({ embeds: [googleEmbed] });

                // Bail out
                return;
            }
            else
            {
                googleEmbed = makeEmbed({
                    title: 'Google it',
                    description: 'No content to search for!',
                });
            }
        }
        else if(args.length > 0)
        {
            // Search by query
            let query: string = encodeURIComponent(args.join(' ')).replace(/%20/g, '+');

            // Build URL
            const url: string = GOOGLE_URL + query;

            // Build embed
            googleEmbed = makeEmbed({
                title: 'Google it',
                description: `[Here you go!](${url})`,
            });
        }
        else
        {
            googleEmbed = makeEmbed({
                title: 'Google it',
                description: 'Please specify a search query.',
            });
        }

        await message.reply({ embeds: [googleEmbed] });
    }
};

export const command = google;