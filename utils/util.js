async function verify(channel, user, time = 30000) {
    const yes = ["yes", "y", "ye", "yeah", "yup", "yea", "ya"];
    const no = ["no", "n", "nah", "nope", "nop"];
    const filter = res => {
      const value = res.content.toLowerCase();
      return (
        (user ? res.author.id === user.id : true) &&
        (yes.includes(value) || no.includes(value))
      );
    };
    const verify = await channel.awaitMessages(filter, {
      max: 1,
      time
    });
    if (!verify.size) return 0;
    const choice = verify.first().content.toLowerCase();
    if (yes.includes(choice)) return true;
    if (no.includes(choice)) return false;
    return false;
  }
  
  const redMessage = (message, title, description = null) => {
    message.channel.send({
      embed: {
        color: 15158332,
        title: title,
        description: description,
        author: {
          name: message.client.user.username,
          icon_url: message.client.user.avatarURL({
            format: "png",
            dynamic: true,
            size: 1024,
          }),
        },
      },
    });
  };
  const blueMessage = (message, title, description = null) => {
    message.channel.send({
      embed: {
        color: 3447003,
        title: title,
        description: description,
        author: {
          name: message.client.user.username,
          icon_url: message.client.user.avatarURL({
            format: "png",
            dynamic: true,
            size: 1024,
          }),
        },
      },
    });
  };
    
  module.exports = {redMessage, blueMessage,
      verify
  }

  let request = require("request");
  let cheerio = require("cheerio");
