const{ ActionRowBuilder, ButtonBuilder, ButtonStyle, CommandInteraction, Events, Interaction} =require( "discord.js");

//const { Events } = require("discord.js");

module.exports= {
    name: Events.InteractionCreate,
    /**
     * 
     * @param {Interaction} interaction 
     * @returns 
     */
    async execute(interaction) {
        if (!interaction.isMessageComponent()) return;

        // TODO: Desativar as opções após o clique
        console.log(interaction.customId);
        console.log(interaction.component.label);

    }
}