const { MessageEmbed } = require("discord.js");
const moment = require('moment')
const { getMember, formatDate, trimArray     } = require("../../functions.js");
const { stripIndents } = require("common-tags");

module.exports = {
    name: "whois",
    aliases: ["who", "user", "info"],
    description: "Returns user information",
    usage: "[username | id | mention]",
    run: async(client, message, args) => {
        
    let user;
    if (!message.mentions.users.first()) user = message.author;
    else user = message.mentions.users.first();
    const embed = new MessageEmbed()
      .setAuthor(user.tag)
      .setThumbnail(user.displayAvatarURL({ format: "png", dynamic: true }));
    let description = stripIndents`
    **General User Info:**
    • ID: ${user.id}
    • Discord Join Date: ${moment
      .utc(user.createdAt)
      .format("MM/DD/YYYY h:mm A")}
    • ${user.bot ? "Bot" : "Not a Bot"}
`;
    if (message.channel.type === "text") {
      try {
        const member = await message.guild.members.fetch(user.id);
        const defaultRole = message.guild.roles.cache.get(message.guild.id);
        const roles = member.roles.cache
          .filter(role => role.id !== defaultRole.id)
          .sort((a, b) => b.position - a.position)
          .map(role => role);
        description += "\n\n";
        description += stripIndents`
            **Server Member Info:**
            • Nickname: ${member.nickname || "None"}
            • Server Join Date: ${moment
              .utc(member.joinedAt)
              .format("MM/DD/YYYY h:mm A")}
            • Highest Role: ${
              member.roles.highest.id === defaultRole.id
                ? "None"
                : member.roles.highest.name
            }
            • Hoist Role: ${
              member.roles.hoist ? member.roles.hoist.name : "None"
            }
            **Roles (${roles.length})**
            • ${roles.length ? trimArray(roles, 6).join(", ") : "None"}
        `;
        embed.setFooter('Created by wrose & Tyberus and Villager as Motal support')
        embed.setColor(member.displayHexColor);
      } catch {
        embed.setFooter(
          "Failed to resolve member, showing basic user information instead."
        );
      }
    }
    embed.setDescription(description);
    return message.channel.send(embed);
    }
}