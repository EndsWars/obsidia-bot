import os
from dotenv import load_dotenv

# Load .env file
load_dotenv()

# Discord
DISCORD_TOKEN = os.getenv("DISCORD_TOKEN")
CLIENT_ID = int(os.getenv("CLIENT_ID"))
OWNER_ID = int(os.getenv("OWNER_ID"))
GUILD_ID = int(os.getenv("GUILD_ID"))

# Claude
CLAUDE_API_KEY = os.getenv("CLAUDE_API_KEY")
CLAUDE_MODEL = os.getenv("CLAUDE_MODEL", "claude-3-5-sonnet-20241022")

# Database
MYSQL_HOST = os.getenv("MYSQL_HOST")
MYSQL_PORT = int(os.getenv("MYSQL_PORT", 3306))
MYSQL_USER = os.getenv("MYSQL_USER")
MYSQL_PASSWORD = os.getenv("MYSQL_PASSWORD")
MYSQL_DATABASE = os.getenv("MYSQL_DATABASE")

# OpenAI (for later)
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
OPENAI_MODEL = os.getenv("OPENAI_MODEL")

# Bot Config
BOT_PREFIX = os.getenv("BOT_PREFIX", "!")
DEVELOPMENT_MODE = os.getenv("DEVELOPMENT_MODE", "false").lower() == "true"
ENVIRONMENT = os.getenv("ENVIRONMENT", "development")
DEBUG = os.getenv("DEBUG", "true").lower() == "true"

# Verify credentials
def verify_credentials():
    """Check all required credentials are loaded"""
    required = [
        ("DISCORD_TOKEN", DISCORD_TOKEN),
        ("CLIENT_ID", CLIENT_ID),
        ("GUILD_ID", GUILD_ID),
        ("CLAUDE_API_KEY", CLAUDE_API_KEY),
    ]
    
    missing = []
    for name, value in required:
        if not value:
            missing.append(name)
    
    if missing:
        print("❌ MISSING CREDENTIALS:")
        for name in missing:
            print(f"   - {name}")
        return False
    
    print("✅ All credentials loaded successfully")
    return True