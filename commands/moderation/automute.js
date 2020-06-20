const { RichEmbed } = require("discord.js");
const { stripIndents } = require("common-tags");
const { promptMessage } = require("../../functions.js");
const { verify } = require('../../utils/util.js')
const userMap = new Map();

module.exports = {
    name: "automute",
    category: "moderation",
    description: "mute the member",
    usage: "<id | mention>",
    run: async (client, message, args) => {

        /*
        'id' => {
            msgCount: o,
            lastMessage: 'message',
            timer: fn()
        }
        */

    client.on('message', message => {
        if(message.author.bot) return;

        if(userMap.has(message.author.id)) {
            const userData = userMap.get(message.author.id);
            const { lastMessage, timer } = userData;
            const difference = message.createdTimestamp - lastMessage.createdTimestamp;

            let msgCount = userData.msgCount;
            if(difference > 2500){

            }
            ++msgCount;
            if(parseInt(msgCount) === 5){
                const role = message.guild.role.cache.get('599909081813352469');
                message.member.roles.add(role);
                message.channel.send('You have been muted.');
            } else {
                msgCount++;
                userData.msgCount = msgCount;
                usersMap.set(message.author.id, userData);
            }

        }
        else {
            let fn = setTimeout(() =>{
                userMap.delete(message.author.id);
                console.log('Removed from map.');
            }, 5000);
            userMap.set(message.author.id, {
                msgCount: 1,
                lastMessage: message,
                timer: null
            });
        }
    })
    }
};