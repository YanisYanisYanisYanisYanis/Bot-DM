// Charge tout ce qui est nécessaire au fonctionnement du bot 
const Discord = require('discord.js');
const config = require('./config.json');
const client = new Discord.Client();
const prefix = config.prefix

//  Initialise le client et l'indique dans la console
client.on("ready", () => {
    console.log(`Connecté en tant que ${client.user.tag}!`)
  })


//  Détecte l'arrivée d'un message sur le serveur (dans les salons qui lui sont visibles)
client.on("message", async (message) => {

//  Rejette les messages de bots/ne commencant pas par le préfix défini
    if (message.author.bot) return;
    if (!message.content.startsWith(prefix)) return;

//  Défini "commande" comme étant le message formatté de manière strict
    const commandBody = message.content.slice(prefix.length);
    const args = commandBody.split(' ');
    const command = args.shift().toLowerCase();

//  Séléctionne le serveur dont les membres recevront le message
    guild = client.guilds.cache.get(config.server);

//  Détecte la commande "mp" selon le formattage effectué
    if (command === "mp") {

//  Obtient la liste des membres du serveur+retire les 3 premiers caractères du message ("?mp")
      const members = await guild.members.fetch();
      const contenu = message.content.slice(3);

//  code de debug
//  message.channel.send(contenu)

      message.channel.send(`\`Opération en cours...\``)

//  Renvoie le message à chacun des membres du serveur
      for (const [id, member] of members) {
        member.user.send(contenu)
        .catch(console.error);
          console.log(`Message envoyé à ${member.user.username}`);

      };

//  Notifie que l'opération à été effectuée
      message.channel.send(`\`Opération effectuée\``);
      console.log(`Opération effectuée\n\n\n\n\n\n\n\n\n\n\n\n\n\n\nErreurs:\n`);

    }

});


// Le token du bot
client.login(config.token);