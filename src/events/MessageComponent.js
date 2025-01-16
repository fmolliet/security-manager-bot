const { ActionRowBuilder, ButtonBuilder, ButtonStyle, CommandInteraction, Events, Interaction, ModalBuilder, TextInputBuilder, TextInputStyle } = require("discord.js");
const constants = require("../config/Constants");

//const { Events } = require("discord.js");

module.exports = {
    name: Events.InteractionCreate,
    /**
     * 
     * @param {Interaction} interaction 
     * @returns 
     */
    async execute(interaction) {
        if (!interaction.isMessageComponent()) return;
        const user = interaction.user
        const updated = interaction.message.embeds[0].data
        const memberId = updated.fields.find(f => f.name === 'ID').value

        if (interaction.customId === 'approveRegistration') {
            updated.fields.push({ name: 'Aprovado por:', value: `<@${user.id}>` });

            if ( constants.starterRoleId )await interaction.guild.members.cache.get(memberId).roles.remove(constants.starterRoleId)
            await interaction.guild.members.cache.get(memberId).roles.add(constants.registeredRoleId)
            // TODO: Atualiza status da solicitação
            
        }

        if (interaction.customId === 'refuseRegistration') {
            updated.fields.push({ name: 'Recusado por:', value: `<@${user.id}>`});
            await interaction.guild.members.kick(memberId,"Registro recusado na portaria por "+user.username)
        }

        await interaction.update({ embeds: [updated], components: [] });

        /**
         * 
         * 
            const modal = new ModalBuilder()
                .setCustomId('refuseModal')
                .setTitle('Você está recusando o membro!');

            const memberName = new TextInputBuilder()
                .setCustomId('memberName')
                .setLabel('ID do membro? (Não mexer)')
                .setValue()
                .setStyle(TextInputStyle.Short)
                .setPlaceholder('Nos diga o motivo para recusar o membro!')
                .setRequired(true);

            const reason = new TextInputBuilder()
                .setCustomId('reasonInput')
                .setLabel('Por que recusar?')
                .setStyle(TextInputStyle.Paragraph)
                .setPlaceholder('Nos diga o motivo para recusar o membro!')
                .setRequired(true);

            const firstActionRow = new ActionRowBuilder().addComponents(reason);
            const secondActionRow = new ActionRowBuilder().addComponents(memberName);
            modal.addComponents(firstActionRow, secondActionRow);
            await interaction.showModal(modal);
         */
    }
}