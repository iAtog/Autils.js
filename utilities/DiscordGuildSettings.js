let mongoose = require('mongoose');
const {
    Guild,
    Client
} = require('discord.js');
const sdwjkdlasmd = require('../misc/schemas/guildSchema');
module.exports = class Manager {
    constructor(authUri = "", Schema, guild) {
        if (!Schema) Schema = sdwjkdlasmd;
        mongoose.connect(authUri, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        this.connection = mongoose.connection;
        this.connection.on('error', console.error.bind(console, 'MongoDB connection error:'));
        this.schema = Schema;
        if (guildID instanceof Guild) guild = guild.id;
        this.guild = guild;
    }

    get(key) {
        return new Promise((s, r) => {
            try {
                this.schema.findOne({
                    guild: this.guild
                }).then((x) => {
                    if (x == null || !x || !x.settings || !x.settings[key]) return r("No key found");
                    s(x.settings[key]);
                });
            } catch (x) {
                r(x);
            }
        });
    }

    set(key, value) {
        this.schema.findOne({
            guild: this.guild
        }).then(x => {
            if (x == null || !x || !x.settings) return;
            x.settings[key] = value;
            this.schema.updateOne(s, x, function (err, resp) {
                if (err) return console.error(err);
            });

        })
    }

    delete(key) {
        return new Promise(async (s, r) => {
            try {
                let data = await this.schema.findOne({
                    guild: this.guild
                });
                if (data == null || !data.settings) return s(null);

                delete data.settings[key];
                this.schema.updateOne({
                    guild: this.guild
                }, {
                    settings: data.settings
                }, function (err, resp) {
                    if (err) return console.error(err);
                });
                s();
            } catch (e) {
                r(e);
            }
        });
    }

    has(key) {
        return new Promise(async (s, r) => {
            try {
                this.schema.findOne({
                    guild: this.guild
                }).then((data) => {
                    if (data.settings || data !== null)
                        if (data.settings[key]) s(true);
                        else s(false);
                });
            } catch (err) {
                r(err);
            }
        });
    }

    init(client) {
        let guilds = client.guilds;
        guilds.cache.forEach(guild => {
            GuildSchema.findOne({
                guild: guild.id
            }).then((data) => {
                if (data) return;
                if (data == null) {
                    let g = new this.schema({
                        guild: guild.id,
                        settings: new Object()
                    });

                    g
                        .save().then((data) => {
                            //Done
                        }).catch(e => {
                            console.log(e);
                        });
                } else {}
            }).catch((err) => {
                console.log(err);
            });
        });
    }

    getSchema() {
        return this.schema;
    }
}