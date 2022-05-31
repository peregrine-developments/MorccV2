import * as logger from '../lib/logger';

module.exports = {
    event: 'ready',
    run: async (client, readyEvent) => {
        logger.log_info(`Ready in ${client.guilds.cache.size} guilds!`);
    }
};
