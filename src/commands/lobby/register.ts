const { SlashCommandBuilder } = require('discord.js');

export default {
	cooldown: 60,
	data: new SlashCommandBuilder()
		.setName('registro')
		.setDescription('Reliza a criação de um registro na portaria!'),
	async execute(interaction) {
		await interaction.reply('Pang!');
	},
};