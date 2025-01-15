const { ActionRowBuilder, ButtonBuilder, ButtonStyle, CommandInteraction, Events, Interaction } = require("discord.js");

//const { Events } = require("discord.js");

module.exports = {
    name: Events.InteractionCreate,
    /**
     * 
     * @param {Interaction} interaction 
     * @returns 
     */
    async execute(interaction) {
        if (!interaction.isModalSubmit()) return;

        if (interaction.customId === 'registerModal') {
            await interaction.reply({ content: 'Your submission was received successfully!' });

            const userId = interaction.member?.user.id
            const birthDayInput = interaction.fields.getTextInputValue('birthDayInput');
            const fursonaInput = interaction.fields.getTextInputValue('fursonaInput');
            const sourceInput = interaction.fields.getTextInputValue('sourceInput');
            console.log({ userId, birthDayInput, fursonaInput, sourceInput });

            //TODO: Buscar dinamicamente o canal de aprovação
            const approveChannel = interaction.guild?.channels.cache.get("1328922027024842852")
            if (approveChannel?.isTextBased()) {

                const confirm = new ButtonBuilder()
                    .setCustomId('confirm')
                    .setLabel('Aceitar')
                    .setEmoji("✅")
                    .setStyle(ButtonStyle.Success);

                const cancel = new ButtonBuilder()
                    .setCustomId('refuse')
                    .setLabel('Recusar')
                    .setEmoji("⛔")
                    .setStyle(ButtonStyle.Danger);

                const row = new ActionRowBuilder()
                    .addComponents(cancel, confirm);

                await approveChannel.send({
                    content: `New registration from <@${userId}>`,
                    embeds: [
                        {
                            title: 'New Registration',
                            fields: [
                                {
                                    name: 'User',
                                    value: `<@${userId}>`
                                },
                                {
                                    name: 'Birthday',
                                    value: birthDayInput
                                },
                                {
                                    name: 'Fursona',
                                    value: fursonaInput
                                },
                                {
                                    name: 'Source',
                                    value: sourceInput
                                }
                            ]
                        }
                    ], components: [
                        row
                    ]
                });
            }
        }

    }
}