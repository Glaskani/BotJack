const Command = require('./command')
const Discord = require("discord.js");

module.exports = new Command("help",function(message) {
    var msg = message.content.split(" ");
    if(msg.length==1){
        this.embed4arg(message,
        "Help :",
        "- help : Commandes pour demander de l'aide",
        "Interaction avec Jack :",
        "- ping : Renvoie pong\n- pong : Renvoie ping\n- google : Lance une recheche Google",
        "Interaction avec Jack (meme) en tant que bot-jack :", 
        "\- jack <chiffre> : Renvois <chiffre> Memes aléatoires\n- jack random : Revoi un meme aleatoire\n- jack <nom du meme> : Renvoi le Meme\n- jack meme : Renvoi la liste des memes\n- jack stop : Stop Jack\n- jack pause : Pause Jack\n- jack resume : Resume Jack\n- jack info : Information sur le meme qui est jouer\n- jack volume <volume> : Definie le volume de Jack entre 0.5, 1, 2",
        "Interaction avec Jack en tant que bot-commander :",
        "- purge <amount> : Deleting the <amount> of messages",
        '#FF0080',
        1
        )
    }
    console.log("Commands help demandée !");
    message.delete();
});