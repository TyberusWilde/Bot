const { rollDice } = require('../../utils/dicefn');

module.exports = {
    name: "roll",
    category: "fun",
    description: "roll",
    usage: "<id | mention>",
    run: async(client, message) => {
        message.reply("rolled a " + rollDice());
    },
    aliases: ['dice', 'rolldice'],
    description: 'Rolls the dice'
}