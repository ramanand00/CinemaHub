import asyncio
import sys
import os
sys.path.append(os.path.dirname(os.path.dirname(os.path.dirname(__file__))))

from src.config.database import users_collection
from src.models.user_model import User
from src.utils.auth import get_password_hash
from datetime import datetime

async def create_admin():
    """Create initial admin user"""
    admin_data = {
        "username": "admin",
        "email": "admin@cinemahub.com",
        "full_name": "Admin User",
        "hashed_password": get_password_hash("admin123"),
        "disabled": False,
        "role": "admin",
        "created_at": datetime.utcnow()
    }
    
    # Check if admin already exists
    existing_admin = await users_collection.find_one({"username": "admin"})
    if existing_admin:
        print("✅ Admin user already exists")
        return
    
    # Create admin
    result = await users_collection.insert_one(admin_data)
    if result.inserted_id:
        print("✅ Admin user created successfully")
        print("Username: admin")
        print("Password: admin123")
    else:
        print("❌ Failed to create admin user")

if __name__ == "__main__":
    asyncio.run(create_admin())