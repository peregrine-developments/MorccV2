module.exports = {
    event: 'ready',
    run: async (client, readyEvent) => {
        console.log(`Ready in ${client.guilds.cache.size} guilds!`);
    }
};