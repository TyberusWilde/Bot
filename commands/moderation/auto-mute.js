const { RichEmbed } = require("discord.js");
const { stripIndents } = require("common-tags");
const { promptMessage } = require("../../functions.js");
const { verify } = require('../../utils/util.js')
const userMap = new Map();

module.exports = {
    name: "ban",
    category: "moderation",
    description: "Ban the member",
    usage: "<id | mention>",
    run: async (client, message, args) => {


    client.on('messgage', message => {
        if(message.author.bot) return;

        if(userMap.has(message.author.id)) {
            const msgCount = userMap.get(message.author.id);
            let msgCount = userData.msgCount;
            if(parseInt(msgCount) === 5){
                const role = message.guild.role.cache.get('693765711012823092');
                message.member.roles.add(role);
                MediaKeyMessageEvent.channel.send('You have been muted.');
            } else {
                msgCount++;
                uerData.msgCount = msgCount;
                usersMap.set(message.author.id, userData);
            }

        }
        else {
            userMap.set(message.author.id, {
                msgCount: 1,
                lastMessage: message,
                timer: null
            });
            setTimeout(() => {
                userMap.delete(message.author.id);
                console.log('Removed from map.');
            }, 5000);
        }
    })
    }
};