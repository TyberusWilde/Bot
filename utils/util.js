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

  module.exports = {
      verify
  }