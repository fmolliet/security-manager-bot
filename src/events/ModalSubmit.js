const { ActionRowBuilder, ButtonBuilder, ButtonStyle, ModalSubmitInteraction, Events, Interaction } = require("discord.js");
const DateUtils = require("../utils/DateUtils");
const constants = require("../config/Constants");

//const { Events } = require("discord.js");

module.exports = {
    name: Events.InteractionCreate,
    /**
     * 
     * @param {ModalSubmitInteraction} interaction 
     * @returns 
     */
    async execute(interaction) {
        if (!interaction.isModalSubmit()) return;

        if (interaction.customId === 'registerModal') {
            await interaction.reply({ content: 'Recebemos seu registro com sucesso, agora aguarde a aprovação pela staff!' });

            // TODO: Grava na base a solicitação do usuário
            const birthDayInput = interaction.fields.getTextInputValue('birthDayInput');
            const fursonaInput = interaction.fields.getTextInputValue('fursonaInput');
            const sourceInput = interaction.fields.getTextInputValue('sourceInput');

            const approveChannel = interaction.guild?.channels.cache.get(constants.guildApprovalChannelId)
            if (approveChannel?.isTextBased()) {

                const confirm = new ButtonBuilder()
                    .setCustomId('approveRegistration')
                    .setLabel('Aceitar')
                    .setEmoji("✅")
                    .setStyle(ButtonStyle.Success);

                const cancel = new ButtonBuilder()
                    .setCustomId('refuseRegistration')
                    .setLabel('Recusar')
                    .setEmoji("⛔")
                    .setStyle(ButtonStyle.Danger);

                const row = new ActionRowBuilder()
                    .addComponents(cancel, confirm);

                const userId = interaction.member?.user.id
                console.log({ userId, birthDayInput, fursonaInput, sourceInput });

                await approveChannel.send({
                    content: `Novo registro do usuário <@${userId}>`,
                    embeds: [
                        {
                            title: 'Novo registro na portaria',
                            fields: [
                                {
                                    name: 'ID',
                                    value: `${userId}`,
                                    inline: true
                                },
                                {
                                    name: '✏️ Usuário:',
                                    value: `<@${userId}>`,
                                    inline: true
                                },
                                {
                                    name: '📅 Conta criada:',
                                    value: `${DateUtils.format(interaction.member?.user.createdAt)}`,
                                },
                                {
                                    name: '📅 Entrou no servidor:',
                                    value: `${DateUtils.format(interaction.member?.joinedAt)}`,
                                    inline: true
                                },
                                {
                                    name: '📅 Data de nascimento:',
                                    value: birthDayInput
                                },
                                {
                                    name: '🐺 Fursona:',
                                    value: fursonaInput
                                },
                                {
                                    name: '🛰️ Origem:',
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