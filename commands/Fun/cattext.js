const neko = require('nekos.life')
const owo = new neko()
const { blueMessage, redMessage } = require('../../utils/message')
module.exports = {
  
    name: 'cattext',
    category: "fun",
    usage: 'cattext',
    aliases: [],
    description: 'Show random cat texts from neko.life server',
    usage: "",
  
  async run (client, message, args) {
    const text = await owo.sfw.catText()
    if (!text) return redMessage(message, 'Something happened', ':sad:')
    message.reply(text.cat)
  }
}