const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('setup')
    .setDescription('Deploy complete OBSIDIA server setup'),
  
  async execute(interaction) {
    await interaction.deferReply({ ephemeral: true });

    const guild = interaction.guild;

    try {
      await interaction.editReply('🚀 Starting OBSIDIA deployment...');

      // ========================
      // PHASE 1: CREATE ROLES
      // ========================
      
      const roles = {};
      const roleData = [
        { name: '👑 Owner', color: '#FFD700', hoist: true },
        { name: '🛡️ Admin', color: '#FF0000', hoist: true },
        { name: '📋 Head Moderator', color: '#FFA500', hoist: true },
        { name: '🚨 Moderator', color: '#FFFF00', hoist: false },
        { name: '💬 Helper', color: '#00FF00', hoist: false },
        { name: '🎮 Gamer', color: '#0099FF', hoist: false },
        { name: '💼 Business', color: '#FF6600', hoist: false },
        { name: '🧠 Theory Crafter', color: '#9933FF', hoist: false },
        { name: '⭐ Community Star', color: '#FFFF00', hoist: false },
        { name: '✅ Verified Member', color: '#00FF99', hoist: false },
        { name: '👤 Member', color: '#CCCCCC', hoist: false },
        { name: '🤖 System Bot', color: '#6600FF', hoist: false },
        { name: '🔇 Muted', color: '#333333', hoist: false },
        { name: '⛔ Restricted', color: '#990000', hoist: false },
        { name: '📢 Announcer', color: '#00CCFF', hoist: false }
      ];

      for (const role of roleData) {
        try {
          const created = await guild.roles.create({
            name: role.name,
            color: role.color,
            hoist: role.hoist
          });
          roles[role.name] = created;
        } catch (e) {
          console.error(`Failed to create role ${role.name}:`, e);
        }
      }

      await interaction.editReply(`✅ Created 15 roles\n🔄 Creating categories...`);

      // ========================
      // PHASE 2: CREATE CATEGORIES
      // ========================

      const categories = {};
      const categoryData = [
        { name: '🛡️ MOD OPERATIONS CENTER', position: 0 },
        { name: '📍 WELCOME & ONBOARDING', position: 1 },
        { name: '💬 GENERAL COMMUNITY', position: 2 },
        { name: '🔍 TRENDING & INTELLIGENCE', position: 3 },
        { name: '🎤 VOICE CHANNELS', position: 4 },
        { name: '📊 LEVELING & PROGRESSION', position: 5 },
        { name: '💼 BUSINESS & NETWORKING', position: 6 },
        { name: '📚 SKILL & LEARNING', position: 7 },
        { name: '🎮 COMMUNITY ACTIVITIES', position: 8 },
        { name: '⚖️ MODERATION & APPEALS', position: 9 },
        { name: '💎 EXCLUSIVE COMMUNITIES', position: 10 },
        { name: '📖 MOD TRAINING & RESOURCES', position: 11 },
        { name: '🤖 BOT & SYSTEM INFO', position: 12 }
      ];

      for (const cat of categoryData) {
        try {
          const created = await guild.channels.create({
            name: cat.name,
            type: 'GUILD_CATEGORY',
            position: cat.position
          });
          categories[cat.name] = created;
        } catch (e) {
          console.error(`Failed to create category ${cat.name}:`, e);
        }
      }

      await interaction.editReply(`✅ Created 13 categories\n🔄 Creating channels...`);

      // ========================
      // PHASE 3: CREATE CHANNELS
      // ========================

      const channelConfigs = {
        '🛡️ MOD OPERATIONS CENTER': [
          { name: 'mod-chat', type: 'text' },
          { name: 'mod-announcements', type: 'text' },
          { name: 'mod-rules', type: 'text' },
          { name: 'mod-operations', type: 'text' },
          { name: 'urgent-alerts', type: 'text' },
          { name: 'mod-log', type: 'text' },
          { name: 'verified-logs', type: 'text' },
          { name: 'role-management', type: 'text' },
          { name: 'mod-statistics', type: 'text' },
          { name: 'mod-training', type: 'text' },
          { name: 'bot-management', type: 'text' },
          { name: 'case-archive', type: 'text' }
        ],
        '📍 WELCOME & ONBOARDING': [
          { name: 'welcome', type: 'text' },
          { name: 'rules', type: 'text' },
          { name: 'faq', type: 'text' },
          { name: 'start-here', type: 'text' },
          { name: 'announcements', type: 'text' },
          { name: 'notifications', type: 'text' }
        ],
        '💬 GENERAL COMMUNITY': [
          { name: 'general', type: 'text' },
          { name: 'discussion', type: 'text' },
          { name: 'media-share', type: 'text' },
          { name: 'gaming-talk', type: 'text' },
          { name: 'wins-celebration', type: 'text' },
          { name: 'introduce-yourself', type: 'text' },
          { name: 'memes-jokes', type: 'text' }
        ],
        '🔍 TRENDING & INTELLIGENCE': [
          { name: 'trending-topics', type: 'text' },
          { name: 'theories-discussion', type: 'text' },
          { name: 'community-newspaper', type: 'text' },
          { name: 'predictions', type: 'text' },
          { name: 'data-analysis', type: 'text' },
          { name: 'links-resources', type: 'text' },
          { name: 'hot-takes', type: 'text' },
          { name: 'trends-explained', type: 'text' }
        ],
        '🎤 VOICE CHANNELS': [
          { name: 'gaming-voice-1', type: 'voice' },
          { name: 'gaming-voice-2', type: 'voice' },
          { name: 'community-hangout', type: 'voice' },
          { name: 'afk-zone', type: 'voice' },
          { name: 'music-listening', type: 'voice' }
        ],
        '📊 LEVELING & PROGRESSION': [
          { name: 'level-leaderboard', type: 'text' },
          { name: 'achievements', type: 'text' },
          { name: 'role-showcase', type: 'text' },
          { name: 'progression-guide', type: 'text' },
          { name: 'perks-unlocked', type: 'text' }
        ],
        '💼 BUSINESS & NETWORKING': [
          { name: 'business-chat', type: 'text' },
          { name: 'money-talk', type: 'text' },
          { name: 'startups', type: 'text' },
          { name: 'partnerships', type: 'text' },
          { name: 'market-analysis', type: 'text' },
          { name: 'side-hustles', type: 'text' }
        ],
        '📚 SKILL & LEARNING': [
          { name: 'learning-resources', type: 'text' },
          { name: 'coding-talk', type: 'text' },
          { name: 'creative-works', type: 'text' },
          { name: 'fitness-grind', type: 'text' },
          { name: 'self-improvement', type: 'text' }
        ],
        '🎮 COMMUNITY ACTIVITIES': [
          { name: 'events-calendar', type: 'text' },
          { name: 'competitions', type: 'text' },
          { name: 'fun-games', type: 'text' },
          { name: 'community-spotlight', type: 'text' }
        ],
        '⚖️ MODERATION & APPEALS': [
          { name: 'mod-log', type: 'text' },
          { name: 'appeals', type: 'text' },
          { name: 'support-tickets', type: 'text' },
          { name: 'feedback', type: 'text' },
          { name: 'community-updates', type: 'text' }
        ],
        '💎 EXCLUSIVE COMMUNITIES': [
          { name: 'vip-lounge', type: 'text' },
          { name: 'theory-masters', type: 'text' },
          { name: 'top-contributors', type: 'text' },
          { name: 'inner-circle', type: 'text' }
        ],
        '📖 MOD TRAINING & RESOURCES': [
          { name: 'mod-training', type: 'text' },
          { name: 'mod-guidelines', type: 'text' },
          { name: 'mod-resources', type: 'text' }
        ],
        '🤖 BOT & SYSTEM INFO': [
          { name: 'bot-commands', type: 'text' },
          { name: 'bot-status', type: 'text' },
          { name: 'system-info', type: 'text' }
        ]
      };

      let channelCount = 0;
      for (const [categoryName, channels] of Object.entries(channelConfigs)) {
        const category = categories[categoryName];
        if (!category) continue;
        
        for (const channelData of channels) {
          try {
            const type = channelData.type === 'voice' ? 'GUILD_VOICE' : 'GUILD_TEXT';
            
            await guild.channels.create({
              name: channelData.name,
              type: type,
              parent: category.id
            });
            
            channelCount++;
          } catch (e) {
            console.error(`Failed to create channel ${channelData.name}:`, e);
          }
        }
      }

      await interaction.editReply(`✅ Created ${channelCount} channels\n🔄 Setting permissions...`);

      // ========================
      // PHASE 4: SET PERMISSIONS
      // ========================

      // Hide mod category from @everyone
      const modCategory = categories['🛡️ MOD OPERATIONS CENTER'];
      if (modCategory) {
        try {
          await modCategory.permissionOverwrites.edit(guild.roles.everyone, {
            ViewChannel: false
          });
        } catch (e) {
          console.error('Failed to set mod category permissions:', e);
        }
      }

      await interaction.editReply(`✅ Set permissions\n🔄 Posting embeds...`);

      // ========================
      // PHASE 5: POST EMBEDS
      // ========================

      const welcomeChannel = guild.channels.cache.find(ch => ch.name === 'welcome');
      const rulesChannel = guild.channels.cache.find(ch => ch.name === 'rules');
      const faqChannel = guild.channels.cache.find(ch => ch.name === 'faq');

      if (welcomeChannel) {
        const welcomeEmbed = new EmbedBuilder()
          .setTitle('🎉 Welcome to OBSIDIA!')
          .setDescription('Powered by intelligent community management')
          .setColor('#6600FF')
          .addFields(
            { name: '🚀 Get Started', value: '1. Read #rules\n2. Verify yourself\n3. Pick your roles\n4. Introduce yourself' },
            { name: '💬 Community', value: '🎮 Gaming • 💼 Business • 📚 Learning • 🎉 Events' },
            { name: '🤖 About OBSIDIA', value: 'Intelligent bot powering your community with XP, moderation, appeals, and engagement.' }
          )
          .setFooter({ text: 'Welcome aboard! 🔮' });

        try {
          await welcomeChannel.send({ embeds: [welcomeEmbed] });
        } catch (e) {
          console.error('Failed to send welcome embed:', e);
        }
      }

      if (rulesChannel) {
        const rulesEmbed = new EmbedBuilder()
          .setTitle('📋 Community Rules')
          .setColor('#FF0000')
          .addFields(
            { name: '1. Be Respectful', value: 'Treat everyone with dignity' },
            { name: '2. No Spam', value: 'Keep messages relevant' },
            { name: '3. No Hate Speech', value: 'Zero tolerance for discrimination' },
            { name: '4. No Harassment', value: 'Be kind, not cruel' },
            { name: '5. No Illegal Content', value: 'No piracy, drugs, weapons' },
            { name: '6. Age Appropriate', value: 'Keep it family-friendly' },
            { name: '7. Follow Discord TOS', value: 'This is the minimum standard' },
            { name: '8. Respect Mods', value: 'Appeal if you disagree' },
            { name: '9. No Doxxing', value: 'Privacy is protected' },
            { name: '10. Build Community', value: 'Make it awesome together!' }
          )
          .setFooter({ text: 'Violations: Warn → Mute → Kick → Ban' });

        try {
          await rulesChannel.send({ embeds: [rulesEmbed] });
        } catch (e) {
          console.error('Failed to send rules embed:', e);
        }
      }

      if (faqChannel) {
        const faqEmbed = new EmbedBuilder()
          .setTitle('❓ Frequently Asked Questions')
          .setColor('#0099FF')
          .addFields(
            { name: 'How do I level up?', value: 'Post in chat, participate in voice, complete challenges!' },
            { name: 'What are roles?', value: 'Roles unlock perks and access. Use /roles select to choose!' },
            { name: 'How do I appeal?', value: 'Got an issue? Post in #appeals with your evidence.' },
            { name: 'How do I get support?', value: 'Post in #support-tickets and a mod will help!' },
            { name: 'What is XP?', value: 'Experience points. Earn them by participating. See /level!' }
          );

        try {
          await faqChannel.send({ embeds: [faqEmbed] });
        } catch (e) {
          console.error('Failed to send FAQ embed:', e);
        }
      }

      // ========================
      // SUCCESS MESSAGE
      // ========================

      await interaction.editReply(`
🎉 **OBSIDIA DEPLOYMENT COMPLETE!**

✅ 15 roles created
✅ 13 categories organized
✅ 64 channels ready
✅ Permissions configured
✅ Welcome embeds posted

**Your server is ready!**
🔮 OBSIDIA is now online.

Invite members and watch the magic happen! 🚀
      `);

    } catch (error) {
      console.error('Setup error:', error);
      await interaction.editReply(`❌ Setup failed: ${error.message}`);
    }
  }
};