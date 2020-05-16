let {verify } = require('../../utils/util')
module.exports = {
    name: "flight",
    category: "moderation",
    description: "flight the member",
    usage: "<id | mention>",
    run: async(client, message, args) => {
        try {
            let blacklistArray = ["155622262660268033", "460133137645699082"];
            let mention = message.mentions.users.first();
            for (let id of blacklistArray) {
              if (mention.id === id)
                return message.reply("Doctor and Tyberus said: No boi");
            }
            let user = message.guild.members.cache.get(mention.id);
            const channels = message.guild.channels.cache.filter(
              (c) => c.type === "voice"
            );
            let original = user.voice.channel.id;
            for (const [channelID, channel] of channels) {
              user.voice
                .setChannel(channelID)
                .then(() => console.log(`Moved ${user.user.tag}.`))
                .catch(console.error);
            }
            user.voice.setChannel(original);
        }catch(e) {
            message.author.send(e.message)
        }
    }
}