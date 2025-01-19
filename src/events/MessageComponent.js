const { Events, Interaction } = require("discord.js");
const constants = require("../config/constants");
const { updateRegistration } = require("../api/fbservices");

module.exports = {
    name: Events.InteractionCreate,
    /**
     *
     * @param {Interaction} interaction
     * @returns
     */
    async execute(interaction) {
        if (!interaction.isMessageComponent()) return;
        if (interaction.user.bot) return;
        if ( interaction.customId === "openRegistrationModal") return;
        const user = interaction.user
        const updated = interaction.message.embeds[0].data
        const memberId  = updated.fields.find(f => f.name === 'ID').value

        if (interaction.customId.startsWith('approveRegistration')) {
            updated.fields.push({ name: 'Aprovado por:', value: `<@${user.id}>` });
            if ( constants.starterRoleId ) await interaction.guild.members.cache.get(memberId).roles.remove(constants.starterRoleId)
            if ( constants.registeredAltRoleId && interaction.customId === 'approveRegistrationAlt') {
                await interaction.guild.members.cache.get(memberId).roles.add(constants.registeredAltRoleId)
            } else {
                await interaction.guild.members.cache.get(memberId).roles.add(constants.registeredRoleId)
            }
            await updateRegistration(memberId, user.id, true)

        }

        if (interaction.customId === 'refuseRegistration') {
            updated.fields.push({ name: 'Recusado por:', value: `<@${user.id}>`});
            await interaction.guild.members.kick(memberId,"Registro recusado na portaria por "+user.username)
            await updateRegistration(memberId, user.id, false)
        }

        await interaction.update({ embeds: [updated], components: [] });
    }
}
