import discord
from discord.ext import commands
import logging
from anthropic import Anthropic
from config import CLAUDE_API_KEY, CLAUDE_MODEL, OWNER_ID

# Setup logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)


class Obsidia(commands.Bot):
    """
    Obsidia - The intelligent Discord bot for Ends Town Hall
    Advanced AI powered by Claude
    """
    
    def __init__(self):
        # Setup intents
        intents = discord.Intents.default()
        intents.message_content = True
        intents.members = True
        intents.guilds = True
        
        # Initialize bot
        super().__init__(
            command_prefix="!",
            intents=intents,
            help_command=None,
        )
        
        # Claude client for AI
        self.claude_client = Anthropic(api_key=CLAUDE_API_KEY)
        self.claude_model = CLAUDE_MODEL
        
        # Register commands BEFORE setup_hook
        self.register_commands()
    
    def register_commands(self):
        """Register all slash commands"""
        
        # Add /help command
        @self.tree.command(
            name="help",
            description="Get help about Obsidia"
        )
        async def help_command(interaction: discord.Interaction):
            embed = discord.Embed(
                title="🤖 Obsidia Help",
                description="Intelligent AI bot for Ends Town Hall",
                color=discord.Color.blue()
            )
            embed.add_field(
                name="Available Commands",
                value="• `/help` - This help message\n• `/ping` - Check if bot is alive\n• `/ask` - Ask a question",
                inline=False
            )
            embed.add_field(
                name="Features",
                value="• Advanced AI Intelligence (Claude)\n• Investigation & Lie Detection\n• Smart Moderation\n• And more!",
                inline=False
            )
            embed.set_footer(text="Obsidia v1.0 | Powered by Claude AI")
            await interaction.response.send_message(embed=embed)
        
        # Add /ping command
        @self.tree.command(
            name="ping",
            description="Check if bot is alive"
        )
        async def ping_command(interaction: discord.Interaction):
            latency = round(self.latency * 1000)
            await interaction.response.send_message(
                f"🟢 Pong! ({latency}ms) | I'm alive and ready!"
            )
        
        # Add /ask command (test Claude AI)
        @self.tree.command(
            name="ask",
            description="Ask Obsidia a question (powered by Claude)"
        )
        async def ask_command(interaction: discord.Interaction, question: str):
            await interaction.response.defer()
            
            try:
                # Call Claude API
                message = self.claude_client.messages.create(
                    model=self.claude_model,
                    max_tokens=1024,
                    messages=[
                        {
                            "role": "user",
                            "content": question
                        }
                    ]
                )
                
                response_text = message.content[0].text
                
                # Split if too long
                if len(response_text) > 2000:
                    response_text = response_text[:1997] + "..."
                
                await interaction.followup.send(f"🤖 **Obsidia:** {response_text}")
            except Exception as e:
                logger.error(f"Claude API error: {e}")
                await interaction.followup.send(f"❌ Error: {str(e)[:100]}")
    
    async def setup_hook(self):
        """Called when bot is starting up"""
        logger.info("🤖 Obsidia is waking up...")
        
        # Sync slash commands
        try:
            await self.tree.sync()
            logger.info("✅ Slash commands synced!")
        except Exception as e:
            logger.error(f"❌ Failed to sync commands: {e}")
    
    async def on_ready(self):
        """Called when bot is fully ready"""
        logger.info(f"🟢 {self.user} is online")
        logger.info(f"📊 In {len(self.guilds)} guild(s)")
        logger.info(f"🤖 Running Claude Model: {self.claude_model}")
        logger.info("=" * 60)
    
    async def on_error(self, event, *args, **kwargs):
        """Handle errors gracefully"""
        logger.error(f"❌ Error in {event}:", exc_info=True)
    
    async def on_message(self, message):
        """Log messages for investigation system"""
        if message.author.bot:
            return
        
        # Log message (for later investigation intelligence)
        logger.debug(f"Message from {message.author}: {message.content[:50]}...")
        
        # Process commands
        await self.process_commands(message)


# Create bot instance
bot = Obsidia()
```

---

## ✅ NOW RESTART BOT

**In terminal:**

Ctrl+C to stop
```
python main.py