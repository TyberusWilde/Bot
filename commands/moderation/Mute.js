const { RichEmbed } = require("discord.js");
const { stripIndents } = require("common-tags");
const { promptMessage } = require("../../functions.js");
const { verify } = require('../../utils/util.js')
module.exports = {
    name: "mute",
    category: "moderation",
    description: "mute the member",
    usage: "<id | mention>",
    run: async(client, message, args) => {
        if(!message.member.hasPermission(['KICK_MEMBERS', 'BAN_MEMBERS']))
            message.channel.send("You don't have permissions to use that command.");
        else {
            let memberId = message.content.substring(message.content.indexOf(' ')+1);
            let member = message.guild.members.cache.get(args);
            if(member) {
                if(member.hasPermission(['KICK_MEMBERS', 'BAN_MEMBERS']) && !message.member.hasPermission('ADMINISTRATOR'))
                    message.channel.send("You cannot mute that person!");
                else {
                    let mutedRole = message.guild.roles.cache.get('693765711012823092');
                    if(mutedRole) {
                        member.roles.add(mutedRole);
                        message.channel.send("User was muted.");
                    }
                    else
                        message.channel.send("Muted role not found.");
                }
            }
            else
                message.channel.send("Member not found.");
        }
    },
    aliases: [],
    description: 'Mutes a user'
}