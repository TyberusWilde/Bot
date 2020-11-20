const { RichEmbed } = require("discord.js");
const { stripIndents } = require("common-tags");
const { promptMessage } = require("../../functions.js");
const { verify } = require("../../utils/util.js");
const userMap = new Map();
const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");

const adapter = new FileSync("db.json");
const db = low(adapter);
module.exports = {
  name: "automute",
  category: "moderation",
  description: "mute the member",
  usage: "<id | mention>",
  run: async (client, message, args) => {
    if (!message.member.hasPermission("MUTE_MEMBERS"))
      return message.reply("you gay");
    db.defaults({ records: [] }).write();
    let target = await message.mentions.members.first();
    let targetId = target ? target.id : message.guild.ownerID;
    let userData = await message.guild.members.cache.get(targetId);
    if (!userData)
      message.reply("Something happened, please tag the user probably");
    let user = {
      id: userData.user.id,
      username: userData.user.username,
      discriminator: userData.user.discriminator,
      guildID: message.guild.id,
    };
    if (args.includes("--remove plz")) {
      db.get("records").remove({ id: user.id }).write();
      message.reply("Removed automute for " + user.username);
    } else if (args.includes("--list")) {
    } else {
      db.get("records").push({ id: user.id, guildID: user.guildID }).write();
      message.reply("Added automute for " + user.username);
    }
  },
};
