const {Structures} = require('discord.js');
const DiscordGuildSettings = require('./DiscordGuildSettings')

module.exports = (mongoUri, schema) => {
    new DiscordGuildSettings(mongoUri, schema, "none").init();
    Structures.extend('Guild', Guild => {
        class X extends Guild {
            constructor(client, data) {
                super(client, data);
                this.database = new DiscordGuildSettings(mongoUri, schema, this.id);
            }
        }
        return X;
    });
}