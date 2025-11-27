#!/usr/bin/env python3

import sys
from config import (
    DISCORD_TOKEN, 
    ENVIRONMENT, 
    verify_credentials
)
from bot import bot

# Banner
print("=" * 60)
print("🤖 OBSIDIA BOT")
print("=" * 60)
print(f"Environment: {ENVIRONMENT}")
print("=" * 60)

# Verify credentials
if not verify_credentials():
    print("\n❌ STARTUP FAILED - Missing credentials in .env")
    sys.exit(1)

# Start bot
print("\n🚀 Starting Obsidia...")
print("Type 'Ctrl+C' to stop\n")

try:
    bot.run(DISCORD_TOKEN)
except KeyboardInterrupt:
    print("\n👋 Shutting down Obsidia...")
    sys.exit(0)
except Exception as e:
    print(f"\n❌ Fatal Error: {e}")
    sys.exit(1)