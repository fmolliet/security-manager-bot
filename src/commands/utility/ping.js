const { SlashCommandBuilder, ChatInputCommandInteraction } = require('discord.js');

module.exports = {
	cooldown: 15,
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Replies with Pong!'),
	/**
	 * 
	 * @param {ChatInputCommandInteraction} interaction 
	 */
	async execute(interaction) {
		await interaction.reply('Pang!');
	},
};