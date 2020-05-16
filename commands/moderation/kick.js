const { RichEmbed } = require("discord.js");
const { stripIndents } = require("common-tags");
const { promptMessage } = require("../../functions.js");
const { verify } = require('../../utils/util.js')
module.exports = {
    name: "kick",
    category: "moderation",
    description: "Kicks the member",
    usage: "<id | mention>",
    run: async (client, message, args) => {
        if(!message.member.hasPermission('KICK_MEMBERS')) return message.reply('Fuck you blyat')
    try {
      await message.reply('SURE BLYAT ?')
        const verification = await verify(message.channel, message.author);
        if(!verification) return message.reply('Hủy bỏ');
        let user = await message.mentions.members.first();
    if (!user) {
      message.channel.send({
        embed: {
          title: "__***PICK A USER FOOL***__",
          color: 15158332
        }
      });
    }
    let reason = args[1] ? args[1] : "Not specified";
    let kickedUser = await client.users.fetch(user.id);
    await user.kick(reason)
    .then(() => {
      message.channel.send({
        embed: {
          color: 15158332,
          title: message.author.tag + " đã bị khai trừ khỏi server",
          fields: [
            { name: "User", value: kickedUser.username },
            { name: "Reason", value: reason }
          ]
        }
      });
    })
    
    } catch (e) {
      message.channel.send({embed: {
        color:15158332,
        title: e.name,
        description:e.message
      }})
    }
    }
};
